import Property from '../models/property_model';
import Tenant from '../models/tenant_model';
import Rent from '../models/rent_model';

export class DashboardRepository {

    /**
     * Gets the count of all properties.
     * 
     * @param user_id The ID of the user to filter properties.
     * @returns A Promise resolving to the count of properties.
     */
    async getPropertiesCount(user_id: string): Promise<number> {
        try {
            return await Property.countDocuments({ user_id }).exec();
        } catch (error) {
            console.error('Error getting properties count:', error);
            throw new Error('Could not fetch properties count.');
        }
    }

    /**
     * Gets the count of all tenants.
     * 
     * @param user_id The ID of the user to filter tenants.
     * @returns A Promise resolving to the count of tenants.
     */
    async getTenantsCount(user_id: string): Promise<number> {
        try {
            return await Tenant.countDocuments({ user_id }).exec();
        } catch (error) {
            console.error('Error getting tenants count:', error);
            throw new Error('Could not fetch tenants count.');
        }
    }

    /**
     * Gets the total rent collected for the current month.
     * 
     * @param user_id The ID of the user to filter rents.
     * @returns A Promise resolving to the total rent for the current month.
     */
    async getTotalRentCurrentMonth(user_id: string): Promise<number> {
        try {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();

            const rentData = await Tenant.aggregate([
                {
                    $match: {
                        user_id: user_id,
                        month: currentMonth,
                        year: currentYear,
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRent: { $sum: '$monthly_rent' }
                    }
                }
            ]).exec();

            return rentData.length > 0 ? rentData[0].totalRent : 0;
        } catch (error) {
            console.error('Error getting total rent for current month:', error);
            throw new Error('Could not fetch total rent for the current month.');
        }
    }

    
    
       /**
     * Fetch the count of rents with specific dues condition.
     * 
     * @param user_id The ID of the user.
     * @param duesCondition The dues condition to match (e.g., 0 for collected rent, >0 for due rent).
     * @returns A Promise resolving to the count of rents.
     */
      
       async getRentCountByDues(user_id: string, duesCondition: any): Promise<number> {
        try {
            return await Rent.countDocuments({ user_id, dues: duesCondition }).exec();
        } catch (error) {
            console.error('Error getting rent count by dues:', error);
            throw new Error('Could not fetch rent count by dues.');
        }
    }   
    
     /**
     * Fetch distinct building numbers that are occupied by tenants.
     * 
     * @param user_id The ID of the user.
     * @returns A Promise resolving to an array of building numbers.
     */
     async getOccupiedBuildingNumbersFromTenants(user_id: string): Promise<string[]> {
        try {
            return await Tenant.distinct('building_no', { user_id }).exec();
        } catch (error) {
            console.error('Error getting occupied building numbers from tenants:', error);
            throw new Error('Could not fetch occupied building numbers from tenants.');
        }
    }

    /**
     * Fetch distinct building numbers that have rent records.
     * 
     * @param user_id The ID of the user.
     * @returns A Promise resolving to an array of building numbers.
     */
    async getOccupiedBuildingNumbersFromRents(user_id: string): Promise<string[]> {
        try {
            return await Rent.distinct('building_no', { user_id }).exec();
        } catch (error) {
            console.error('Error getting occupied building numbers from rents:', error);
            throw new Error('Could not fetch occupied building numbers from rents.');
        }
    }

    async getTenantsInRent(user_id:string): Promise<number>{
        try {
            return await Rent.countDocuments({ user_id }).exec();
        } catch (error) {
            console.error('Error getting occupied building numbers from rents:', error);
            throw new Error('Could not fetch occupied building numbers from rents.');
        }
    }
    

    /**
     * Fetch the count of vacant properties (not occupied by any tenant or rent).
     * 
     * @param user_id The ID of the user.
     * @param occupiedBuildingNumbers Array of building numbers that are occupied.
     * @returns A Promise resolving to the count of vacant properties.
     */
    async getVacantPropertiesCount(user_id: string, occupiedBuildingNumbers: string[]): Promise<number> {
        try {
            return await Property.countDocuments({ 
                user_id, 
                propertyNo: { $nin: occupiedBuildingNumbers }
            }).exec();
        } catch (error) {
            console.error('Error getting vacant properties count:', error);
            throw new Error('Could not fetch vacant properties count.');
        }
    }
    
}
