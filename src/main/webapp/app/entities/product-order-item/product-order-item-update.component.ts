import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProductOrderItem } from 'app/shared/model/product-order-item.model';
import { ProductOrderItemService } from './product-order-item.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from 'app/entities/product-order';

@Component({
    selector: 'jhi-product-order-item-update',
    templateUrl: './product-order-item-update.component.html'
})
export class ProductOrderItemUpdateComponent implements OnInit {
    private _productOrderItem: IProductOrderItem;
    isSaving: boolean;

    products: IProduct[];

    productorders: IProductOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private productOrderItemService: ProductOrderItemService,
        private productService: ProductService,
        private productOrderService: ProductOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productOrderItem }) => {
            this.productOrderItem = productOrderItem;
        });
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productOrderService.query().subscribe(
            (res: HttpResponse<IProductOrder[]>) => {
                this.productorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productOrderItem.id !== undefined) {
            this.subscribeToSaveResponse(this.productOrderItemService.update(this.productOrderItem));
        } else {
            this.subscribeToSaveResponse(this.productOrderItemService.create(this.productOrderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductOrderItem>>) {
        result.subscribe((res: HttpResponse<IProductOrderItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductById(index: number, item: IProduct) {
        return item.id;
    }

    trackProductOrderById(index: number, item: IProductOrder) {
        return item.id;
    }
    get productOrderItem() {
        return this._productOrderItem;
    }

    set productOrderItem(productOrderItem: IProductOrderItem) {
        this._productOrderItem = productOrderItem;
    }
}
