import { Address } from './address.Response.interface';
export interface UserData {
    id: string; 
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    address: Address[];
  }
  