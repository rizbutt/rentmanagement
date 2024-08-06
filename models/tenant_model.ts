
import { ITenant } from '@/types/tenant_type';
import mongoose, { Schema, Model } from 'mongoose';


const TenantSchema: Schema = new Schema<ITenant>({
    name: { type: String, required: true },
    villa_no: { type: Number, required: true },
    monthly_rent: { type: Number, required: true },
    security: { type: Number, required: true },
    passport_no: { type: String, required: true },
    villa_address: { type: String, required: true },
    contact_no: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model
  });
  
const TenantModel= mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);

export default TenantModel as Model<ITenant>