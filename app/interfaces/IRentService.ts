import { ILease } from '../models/Lease';
import { CreateLeaseDTO } from '../dtos/CreateRentDTO';
import { UpdateLeaseDTO } from '../dtos/UpdateRentDTO';

export interface IRentService {
  createLease(createLeaseDTO: CreateLeaseDTO): Promise<ILease>;
  updateLease(leaseId: string, updateLeaseDTO: UpdateLeaseDTO): Promise<ILease | null>;
  getLeases(): Promise<ILease[]>;
  getLease(leaseId: string): Promise<ILease | null>;
  deleteLease(leaseId: string): Promise<ILease | null>;
}
