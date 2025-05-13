import { response } from "express";
import File from "../models/file.js";

export const uploadImage = async (req , res) => {

    const fileObj = {
        path : req.file.path,
        name : req.file.originalname
    }
    try{
        const file = await File.create(fileObj);
        res.status(200).json({path : `http://localhost:8000/file/${file._id}`});
    }
    catch(error)
    {
        console.log("Error in uploadImage" , error.message);
        res.status(500).json({error : error.message});
    }
};

export const downloadImage = async (req,res) => {
    try{
        const file =  await File.findById(req.params.fileId);

        file.downloadContent++;

        await file.save();

        res.download(file.path , file.name);
    }catch(error)
    {
        console.log("Error while downloading" , error.message);
        return res.status(500).json({error : error.mesaage});
    }
}