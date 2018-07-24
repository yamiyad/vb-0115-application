import { IUser } from 'app/core/user/user.model';
import { IProductOrder } from 'app/shared/model//product-order.model';

export interface ICustomer {
    id?: number;
    phone?: string;
    addressLine?: string;
    postcode?: string;
    city?: string;
    user?: IUser;
    orders?: IProductOrder[];
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public phone?: string,
        public addressLine?: string,
        public postcode?: string,
        public city?: string,
        public user?: IUser,
        public orders?: IProductOrder[]
    ) {}
}
