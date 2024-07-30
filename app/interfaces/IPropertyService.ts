import { AddPropertyDTO } from "../dtos/AddPropertyDTO";
import { UpdatePropertyDTO } from "../dtos/UpdatePropertyDTO";
import { IProperty } from "../models/Property";

// Interface for property service
export interface IPropertyService {
  addProperty(addPropertyDTO: AddPropertyDTO): Promise<IProperty>;
  updateProperty(propertyId: string, updatePropertyDTO: UpdatePropertyDTO): Promise<IProperty | null>;
  getProperties(): Promise<IProperty[]>;
  getProperty(propertyId: string): Promise<IProperty | null>;
  deleteProperty(propertyId: string): Promise<IProperty | null>;
}
