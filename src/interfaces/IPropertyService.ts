// Interface for property service
export interface IPropertyService {
    addProperty(): Promise<void>;
    updateProperty(): Promise<void>;
    getProperties(): Promise<void>;
    getProperty(): Promise<void>;
  }
  