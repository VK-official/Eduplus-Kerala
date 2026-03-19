import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFile extends Document {
  title: string;
  class: number;
  subject: string;
  part: string;
  chapter: string;
  resourceType: "PDF" | "Audio" | "Video";
  type: "notes" | "question_paper" | "a_plus";
  coveredAreas?: string;
  description?: string;
  credits?: string;
  uploaderName?: string;
  driveUrl: string;
  uploaderId: mongoose.Types.ObjectId;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema: Schema<IFile> = new Schema(
  {
    title:        { type: String, required: true },
    class:        { type: Number, required: true, min: 1, max: 10 },
    subject:      { type: String, required: true },
    part:         { type: String, default: "Full Text" },
    chapter:      { type: String, default: "General" },
    resourceType: { type: String, enum: ["PDF", "Audio", "Video"], default: "PDF" },
    type:         { type: String, enum: ["notes", "question_paper", "a_plus"], default: "notes" },
    coveredAreas:  { type: String },
    description:   { type: String },
    credits:       { type: String },
    uploaderName:  { type: String },
    driveUrl:     { type: String, required: true },
    uploaderId:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    downloads:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FileModel: Model<IFile> =
  mongoose.models.File || mongoose.model<IFile>("File", FileSchema);

export default FileModel;
