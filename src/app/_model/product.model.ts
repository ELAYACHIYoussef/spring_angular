import { FileHandle } from "./file-handle.module";

export interface Product{

    productName:string;

    productDescription:string;

    productDiscountPrice:number;

    productActualPrice:number;

    productImages:FileHandle[]
}