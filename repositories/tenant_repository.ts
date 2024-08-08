
import Tenant from '../models/tenant_model';
import { ITenant } from '@/types/models_types/tenant_type';

class TenantRepository {
  async create(tenant_data: ITenant): Promise<ITenant> {
    const newTenant = new Tenant(tenant_data);
    await newTenant.save();
    return newTenant;
  }

 // fetching all tenants data  rent  to tenant  service
  async fetchAllTenants(user_id: string): Promise<ITenant[]> {
    return await Tenant.find({ user_id: user_id }).populate('user_id').exec();
  }
  
  
}

export default TenantRepository;
