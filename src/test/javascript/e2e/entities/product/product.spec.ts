import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProductComponentsPage, ProductUpdatePage } from './product.page-object';
import * as path from 'path';

describe('Product e2e test', () => {
    let navBarPage: NavBarPage;
    let productUpdatePage: ProductUpdatePage;
    let productComponentsPage: ProductComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle()).toMatch(/Products/);
    });

    it('should load create Product page', () => {
        productComponentsPage.clickOnCreateButton();
        productUpdatePage = new ProductUpdatePage();
        expect(productUpdatePage.getPageTitle()).toMatch(/Create or edit a Product/);
        productUpdatePage.cancel();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productUpdatePage.setNameInput('name');
        expect(productUpdatePage.getNameInput()).toMatch('name');
        productUpdatePage.setDescriptionInput('description');
        expect(productUpdatePage.getDescriptionInput()).toMatch('description');
        productUpdatePage.setPriceInput('5');
        expect(productUpdatePage.getPriceInput()).toMatch('5');
        productUpdatePage.setImageInput(absolutePath);
        productUpdatePage.statusSelectLastOption();
        productUpdatePage.productCategorySelectLastOption();
        productUpdatePage.save();
        expect(productUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
