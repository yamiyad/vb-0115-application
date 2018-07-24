import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductOrderItem } from 'app/shared/model/product-order-item.model';
import { ProductOrderItemService } from './product-order-item.service';
import { ProductOrderItemComponent } from './product-order-item.component';
import { ProductOrderItemDetailComponent } from './product-order-item-detail.component';
import { ProductOrderItemUpdateComponent } from './product-order-item-update.component';
import { ProductOrderItemDeletePopupComponent } from './product-order-item-delete-dialog.component';
import { IProductOrderItem } from 'app/shared/model/product-order-item.model';

@Injectable({ providedIn: 'root' })
export class ProductOrderItemResolve implements Resolve<IProductOrderItem> {
    constructor(private service: ProductOrderItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productOrderItem: HttpResponse<ProductOrderItem>) => productOrderItem.body));
        }
        return of(new ProductOrderItem());
    }
}

export const productOrderItemRoute: Routes = [
    {
        path: 'product-order-item',
        component: ProductOrderItemComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'ProductOrderItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-order-item/:id/view',
        component: ProductOrderItemDetailComponent,
        resolve: {
            productOrderItem: ProductOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductOrderItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-order-item/new',
        component: ProductOrderItemUpdateComponent,
        resolve: {
            productOrderItem: ProductOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductOrderItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-order-item/:id/edit',
        component: ProductOrderItemUpdateComponent,
        resolve: {
            productOrderItem: ProductOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductOrderItems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productOrderItemPopupRoute: Routes = [
    {
        path: 'product-order-item/:id/delete',
        component: ProductOrderItemDeletePopupComponent,
        resolve: {
            productOrderItem: ProductOrderItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductOrderItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
