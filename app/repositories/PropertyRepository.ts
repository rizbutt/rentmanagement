import Property, { IProperty } from '../models/Property';
import { AddPropertyDTO } from '../dtos/AddPropertyDTO';
import { UpdatePropertyDTO } from '../dtos/UpdatePropertyDTO';

// Repository for property management
class PropertyRepository {
  async create(addPropertyDTO: AddPropertyDTO): Promise<IProperty> {
    const newProperty = new Property(addPropertyDTO);
    await newProperty.save();
    return newProperty;
  }

  async update(propertyId: string, updatePropertyDTO: UpdatePropertyDTO): Promise<IProperty | null> {
    return Property.findByIdAndUpdate(propertyId, updatePropertyDTO, { new: true });
  }

  async getAll(): Promise<IProperty[]> {
    return Property.find();
  }

  async get(propertyId: string): Promise<IProperty | null> {
    return Property.findById(propertyId);
  }

  async delete(propertyId: string): Promise<IProperty | null> {
    return Property.findByIdAndDelete(propertyId);
  }
}

export default PropertyRepository;
