import mongoose, { Schema, Document } from 'mongoose';

interface IRestaurant extends Document {
  ID_Restaurant: string;
  ID_Restaurateur: number;
  nom_Restaurant: string;
}

const restaurantSchema: Schema = new Schema({
  ID_Restaurant: {
    type: String,
    required: true,
    unique: true,
    autoIncrement: true // Note: Mongoose ne supporte pas directement l'auto-incrémentation pour les strings, vous devrez gérer cela manuellement ou via un plugin.
  },
  ID_Restaurateur: {
    type: Number,
    required: true
  },
  nom_Restaurant: {
    type: String,
    required: true
  }
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
