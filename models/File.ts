import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment {
  user: string;
  text: string;
  resolved?: boolean;
  createdAt: Date;
}

export interface IFile extends Document {
  title: string;
  class: number;
  subject: string;
  part: string;
  chapter: string;
  format: "PDF" | "MP4" | "MP3";
  fileSize?: string;
  specialtyTag?: string;
  type: "notes" | "question_paper" | "a_plus";
  coveredAreas?: string;
  description?: string;
  credits?: string;
  uploaderName?: string;
  driveUrl: string;
  uploaderId: mongoose.Types.ObjectId;
  downloads: number;
  totalStars: number;
  ratingCount: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  { 
    user: { type: String, required: true }, 
    text: { type: String, required: true }, 
    resolved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now } 
  },
  { _id: false }
);

const FileSchema: Schema<IFile> = new Schema(
  {
    title:        { type: String, required: true },
    class:        { type: Number, required: true, min: 5, max: 10 },
    subject:      { type: String, required: true },
    part:         { type: String, default: "Full Text" },
    chapter:      { type: String, default: "General" },
    format:       { type: String, enum: ["PDF", "MP4", "MP3"], default: "PDF" },
    fileSize:     { type: String },
    specialtyTag: { type: String },
    type:         { type: String, enum: ["notes", "question_paper", "a_plus"], default: "notes" },
    coveredAreas: { type: String },
    description:  { type: String },
    credits:      { type: String },
    uploaderName: { type: String },
    driveUrl:     { type: String, required: true },
    uploaderId:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    downloads:    { type: Number, default: 0 },
    totalStars:   { type: Number, default: 0 },
    ratingCount:  { type: Number, default: 0 },
    comments:     { type: [CommentSchema], default: [] },
  },
  { timestamps: true }
);

const FileModel: Model<IFile> =
  mongoose.models.File || mongoose.model<IFile>("File", FileSchema);

export default FileModel;
