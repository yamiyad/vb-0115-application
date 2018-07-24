/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Vb0115ApplicationTestModule } from '../../../test.module';
import { ProductOrderItemDetailComponent } from 'app/entities/product-order-item/product-order-item-detail.component';
import { ProductOrderItem } from 'app/shared/model/product-order-item.model';

describe('Component Tests', () => {
    describe('ProductOrderItem Management Detail Component', () => {
        let comp: ProductOrderItemDetailComponent;
        let fixture: ComponentFixture<ProductOrderItemDetailComponent>;
        const route = ({ data: of({ productOrderItem: new ProductOrderItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Vb0115ApplicationTestModule],
                declarations: [ProductOrderItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductOrderItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductOrderItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productOrderItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
