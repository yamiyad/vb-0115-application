import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ShipmentComponentsPage, ShipmentUpdatePage } from './shipment.page-object';

describe('Shipment e2e test', () => {
    let navBarPage: NavBarPage;
    let shipmentUpdatePage: ShipmentUpdatePage;
    let shipmentComponentsPage: ShipmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Shipments', () => {
        navBarPage.goToEntity('shipment');
        shipmentComponentsPage = new ShipmentComponentsPage();
        expect(shipmentComponentsPage.getTitle()).toMatch(/Shipments/);
    });

    it('should load create Shipment page', () => {
        shipmentComponentsPage.clickOnCreateButton();
        shipmentUpdatePage = new ShipmentUpdatePage();
        expect(shipmentUpdatePage.getPageTitle()).toMatch(/Create or edit a Shipment/);
        shipmentUpdatePage.cancel();
    });

    it('should create and save Shipments', () => {
        shipmentComponentsPage.clickOnCreateButton();
        shipmentUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(shipmentUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        shipmentUpdatePage.setDetailsInput('details');
        expect(shipmentUpdatePage.getDetailsInput()).toMatch('details');
        shipmentUpdatePage.invoiceSelectLastOption();
        shipmentUpdatePage.save();
        expect(shipmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
