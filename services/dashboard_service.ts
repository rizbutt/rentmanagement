import { DashboardRepository } from '../repositories/dashboard_repository';

export class DashboardService {
    private dashboardRepository: DashboardRepository;

    constructor() {
        this.dashboardRepository = new DashboardRepository();
    }

    /**
     * Get the total number of properties for the given user.
     * 
     * @param user_id The ID of the user to get the count for.
     * @returns A Promise resolving to the count of properties.
     */
    async getPropertiesCount(user_id: string): Promise<number> {
        return await this.dashboardRepository.getPropertiesCount(user_id);
    }



    /**
     * Get the total number of tenants for the given user.
     * 
     * @param user_id The ID of the user to get the count for.
     * @returns A Promise resolving to the count of tenants.
     */
    async getTenantsCount(user_id: string): Promise<number> {
        return await this.dashboardRepository.getTenantsCount(user_id);
    }
    
    async getTotalRentCurrentMonth(user_id: string): Promise<number> {
        return await this.dashboardRepository.getTotalRentCurrentMonth(user_id);
    }



     /**
     * Gets a breakdown of rent and tenant metrics.
     * 
     * @returns A Promise resolving to an object with breakdown data.
     *-> Collected Rent total number of completed rent for tenants
      where dues of tenant is 0  (rent model)
     * ->Due Rent  total number of uncompleted rent of tenants
       where dues of tenant is greater than 0 (rent model)
     * ->Vacant Property means who is not assigned to any tenants untill now, 
     *  here it means propertyNo(present in Property)!= building_no
     * (present in Tenant and also Rent model)
     *  then count++ for vacant (property model +rent model+tenant model)
     * ->Tenants total counts of rent document includes tenant_name
     */


    /**
     * Get the total collected rent (where dues are 0) for the given user.
     * 
     * @param user_id The ID of the user to get the collected rent for.
     * @returns A Promise resolving to the count of collected rent.
     */
    async getCollectedRentCount(user_id: string): Promise<number> {
        return await this.dashboardRepository.getRentCountByDues(user_id, 0);
    }

    /**
     * Get the total due rent (where dues are greater than 0) for the given user.
     * 
     * @param user_id The ID of the user to get the due rent for.
     * @returns A Promise resolving to the count of due rent.
     */
    async getDueRentCount(user_id: string): Promise<number> {
        return await this.dashboardRepository.getRentCountByDues(user_id, { $gt: 0 });
    }

     /**
     * Get the total number of vacant properties for the given user.
     * 
     * @param user_id The ID of the user to get the count for.
     * @returns A Promise resolving to the count of vacant properties.
     */
     async getVacantPropertiesCount(user_id: string): Promise<number> {
        // Get occupied building numbers from tenants and rents
        const occupiedBuildingNumbersFromTenants = await this.dashboardRepository.getOccupiedBuildingNumbersFromTenants(user_id);
        const occupiedBuildingNumbersFromRents = await this.dashboardRepository.getOccupiedBuildingNumbersFromRents(user_id);
        
        // Combine both lists and remove duplicates
        const occupiedBuildingNumbers = Array.from(new Set([...occupiedBuildingNumbersFromTenants, ...occupiedBuildingNumbersFromRents]));

        // Get the count of vacant properties by excluding the occupied ones
        return await this.dashboardRepository.getVacantPropertiesCount(user_id, occupiedBuildingNumbers);
    }

    /**
     * Get the complete dashboard metrics for the given user.
     * 
     * @param user_id The ID of the user to get the metrics for.
     * @returns A Promise resolving to an object with collected rent, due rent, vacant properties, and total tenants.
     */
    async getDashboardMetrics(user_id: string) {
        const collectedRent = await this.getCollectedRentCount(user_id);
        const dueRent = await this.getDueRentCount(user_id);
        const vacantProperties = await this.getVacantPropertiesCount(user_id);
        const all_tenants = await this.getTenantsCount(user_id);
        const all_properties=await this.getPropertiesCount(user_id);
        const all_rent_current_month=await this.getTotalRentCurrentMonth(user_id);

        return {
            collectedRent,
            dueRent,
            vacantProperties,
            all_tenants,
            all_properties,
            all_rent_current_month
        };
    }
}
