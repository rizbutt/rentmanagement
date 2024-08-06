import { PropertyRepository } from '../repositories/property_repository';
import { IProperty } from '@/types/property_type';
export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async addNewProperty(propertyData: IProperty): Promise<IProperty> {
    return await this.propertyRepository.create(propertyData);
  }
 

  
}

export default PropertyService