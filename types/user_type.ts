export interface IUser extends Document {
    [x: string]: any;
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createPasswordResetToken?: () => string;
  }