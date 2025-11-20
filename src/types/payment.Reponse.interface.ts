import { OrdersResponse } from "./orderResponse.interface";

export interface paymentStatusResponse{
    paymentStatusID: number     ;
    statusName:     string;
    description?: string | null;

    orders: OrdersResponse[];
}