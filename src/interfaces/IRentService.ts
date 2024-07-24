// Interface for rent service
export interface IRentService {
    createLease(): Promise<void>;
    collectRent(): Promise<void>;
    getUnpaidProperties(): Promise<void>;
  }
  