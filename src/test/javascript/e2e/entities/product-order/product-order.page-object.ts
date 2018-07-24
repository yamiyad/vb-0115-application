import { element, by, promise, ElementFinder } from 'protractor';

export class ProductOrderComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-product-order div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class ProductOrderUpdatePage {
    pageTitle = element(by.id('jhi-product-order-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    placedDateInput = element(by.id('field_placedDate'));
    remarksInput = element(by.id('field_remarks'));
    customerSelect = element(by.id('field_customer'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setPlacedDateInput(placedDate): promise.Promise<void> {
        return this.placedDateInput.sendKeys(placedDate);
    }

    getPlacedDateInput() {
        return this.placedDateInput.getAttribute('value');
    }

    setRemarksInput(remarks): promise.Promise<void> {
        return this.remarksInput.sendKeys(remarks);
    }

    getRemarksInput() {
        return this.remarksInput.getAttribute('value');
    }

    customerSelectLastOption(): promise.Promise<void> {
        return this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    customerSelectOption(option): promise.Promise<void> {
        return this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
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
