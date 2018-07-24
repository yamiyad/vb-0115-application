import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProductCategoryComponentsPage, ProductCategoryUpdatePage } from './product-category.page-object';

describe('ProductCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let productCategoryUpdatePage: ProductCategoryUpdatePage;
    let productCategoryComponentsPage: ProductCategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProductCategories', () => {
        navBarPage.goToEntity('product-category');
        productCategoryComponentsPage = new ProductCategoryComponentsPage();
        expect(productCategoryComponentsPage.getTitle()).toMatch(/Product Categories/);
    });

    it('should load create ProductCategory page', () => {
        productCategoryComponentsPage.clickOnCreateButton();
        productCategoryUpdatePage = new ProductCategoryUpdatePage();
        expect(productCategoryUpdatePage.getPageTitle()).toMatch(/Create or edit a Product Category/);
        productCategoryUpdatePage.cancel();
    });

    it('should create and save ProductCategories', () => {
        productCategoryComponentsPage.clickOnCreateButton();
        productCategoryUpdatePage.setNameInput('name');
        expect(productCategoryUpdatePage.getNameInput()).toMatch('name');
        productCategoryUpdatePage.setDescriptionInput('description');
        expect(productCategoryUpdatePage.getDescriptionInput()).toMatch('description');
        productCategoryUpdatePage.save();
        expect(productCategoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
