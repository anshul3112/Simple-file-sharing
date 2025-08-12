import { Router } from "express";
import { uploadFile, downloadFile, deleteFile } from "../controllers/file.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/upload').post(
    verifyJWT,
    upload.single("file"), 
    uploadFile
);

router.route('/share/:fileId').get(
    downloadFile
);

router.route('/delete/:fileId').post(
    deleteFile
);

export default router;
