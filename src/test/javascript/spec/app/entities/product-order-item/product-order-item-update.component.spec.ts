/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Vb0115ApplicationTestModule } from '../../../test.module';
import { ProductOrderItemUpdateComponent } from 'app/entities/product-order-item/product-order-item-update.component';
import { ProductOrderItemService } from 'app/entities/product-order-item/product-order-item.service';
import { ProductOrderItem } from 'app/shared/model/product-order-item.model';

describe('Component Tests', () => {
    describe('ProductOrderItem Management Update Component', () => {
        let comp: ProductOrderItemUpdateComponent;
        let fixture: ComponentFixture<ProductOrderItemUpdateComponent>;
        let service: ProductOrderItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Vb0115ApplicationTestModule],
                declarations: [ProductOrderItemUpdateComponent]
            })
                .overrideTemplate(ProductOrderItemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductOrderItemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductOrderItemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductOrderItem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productOrderItem = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductOrderItem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productOrderItem = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
