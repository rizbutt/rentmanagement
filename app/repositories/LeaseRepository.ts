import Lease, { ILease } from '../models/Lease';
import { CreateLeaseDTO } from '../dtos/CreateRentDTO';
import { UpdateLeaseDTO } from '../dtos/UpdateRentDTO';

class LeaseRepository {
  async create(createLeaseDTO: CreateLeaseDTO): Promise<ILease> {
    const newLease = new Lease(createLeaseDTO);
    await newLease.save();
    return newLease;
  }

  async findById(id: string): Promise<ILease | null> {
    return Lease.findById(id);
  }

  async findAll(): Promise<ILease[]> {
    return Lease.find();
  }

  async update(id: string, updateLeaseDTO: UpdateLeaseDTO): Promise<ILease | null> {
    return Lease.findByIdAndUpdate(id, updateLeaseDTO, { new: true });
  }

  async delete(id: string): Promise<ILease | null> {
    return Lease.findByIdAndDelete(id);
  }
}

export default LeaseRepository;
