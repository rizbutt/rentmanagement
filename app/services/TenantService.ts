import TenantRepository from '../repositories/TenantRepository';
import { CreateTenantDTO } from '../dtos/CreateTenantDTO';
import { UpdateTenantDTO } from '../dtos/UpdateTenantDTO';
import { ITenantService } from '../interfaces/ITenantService';
import { ITenant } from '../models/Tenant';

class TenantService implements ITenantService {
  private tenantRepository: TenantRepository;

  constructor() {
    this.tenantRepository = new TenantRepository();
  }

  async createTenant(createTenantDTO: CreateTenantDTO): Promise<ITenant> {
    return this.tenantRepository.create(createTenantDTO);
  }

  async updateTenant(tenantId: string, updateTenantDTO: UpdateTenantDTO): Promise<ITenant | null> {
    return this.tenantRepository.update(tenantId, updateTenantDTO);
  }

  async getTenants(): Promise<ITenant[]> {
    return this.tenantRepository.getAll();
  }

  async getTenant(tenantId: string): Promise<ITenant | null> {
    return this.tenantRepository.get(tenantId);
  }

  async deleteTenant(tenantId: string): Promise<ITenant | null> {
    return this.tenantRepository.delete(tenantId);
  }
}

export default TenantService;
