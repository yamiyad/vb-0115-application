import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProductOrderItemComponentsPage, ProductOrderItemUpdatePage } from './product-order-item.page-object';

describe('ProductOrderItem e2e test', () => {
    let navBarPage: NavBarPage;
    let productOrderItemUpdatePage: ProductOrderItemUpdatePage;
    let productOrderItemComponentsPage: ProductOrderItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductOrderItems', () => {
        navBarPage.goToEntity('product-order-item');
        productOrderItemComponentsPage = new ProductOrderItemComponentsPage();
        expect(productOrderItemComponentsPage.getTitle()).toMatch(/Product Order Items/);
    });

    it('should load create ProductOrderItem page', () => {
        productOrderItemComponentsPage.clickOnCreateButton();
        productOrderItemUpdatePage = new ProductOrderItemUpdatePage();
        expect(productOrderItemUpdatePage.getPageTitle()).toMatch(/Create or edit a Product Order Item/);
        productOrderItemUpdatePage.cancel();
    });

    it('should create and save ProductOrderItems', () => {
        productOrderItemComponentsPage.clickOnCreateButton();
        productOrderItemUpdatePage.setQuantityInput('5');
        expect(productOrderItemUpdatePage.getQuantityInput()).toMatch('5');
        productOrderItemUpdatePage.setCalculatedPriceInput('5');
        expect(productOrderItemUpdatePage.getCalculatedPriceInput()).toMatch('5');
        productOrderItemUpdatePage.productSelectLastOption();
        productOrderItemUpdatePage.orderSelectLastOption();
        productOrderItemUpdatePage.save();
        expect(productOrderItemUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
