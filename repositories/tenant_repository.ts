
import Tenant from '../models/tenant_model';
import { ITenant } from '@/types/tenant_type';

class TenantRepository {
  async create(tenant_data: ITenant): Promise<ITenant> {
    const newTenant = new Tenant(tenant_data);
    await newTenant.save();
    return newTenant;
  }

  
  
}

export default TenantRepository;
