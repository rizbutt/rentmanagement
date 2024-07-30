import ProfileRepository from '../repositories/ProfileRepository';
import { CreateProfileDTO } from '../dtos/CreateProfileDTO';
import { UpdateProfileDTO } from '../dtos/UpdateProfileDTO';

// Service for profile management
class ProfileService {
  private profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  // Create a new profile
  async createProfile(createProfileDTO: CreateProfileDTO) {
    return this.profileRepository.create(createProfileDTO);
  }

  // Update an existing profile
  async updateProfile(profileId: string, updateProfileDTO: UpdateProfileDTO) {
    return this.profileRepository.update(profileId, updateProfileDTO);
  }

  // Get a profile by ID
  async getProfile(profileId: string) {
    return this.profileRepository.get(profileId);
  }

  // Get all profiles
  async getProfiles() {
    return this.profileRepository.getAll();
  }

  // Delete a profile by ID
  async deleteProfile(profileId: string) {
    return this.profileRepository.delete(profileId);
  }
}

export default ProfileService;
