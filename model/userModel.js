import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    photo: {type: String },
    role: {type: String, default: 'user' },
    isActive: {type: Boolean, default: true },
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now }
})
const photoSchema = new mongoose.Schema({
    url: {type: String, required: true },
    description: {type: String },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    likeCount: { type: Number, default: 0 },
    likedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now }
})
const commentSchema = new mongoose.Schema({
    content: {type: String, required: true },
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'photo'  },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'comment', default: null },
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now }
})

const UserSchema= mongoose.model('user',userSchema)
const PhotoSchema= mongoose.model('photo',photoSchema)
const CommentSchema= mongoose.model('comment',commentSchema)

export { UserSchema, PhotoSchema,CommentSchema }

