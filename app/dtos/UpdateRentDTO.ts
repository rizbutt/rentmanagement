export interface UpdateLeaseDTO {
    tenantId?: string;
    paidAmount?: number;
    rentAmount?: number;
    startDate?: Date;
    dues?: number;
    payBank?: string;
  }
  