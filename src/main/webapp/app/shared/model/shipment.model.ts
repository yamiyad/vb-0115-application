import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model//invoice.model';

export interface IShipment {
    id?: number;
    date?: Moment;
    details?: string;
    invoice?: IInvoice;
}

export class Shipment implements IShipment {
    constructor(public id?: number, public date?: Moment, public details?: string, public invoice?: IInvoice) {}
}
