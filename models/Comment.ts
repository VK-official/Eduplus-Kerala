import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  text: string;
  fileId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    text: { type: String, required: true },
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
