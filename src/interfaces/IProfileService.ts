// Interface for profile service
export interface IProfileService {
    createProfile(): Promise<void>;
    updateProfile(): Promise<void>;
    getProfile(): Promise<void>;
  }
  