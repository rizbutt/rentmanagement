import mongoose from "mongoose";

// Data Transfer Object for creating a tenant
export interface CreateTenantDTO {
  name: string;
  email: string;
  phoneNumber: string;
  propertyId: mongoose.Types.ObjectId;
}