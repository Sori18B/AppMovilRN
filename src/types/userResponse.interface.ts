import { Address } from './address.Response.interface';
import {OrdersResponse} from './orderResponse.interface';
export interface UserData {
    id: string; 
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    address: Address[];
    orders: OrdersResponse[];
    
}
