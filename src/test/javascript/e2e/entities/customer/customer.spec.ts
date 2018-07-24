import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CustomerComponentsPage, CustomerUpdatePage } from './customer.page-object';

describe('Customer e2e test', () => {
    let navBarPage: NavBarPage;
    let customerUpdatePage: CustomerUpdatePage;
    let customerComponentsPage: CustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Customers', () => {
        navBarPage.goToEntity('customer');
        customerComponentsPage = new CustomerComponentsPage();
        expect(customerComponentsPage.getTitle()).toMatch(/Customers/);
    });

    it('should load create Customer page', () => {
        customerComponentsPage.clickOnCreateButton();
        customerUpdatePage = new CustomerUpdatePage();
        expect(customerUpdatePage.getPageTitle()).toMatch(/Create or edit a Customer/);
        customerUpdatePage.cancel();
    });

    it('should create and save Customers', () => {
        customerComponentsPage.clickOnCreateButton();
        customerUpdatePage.setPhoneInput('phone');
        expect(customerUpdatePage.getPhoneInput()).toMatch('phone');
        customerUpdatePage.setAddressLineInput('addressLine');
        expect(customerUpdatePage.getAddressLineInput()).toMatch('addressLine');
        customerUpdatePage.setPostcodeInput('postcode');
        expect(customerUpdatePage.getPostcodeInput()).toMatch('postcode');
        customerUpdatePage.setCityInput('city');
        expect(customerUpdatePage.getCityInput()).toMatch('city');
        customerUpdatePage.userSelectLastOption();
        customerUpdatePage.save();
        expect(customerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
