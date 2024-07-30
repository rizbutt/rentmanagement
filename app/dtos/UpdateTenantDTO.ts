import mongoose from "mongoose";

// Data Transfer Object for updating a tenant
export interface UpdateTenantDTO {
  name?: string;
  email?: string;
  phoneNumber?: string;
  propertyId?: mongoose.Types.ObjectId;
}
