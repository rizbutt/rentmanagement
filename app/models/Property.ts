import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  name: string;
  address: string;
  section: string;
}

const PropertySchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  section: { type: String, required: true },

});

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
