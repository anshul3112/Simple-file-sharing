import { File } from "../models/file.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const uploadFile = asyncHandler(async (req, res) => {

    const localFilePath = req.file?.path;
    const { accessTOUsers } = req.body; //array of user_id

    if (!localFilePath) {
        throw new ApiError(400, "File is required for upload.");
    }

    // 2. Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse || !cloudinaryResponse.url) {
        throw new ApiError(500, "Error while uploading file to Cloudinary.");
    }

    // 3. Create file document with owner and access list
    const file = await File.create({
        fileUrl: cloudinaryResponse.url,
        cloudinaryPublicId: cloudinaryResponse.public_id, // Essential for deletion
        fileName: req.file.originalname,
        owner: req.user?._id, 
        accessTOUsers: accessTOUsers || [] 
    });

    const createdFile = await File.findById(file._id);

    if (!createdFile) {
        throw new ApiError(500, "Something went wrong while saving the file details.");
    }

    return res.status(201).json(
        new ApiResponse(201, createdFile, "File uploaded successfully.")
    );
});

const downloadFile = asyncHandler(async (req, res) => {

    const { fileId } = req.params;
    const userId = req.user?._id;

    if (!fileId) {
        throw new ApiError(400, "File ID is required.");
    }

    const file = await File.findById(fileId);

    if (!file) {
        throw new ApiError(404, "File not found.");
    }

    // 1. Check for permissions
    const isOwner = file.owner.toString() === userId.toString();
    const hasAccess = file.accessTOUsers.some(allowedUserId => allowedUserId.toString() === userId.toString());

    if (!isOwner && !hasAccess) {
        throw new ApiError(403, "You do not have permission to access this file.");
    }
    
    // 2. Prepare and redirect to the download link
    const standardUrl = file.fileUrl;
    const urlParts = standardUrl.split('/upload/');
    
    if (urlParts.length < 2) {
        throw new ApiError(500, "Invalid Cloudinary URL format.");
    }

    const downloadUrl = `${urlParts[0]}/upload/fl_attachment/${urlParts[1]}`;

    res.redirect(downloadUrl);
});

const deleteFile = asyncHandler(async (req, res) => {

    const { fileId } = req.params;
    const userId = req.user?._id;

    if (!fileId) {
        throw new ApiError(400, "File ID is required.");
    }

    const file = await File.findById(fileId);

    if (!file) {
        throw new ApiError(404, "File not found.");
    }

    // 1. Authorization: Check if the requester is the owner
    if (file.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this file.");
    }

    // 2. Delete from Cloudinary and Database
    await deleteFromCloudinary(file.cloudinaryPublicId);
    await File.findByIdAndDelete(fileId);

    return res.status(200).json(
        new ApiResponse(200, {}, "File deleted successfully.")
    );
});

export {
    uploadFile,
    downloadFile,
    deleteFile
};
