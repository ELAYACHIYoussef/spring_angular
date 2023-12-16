import { OrderQuantity } from "./order-quantity.model";

export interface OrderDetails{
    fullName: string;
    fullAdresse: string;
    contactNumber:string;
    alternateContactNumber:string;
    orderProductQuantities:OrderQuantity[];
}