import { element, by, promise, ElementFinder } from 'protractor';

export class ShipmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-shipment div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class ShipmentUpdatePage {
    pageTitle = element(by.id('jhi-shipment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    detailsInput = element(by.id('field_details'));
    invoiceSelect = element(by.id('field_invoice'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    setDetailsInput(details): promise.Promise<void> {
        return this.detailsInput.sendKeys(details);
    }

    getDetailsInput() {
        return this.detailsInput.getAttribute('value');
    }

    invoiceSelectLastOption(): promise.Promise<void> {
        return this.invoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    invoiceSelectOption(option): promise.Promise<void> {
        return this.invoiceSelect.sendKeys(option);
    }

    getInvoiceSelect(): ElementFinder {
        return this.invoiceSelect;
    }

    getInvoiceSelectedOption() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
