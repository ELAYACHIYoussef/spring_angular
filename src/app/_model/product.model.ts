import { FileHandle } from "./file-handle.module";

export interface Product{
    productId:number;

    productName:string;

    productDescription:string;

    productDiscountPrice:number;

    productActualPrice:number;

    productImages:FileHandle[]
}