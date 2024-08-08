import { PropertyRepository } from '../repositories/property_repository';
import { IProperty } from '@/types/models_types/property_type';
import { PropertyData } from '@/types/perperty_data_type';
export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async addNewProperty(propertyData: IProperty): Promise<IProperty> {
    return await this.propertyRepository.create(propertyData);
  }


 //fetching all properties data of that user with his id

 // fetching propertyNo/Building No, property._id , Building_name,Building_address

   /*
    for each function for fetching property required data 
    *id
    *propertyNo/Building No
    *Building_name
    *Building_address
   */

 async FetchingUserPropertiesData(userId: string): Promise<PropertyData> {
  const allProperty = await this.propertyRepository.getAllPropertiesOfSpecificUser(userId);
  const property_data: PropertyData = {
    buildingNo: [],
    buildingName: [],
    buildingAddress: []
  };

  allProperty.forEach((property) => {
    property_data.buildingNo.push(property.propertyNo);
    property_data.buildingName.push(property.buildingDetails.name);
    property_data.buildingAddress.push(property.buildingDetails.address);
  });

  return property_data;
}




  
}

export default PropertyService