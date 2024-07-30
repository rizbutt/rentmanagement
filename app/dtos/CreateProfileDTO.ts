export interface CreateProfileDTO {
  logo: string;
  businessDetails: {
    name: string;
    address: string;
    contact: string;
  };
  keywords: string[];  // Array of keywords associated with the company profile
}
