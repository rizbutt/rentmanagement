export interface UpdateProfileDTO {
  logo?: string;
  businessDetails?: {
    name?: string;
    address?: string;
    contact?: string;
  };
  keywords?: string[];  // Optional array of keywords associated with the company profile
}
