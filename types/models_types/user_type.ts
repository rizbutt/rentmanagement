export interface IUser extends Document {
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createPasswordResetToken?: () => string;

    createdAt?: Date;
    updatedAt?: Date;
  }