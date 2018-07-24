import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductOrderItem } from 'app/shared/model/product-order-item.model';

@Component({
    selector: 'jhi-product-order-item-detail',
    templateUrl: './product-order-item-detail.component.html'
})
export class ProductOrderItemDetailComponent implements OnInit {
    productOrderItem: IProductOrderItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productOrderItem }) => {
            this.productOrderItem = productOrderItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
