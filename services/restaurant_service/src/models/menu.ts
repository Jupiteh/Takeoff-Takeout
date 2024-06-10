import mongoose, { Schema, Document } from 'mongoose';

interface IMenu extends Document {
  ID_Restaurant: number;
  menu: string;
}

const menuSchema: Schema = new Schema({
  ID_Restaurant: {
    type: Number,
    required: true
  },
  menu: {
    type: String,
    required: true
  }
});

export default mongoose.model<IMenu>('Menu', menuSchema);
