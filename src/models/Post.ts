import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IPost extends Document {
  title: string;
  summary: string;
  content: string;
  category: string;
  tone: string;
  readTime: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, default: 'Technology' },
  tone: { type: String, required: true, default: 'Professional' },
  readTime: { type: String, default: '3 min read' },
  createdAt: { type: Date, default: Date.now },
});

export default models.Post || model<IPost>('Post', PostSchema);