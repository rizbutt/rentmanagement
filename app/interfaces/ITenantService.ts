import { CreateTenantDTO } from "../dtos/CreateTenantDTO";
import { UpdateTenantDTO } from "../dtos/UpdateTenantDTO";
import { ITenant } from "../models/Tenant";

// Interface for tenant service
export interface ITenantService {
  createTenant(createTenantDTO: CreateTenantDTO): Promise<ITenant>;
  updateTenant(tenantId: string, updateTenantDTO: UpdateTenantDTO): Promise<ITenant | null>;
  getTenants(): Promise<ITenant[]>;
  getTenant(tenantId: string): Promise<ITenant | null>;
  deleteTenant(tenantId: string): Promise<ITenant | null>;
}
