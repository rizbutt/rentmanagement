// Interface for tenant service
export interface ITenantService {
    createTenant(): Promise<void>;
    updateTenant(): Promise<void>;
    getTenants(): Promise<void>;
    getTenant(): Promise<void>;
  }
  