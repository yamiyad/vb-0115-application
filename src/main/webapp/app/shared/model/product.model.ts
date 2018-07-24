import { IProductCategory } from 'app/shared/model//product-category.model';

export const enum ProductStatus {
    AVAILABLE = 'AVAILABLE',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    imageContentType?: string;
    image?: any;
    status?: ProductStatus;
    productCategory?: IProductCategory;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number,
        public imageContentType?: string,
        public image?: any,
        public status?: ProductStatus,
        public productCategory?: IProductCategory
    ) {}
}
