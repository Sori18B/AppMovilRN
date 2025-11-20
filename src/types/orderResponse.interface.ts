import {DetailsResponse} from './orderDetailsReponse.interface';
import { UserData } from './userResponse.interface';
import { Address } from './address.Response.interface';
import { DeliveryStatusReponse } from './delyveryStatus.Response.interface';
import { paymentStatusResponse } from './payment.Reponse.interface';
//import {};

export interface OrdersResponse {
    orderID: number;
    userID: number;
    shippingAddressID: number;
    billingAddressID: number;
    orderDate: string; 
    estimatedDeliveryDate?: string | null; 
    actualDeliveryDate?: string | null; 
    orderStatus: string;
    deliveryStatusID?: number | null; 
    subtotalAmount: string; 
    taxAmount: string;
    shippingAmount: string;
    totalAmount: string;
    currency: string;
    stripePaymentIntentID?: string | null; 
    stripeSessionID?: string | null; 
    paymentMethod: string;
    paymentStatusID?: number | null; 
    paidAt?: string | null; 
    customerNote?: string | null; 
    adminNote?: string | null; 
    trackingNumber?: string | null; 
    createdAt: string;
    updatedAt: string;
    user: UserData;
    shippingAddress:Address;
    billingAddress:Address;
    deliveryStatus? :DeliveryStatusReponse | null ; 
   paymentStatus? : paymentStatusResponse | null; 
   orderDetails:DetailsResponse [];
  


}