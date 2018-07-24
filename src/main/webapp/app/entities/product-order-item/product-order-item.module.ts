import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Vb0115ApplicationSharedModule } from 'app/shared';
import {
    ProductOrderItemComponent,
    ProductOrderItemDetailComponent,
    ProductOrderItemUpdateComponent,
    ProductOrderItemDeletePopupComponent,
    ProductOrderItemDeleteDialogComponent,
    productOrderItemRoute,
    productOrderItemPopupRoute
} from './';

const ENTITY_STATES = [...productOrderItemRoute, ...productOrderItemPopupRoute];

@NgModule({
    imports: [Vb0115ApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductOrderItemComponent,
        ProductOrderItemDetailComponent,
        ProductOrderItemUpdateComponent,
        ProductOrderItemDeleteDialogComponent,
        ProductOrderItemDeletePopupComponent
    ],
    entryComponents: [
        ProductOrderItemComponent,
        ProductOrderItemUpdateComponent,
        ProductOrderItemDeleteDialogComponent,
        ProductOrderItemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vb0115ApplicationProductOrderItemModule {}
