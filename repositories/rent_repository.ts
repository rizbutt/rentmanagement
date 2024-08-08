import Rent from '../models/rent_model';
import { IRent } from '@/types/models_types/rent_type';

export class RentRepository {
  async create(RentData: IRent): Promise<IRent> {
    const rent = new Rent(RentData);
    
    return await rent.save();
  }

 
}