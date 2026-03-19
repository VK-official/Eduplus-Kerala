import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFile extends Document {
  title: string;
  class: number;
  subject: string;
  chapter: string;
  type: "notes" | "question_paper" | "a_plus";
  driveUrl: string;
  uploaderId: mongoose.Types.ObjectId;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema: Schema<IFile> = new Schema(
  {
    title: { type: String, required: true },
    class: { type: Number, required: true },
    subject: { type: String, required: true },
    chapter: { type: String, required: true },
    type: {
      type: String,
      enum: ["notes", "question_paper", "a_plus"],
      required: true,
    },
    driveUrl: { type: String, required: true },
    uploaderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FileModel: Model<IFile> = mongoose.models.File || mongoose.model<IFile>("File", FileSchema);

export default FileModel;
