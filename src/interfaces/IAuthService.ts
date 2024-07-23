// Interface for authentication service
export interface IAuthService {
    login(): Promise<void>;
    register(): Promise<void>;
  }
  