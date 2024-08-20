export interface Property {
    id: number;
    location: string;
    price: number;
    type: string;
    thumbnail?: string; 
    city?: string;
    state?: string;
    rooms?: number;
    bathrooms?: number;
    photos?: Array<string>;
  }