import mongoose, { Schema, Document, model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

interface IMenu extends Document {
  ID_Menu: number;
  ID_Restaurant: number;
}

const menuSchema: Schema = new Schema({
  ID_Menu: {
    type: Number,
    unique: true
  },
  ID_Restaurant: {
    type: Number,
    required: true
  }
});

menuSchema.plugin(AutoIncrementFactory, { inc_field: 'ID_Menu' });

const Menu = model<IMenu>('Menu', menuSchema);

export default Menu;
