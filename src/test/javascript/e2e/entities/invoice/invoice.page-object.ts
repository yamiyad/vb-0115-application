import { element, by, promise, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-invoice div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class InvoiceUpdatePage {
    pageTitle = element(by.id('jhi-invoice-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    detailsInput = element(by.id('field_details'));
    statusSelect = element(by.id('field_status'));
    paymentDateInput = element(by.id('field_paymentDate'));
    paymentAmountInput = element(by.id('field_paymentAmount'));
    orderSelect = element(by.id('field_order'));

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

    setStatusSelect(status): promise.Promise<void> {
        return this.statusSelect.sendKeys(status);
    }

    getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption(): promise.Promise<void> {
        return this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setPaymentDateInput(paymentDate): promise.Promise<void> {
        return this.paymentDateInput.sendKeys(paymentDate);
    }

    getPaymentDateInput() {
        return this.paymentDateInput.getAttribute('value');
    }

    setPaymentAmountInput(paymentAmount): promise.Promise<void> {
        return this.paymentAmountInput.sendKeys(paymentAmount);
    }

    getPaymentAmountInput() {
        return this.paymentAmountInput.getAttribute('value');
    }

    orderSelectLastOption(): promise.Promise<void> {
        return this.orderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    orderSelectOption(option): promise.Promise<void> {
        return this.orderSelect.sendKeys(option);
    }

    getOrderSelect(): ElementFinder {
        return this.orderSelect;
    }

    getOrderSelectedOption() {
        return this.orderSelect.element(by.css('option:checked')).getText();
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
