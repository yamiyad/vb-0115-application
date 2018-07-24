import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductOrderItem } from 'app/shared/model/product-order-item.model';
import { ProductOrderItemService } from './product-order-item.service';

@Component({
    selector: 'jhi-product-order-item-delete-dialog',
    templateUrl: './product-order-item-delete-dialog.component.html'
})
export class ProductOrderItemDeleteDialogComponent {
    productOrderItem: IProductOrderItem;

    constructor(
        private productOrderItemService: ProductOrderItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productOrderItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productOrderItemListModification',
                content: 'Deleted an productOrderItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-order-item-delete-popup',
    template: ''
})
export class ProductOrderItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productOrderItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductOrderItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productOrderItem = productOrderItem;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
