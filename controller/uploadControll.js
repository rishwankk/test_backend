
import express from 'express';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import { PhotoSchema, UserSchema } from '../model/userModel.js';

dotenv.config();

const app = express();
app.use(fileUpload({ useTempFiles: true }));


const uploadImage=async(req,res)=>{
    
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    
     
      if (req.file.size > 1024 * 1024 * 5) {
        return res.status(400).json({ message: 'File size is too large. Max 5MB allowed' });
      }
      const { description_0} = req.body;
   
    
      
      const imageUrl = `/images/${req.file.filename}`;
    
     
      try {
        const newPhoto = new PhotoSchema({
          url: imageUrl,
          description: description_0,
          userId: req.userId, 
        });
    
        await newPhoto.save();
        console.log("done");
        
    
        res.status(200).json({
          message: 'File uploaded successfully',
          imageUrl: imageUrl,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error saving photo', error });
      }
}
const getImages=async(req,res)=>{
    console.log("here");
    
    try {

        const photos = await PhotoSchema.find()
      .populate('userId', 'name photo');
        const user = await UserSchema.findById(photos.userId);
    
        
        
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error getting photos', error });
    }
}
export {uploadImage, getImages};