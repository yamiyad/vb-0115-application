import { Moment } from 'moment';
import { IShipment } from 'app/shared/model//shipment.model';
import { IProductOrder } from 'app/shared/model//product-order.model';

export const enum InvoiceStatus {
    ISSUED = 'ISSUED',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED'
}

export interface IInvoice {
    id?: number;
    date?: Moment;
    details?: string;
    status?: InvoiceStatus;
    paymentDate?: Moment;
    paymentAmount?: number;
    shipments?: IShipment[];
    order?: IProductOrder;
}

export class Invoice implements IInvoice {
    constructor(
        public id?: number,
        public date?: Moment,
        public details?: string,
        public status?: InvoiceStatus,
        public paymentDate?: Moment,
        public paymentAmount?: number,
        public shipments?: IShipment[],
        public order?: IProductOrder
    ) {}
}
