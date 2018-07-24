/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Vb0115ApplicationTestModule } from '../../../test.module';
import { ProductOrderItemDeleteDialogComponent } from 'app/entities/product-order-item/product-order-item-delete-dialog.component';
import { ProductOrderItemService } from 'app/entities/product-order-item/product-order-item.service';

describe('Component Tests', () => {
    describe('ProductOrderItem Management Delete Component', () => {
        let comp: ProductOrderItemDeleteDialogComponent;
        let fixture: ComponentFixture<ProductOrderItemDeleteDialogComponent>;
        let service: ProductOrderItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Vb0115ApplicationTestModule],
                declarations: [ProductOrderItemDeleteDialogComponent]
            })
                .overrideTemplate(ProductOrderItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductOrderItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductOrderItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
