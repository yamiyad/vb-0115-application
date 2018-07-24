import { IProduct } from 'app/shared/model//product.model';
import { IProductOrder } from 'app/shared/model//product-order.model';

export interface IProductOrderItem {
    id?: number;
    quantity?: number;
    calculatedPrice?: number;
    product?: IProduct;
    order?: IProductOrder;
}

export class ProductOrderItem implements IProductOrderItem {
    constructor(
        public id?: number,
        public quantity?: number,
        public calculatedPrice?: number,
        public product?: IProduct,
        public order?: IProductOrder
    ) {}
}
