export interface IUser extends Document {
    _id: any;
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createPasswordResetToken?: () => string;

    createdAt?: Date;
    updatedAt?: Date;
  }