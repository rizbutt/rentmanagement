import { CreateTenantDTO } from '../dtos/CreateTenantDTO';
import { UpdateTenantDTO } from '../dtos/UpdateTenantDTO';
import Tenant, { ITenant } from '../models/Tenant';

class TenantRepository {
  async create(createTenantDTO: CreateTenantDTO): Promise<ITenant> {
    const newTenant = new Tenant(createTenantDTO);
    await newTenant.save();
    return newTenant;
  }

  async update(tenantId: string, updateTenantDTO: UpdateTenantDTO): Promise<ITenant | null> {
    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, updateTenantDTO, { new: true });
    return updatedTenant;
  }

  async getAll(): Promise<ITenant[]> {
    return Tenant.find();
  }

  async get(tenantId: string): Promise<ITenant | null> {
    return Tenant.findById(tenantId);
  }

  async delete(tenantId: string): Promise<ITenant | null> {
    return Tenant.findByIdAndDelete(tenantId);
  }
}

export default TenantRepository;
