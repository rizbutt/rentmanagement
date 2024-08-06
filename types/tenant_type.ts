import mongoose from "mongoose";

export interface ITenant extends Document {
    name: string;
    villa_no: number;
    monthly_rent: number;
    security: number;
    passport_no: string;
    villa_address: string;
    contact_no: string;
    user_id: mongoose.Schema.Types.ObjectId; // Reference to the User model
  }