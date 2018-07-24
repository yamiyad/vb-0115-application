import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Vb0115ApplicationSharedModule } from 'app/shared';
import {
    ProductCategoryComponent,
    ProductCategoryDetailComponent,
    ProductCategoryUpdateComponent,
    ProductCategoryDeletePopupComponent,
    ProductCategoryDeleteDialogComponent,
    productCategoryRoute,
    productCategoryPopupRoute
} from './';

const ENTITY_STATES = [...productCategoryRoute, ...productCategoryPopupRoute];

@NgModule({
    imports: [Vb0115ApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductCategoryComponent,
        ProductCategoryDetailComponent,
        ProductCategoryUpdateComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryDeletePopupComponent
    ],
    entryComponents: [
        ProductCategoryComponent,
        ProductCategoryUpdateComponent,
        ProductCategoryDeleteDialogComponent,
        ProductCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Vb0115ApplicationProductCategoryModule {}
