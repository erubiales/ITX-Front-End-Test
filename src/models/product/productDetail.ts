import { Product } from "./product";
import { ProductOptions } from "./productOptions";

export interface ProductDetail extends Product{
    cpu: string;
    ram: string;
    os: string;
    displayResolution: string;
    battery: string;
    primaryCamera: string | string[];
    secondaryCmera: string | string[];
    dimentions: string;
    weight: string;
    options: ProductOptions;
}