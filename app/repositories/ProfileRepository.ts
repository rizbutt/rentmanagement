import CompanyProfile, { ICompanyProfile } from '../models/CompanyProfile';
import { CreateProfileDTO } from '../dtos/CreateProfileDTO';
import { UpdateProfileDTO } from '../dtos/UpdateProfileDTO';

// Repository for profile management
class ProfileRepository {
  // Create a new profile in the repository
  async create(createProfileDTO: CreateProfileDTO): Promise<ICompanyProfile> {
    const newProfile = new CompanyProfile(createProfileDTO);
    await newProfile.save();
    return newProfile;
  }

  // Update an existing profile in the repository
  async update(profileId: string, updateProfileDTO: UpdateProfileDTO): Promise<ICompanyProfile | null> {
    const updatedProfile = await CompanyProfile.findByIdAndUpdate(profileId, updateProfileDTO, { new: true });
    return updatedProfile;
  }

  // Get a profile by ID from the repository
  async get(profileId: string): Promise<ICompanyProfile | null> {
    return CompanyProfile.findById(profileId);
  }

  // Get all profiles from the repository
  async getAll(): Promise<ICompanyProfile[]> {
    return CompanyProfile.find();
  }

  // Delete a profile by ID from the repository
  async delete(profileId: string): Promise<ICompanyProfile | null> {
    return CompanyProfile.findByIdAndDelete(profileId);
  }
}

export default ProfileRepository;
