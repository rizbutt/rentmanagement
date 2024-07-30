import PropertyRepository from '../repositories/PropertyRepository';
import { AddPropertyDTO } from '../dtos/AddPropertyDTO';
import { UpdatePropertyDTO } from '../dtos/UpdatePropertyDTO';

// Service for property management
class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async addProperty(addPropertyDTO: AddPropertyDTO) {
    return this.propertyRepository.create(addPropertyDTO);
  }

  async updateProperty(propertyId: string, updatePropertyDTO: UpdatePropertyDTO) {
    return this.propertyRepository.update(propertyId, updatePropertyDTO);
  }

  async getProperties() {
    return this.propertyRepository.getAll();
  }

  async getProperty(propertyId: string) {
    return this.propertyRepository.get(propertyId);
  }

  async deleteProperty(propertyId: string) {
    return this.propertyRepository.delete(propertyId);
  }
}

export default PropertyService;
