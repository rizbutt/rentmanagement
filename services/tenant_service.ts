import { TenantData } from '@/types/tenant_data_type';
import TenantRepository from '../repositories/tenant_repository';

import { ITenant } from '@/types/models_types/tenant_type';

class TenantService {
  private tenantRepository: TenantRepository;

  constructor() {
    this.tenantRepository = new TenantRepository();
  }
  // for creating or add new Tenant
  async createTenant(tenant_data: ITenant): Promise<ITenant> {
    return this.tenantRepository.create(tenant_data);
  }

  //get all tenant with that user with his id who added them prev
  /*
  return all tenant name list to tenant get api and then
  user will select specific name from list of tenants list 
  */

  async fetchTenants(userId: string): Promise<TenantData>{
    const allTenants =await this.tenantRepository.fetchAllTenants(userId);
    const tenant_data:TenantData={
       tenant_names:[]
    }

    allTenants.forEach((tenant)=> {
      tenant_data.tenant_names.push(tenant.name);
      
    });
    return tenant_data;
  }

}

export default TenantService;
