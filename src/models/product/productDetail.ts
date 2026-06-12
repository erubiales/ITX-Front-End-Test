import { Product } from "./product";
import { ProductOptions } from "./productOptions";

export interface ProductDetail extends Product{
    cpu: string;
    ram: string;
    os: string;
    displayResolution: string;
    battery: string;
    primaryCamera: string[];
    secondaryCmera: string[];
    dimentions: string;
    weight: string;
    options: ProductOptions;
}