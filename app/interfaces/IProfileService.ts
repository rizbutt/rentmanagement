import { CreateProfileDTO } from "../dtos/CreateProfileDTO";
import { UpdateProfileDTO } from "../dtos/UpdateProfileDTO";

// Interface for profile service
export interface IProfileService {
  createProfile(createProfileDTO: CreateProfileDTO): Promise<void>;
  updateProfile(profileId: string, updateProfileDTO: UpdateProfileDTO): Promise<void>;
  getProfile(profileId: string): Promise<void>;
  getProfiles(): Promise<void>;
  deleteProfile(profileId: string): Promise<void>;
}
