import LeaseRepository from '../repositories/LeaseRepository';
import { ILease } from '../models/Lease';
import { CreateLeaseDTO } from '../dtos/CreateRentDTO';
import { UpdateLeaseDTO } from '../dtos/UpdateRentDTO';
import { IRentService } from '../interfaces/IRentService';

class RentService implements IRentService {
  private leaseRepository: LeaseRepository;

  constructor() {
    this.leaseRepository = new LeaseRepository();
  }

  async createLease(createLeaseDTO: CreateLeaseDTO): Promise<ILease> {
    return this.leaseRepository.create(createLeaseDTO);
  }

  async updateLease(leaseId: string, updateLeaseDTO: UpdateLeaseDTO): Promise<ILease | null> {
    return this.leaseRepository.update(leaseId, updateLeaseDTO);
  }

  async getLeases(): Promise<ILease[]> {
    return this.leaseRepository.findAll();
  }

  async getLease(leaseId: string): Promise<ILease | null> {
    return this.leaseRepository.findById(leaseId);
  }

  async deleteLease(leaseId: string): Promise<ILease | null> {
    return this.leaseRepository.delete(leaseId);
  }
}

export default RentService;
