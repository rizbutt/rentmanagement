import Property from '../models/property_model';
import { IProperty } from '@/types/property_type';

export class PropertyRepository {
  async create(propertyData: IProperty): Promise<IProperty> {
    const property = new Property(propertyData);
    
    return await property.save();
  }

 
}
