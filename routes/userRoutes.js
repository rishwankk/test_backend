import express from 'express';
import { login, signup } from '../controller/loginControll.js';
import { getImages, uploadImage } from '../controller/uploadControll.js';
import upload from '../config/multerConfig.js'; 
import authenticateUser from '../config/authenticateUser.js';
import getUserData from '../controller/userControll.js';
import likeCounter from '../controller/likeControll.js';

const router = express.Router();

router.post('/signup', upload.single('photo'), signup);
router.post("/login",login);
router.post('/upload', authenticateUser, upload.single('images'),uploadImage);
router.get("/user", authenticateUser,getUserData)
router.get('/images', getImages);
router.post('/photos/:photoId/like',authenticateUser,likeCounter)


export default router;
