import TenantRepository from '../repositories/tenant_repository';

import { ITenant } from '@/types/tenant_type';

class TenantService {
  private tenantRepository: TenantRepository;

  constructor() {
    this.tenantRepository = new TenantRepository();
  }

  async createTenant(tenant_data: ITenant): Promise<ITenant> {
    return this.tenantRepository.create(tenant_data);
  }

}

export default TenantService;
