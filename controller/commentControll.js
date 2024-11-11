import mongoose from "mongoose";
import { CommentSchema } from "../model/userModel";

const comment= async()=>{
    const { content, postId } = req.body;  
    
    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }

    try {
      
        const newComment = new CommentSchema({
            content, 
            postId,  
            userId: req.userId  
        });

        await newComment.save();

        res.status(201).json({
            message: "Comment created successfully",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving comment", error });
    }

}
const replyComment = async (req, res) => {
    const { content, postId, parentCommentId } = req.body; // Extract content, postId, and parentCommentId from the request body

    if (!content || !postId) {
        return res.status(400).json({ message: "Content and postId are required" });
    }

    try {
      
        const newComment = new CommentSchema({
            content,
            postId,
            userId: req.userId,  
            parentCommentId: parentCommentId || null  
        });

        await newComment.save();

        res.status(201).json({
            message: parentCommentId ? "Reply added successfully" : "Comment added successfully",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving comment", error });
    }
};

