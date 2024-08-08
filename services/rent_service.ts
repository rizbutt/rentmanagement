import { RentRepository } from '../repositories/rent_repository';
import { IRent } from '@/types/models_types/rent_type';
export class RentService {
  private RentRepository: RentRepository;

  constructor() {
    this.RentRepository = new RentRepository();
  }

  async addNewRent(RentData: IRent): Promise<IRent> {
    return await this.RentRepository.create(RentData);
  }
 

  
}

export default RentService