import Property from '../models/property_model';
import { IProperty } from '@/types/models_types/property_type';

export class PropertyRepository {
  async create(propertyData: IProperty): Promise<IProperty> {
    const property = new Property(propertyData);
    
    return await property.save();
  }


  //getting all properties data of that user 
  async getAllPropertiesOfSpecificUser(user_id: string): Promise<IProperty[]> {
    return await Property.find({ user_id: user_id }).populate('user_id').exec();
  }
  
  /*
   Fetch 

  */




   

}

