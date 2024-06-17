import mongoose, { Schema, Document, model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose); // Utilisation de require

interface IRestaurant extends Document {
  ID_Restaurant: number;
  ID_Restaurateur: number;
  nom_Restaurant: string;
  image: string;
}

const restaurantSchema: Schema = new Schema({
  ID_Restaurant: {
    type: Number,
    unique: true
  },
  ID_Restaurateur: {
    type: Number,
    required: true
  },
  nom_Restaurant: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
  }
});

restaurantSchema.plugin(AutoIncrementFactory, { inc_field: 'ID_Restaurant' });

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;
