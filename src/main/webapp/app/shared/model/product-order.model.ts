import { Moment } from 'moment';
import { IProductOrderItem } from 'app/shared/model//product-order-item.model';
import { IInvoice } from 'app/shared/model//invoice.model';
import { ICustomer } from 'app/shared/model//customer.model';

export interface IProductOrder {
    id?: number;
    placedDate?: Moment;
    remarks?: string;
    orderItems?: IProductOrderItem[];
    invoices?: IInvoice[];
    customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
    constructor(
        public id?: number,
        public placedDate?: Moment,
        public remarks?: string,
        public orderItems?: IProductOrderItem[],
        public invoices?: IInvoice[],
        public customer?: ICustomer
    ) {}
}
