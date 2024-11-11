import { PhotoSchema } from "../model/userModel.js";

const likeCounter=async(req,res)=>{
    console.log("kije");
    
    const { photoId } = req.params;
  const { userId } = req.body; 
  console.log(userId, photoId);
  
  try {
   
    const photo = await PhotoSchema.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    
    if (photo.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this photo' });
    }

   
    photo.likeCount += 1;
    photo.likedBy.push(userId);

    const updatedPhoto = await photo.save();

    res.json({ likeCount: updatedPhoto.likeCount });
  } catch (error) {
    console.error('Error updating like count:', error);
    res.status(500).json({ message: 'Failed to update like count' });
  }

}
export default likeCounter;