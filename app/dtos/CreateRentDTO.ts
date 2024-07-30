import mongoose from "mongoose";

// Data Transfer Object for creating a lease
export interface CreateLeaseDTO {
  tenantId: mongoose.Types.ObjectId;
  rentAmount: number;
  paidAmount:number;
  startDate:Date,
  dues:number;
  payBank:string;
}
