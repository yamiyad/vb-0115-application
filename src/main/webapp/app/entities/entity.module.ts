import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Vb0115ApplicationProductCategoryModule } from './product-category/product-category.module';
import { Vb0115ApplicationProductModule } from './product/product.module';
import { Vb0115ApplicationCustomerModule } from './customer/customer.module';
import { Vb0115ApplicationProductOrderModule } from './product-order/product-order.module';
import { Vb0115ApplicationProductOrderItemModule } from './product-order-item/product-order-item.module';
import { Vb0115ApplicationInvoiceModule } from './invoice/invoice.module';
import { Vb0115ApplicationShipmentModule } from './shipment/shipment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Vb0115ApplicationProductCategoryModule,
        Vb0115ApplicationProductModule,
        Vb0115ApplicationCustomerModule,
        Vb0115ApplicationProductOrderModule,
        Vb0115ApplicationProductOrderItemModule,
        Vb0115ApplicationInvoiceModule,
        Vb0115ApplicationShipmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vb0115ApplicationEntityModule {}
