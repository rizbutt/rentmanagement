import mongoose, { Schema, Model } from 'mongoose';
import crypto from 'crypto';
import { IUser } from '@/types/models_types/user_type';

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  
  // Method to generate a password reset token
  UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    return resetToken;
  };

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default UserModel as Model<IUser>;
  
  