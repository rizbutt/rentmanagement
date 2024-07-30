// models/Lease.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILease extends Document {
  tenantId: mongoose.Types.ObjectId;
  paidAmount: number;
  rentAmount: number;
  startDate: Date;
  dues: number;
  payBank: string;
}

const LeaseSchema: Schema = new Schema({
  tenantId: { type: mongoose.Types.ObjectId,ref:'Tenant' ,required: true },
  paidAmount: { type: Number, required: true },
  rentAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  dues: { type: Number, required: true },
  payBank: { type: String, required: true },
});

const Lease: Model<ILease> = mongoose.models.Lease || mongoose.model<ILease>('Lease', LeaseSchema);
export default Lease;
