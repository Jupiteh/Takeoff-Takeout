import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  ID_Restaurant: number;
  article_Name: string;
}

const articleSchema: Schema = new Schema({
  ID_Restaurant: {
    type: Number,
    required: true
  },
  article_Name: {
    type: String,
    required: true
  }
});

export default mongoose.model<IArticle>('Article', articleSchema);
