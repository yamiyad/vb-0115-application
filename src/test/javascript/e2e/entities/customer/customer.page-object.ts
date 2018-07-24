import { element, by, promise, ElementFinder } from 'protractor';

export class CustomerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-customer div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class CustomerUpdatePage {
    pageTitle = element(by.id('jhi-customer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    phoneInput = element(by.id('field_phone'));
    addressLineInput = element(by.id('field_addressLine'));
    postcodeInput = element(by.id('field_postcode'));
    cityInput = element(by.id('field_city'));
    userSelect = element(by.id('field_user'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setPhoneInput(phone): promise.Promise<void> {
        return this.phoneInput.sendKeys(phone);
    }

    getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    setAddressLineInput(addressLine): promise.Promise<void> {
        return this.addressLineInput.sendKeys(addressLine);
    }

    getAddressLineInput() {
        return this.addressLineInput.getAttribute('value');
    }

    setPostcodeInput(postcode): promise.Promise<void> {
        return this.postcodeInput.sendKeys(postcode);
    }

    getPostcodeInput() {
        return this.postcodeInput.getAttribute('value');
    }

    setCityInput(city): promise.Promise<void> {
        return this.cityInput.sendKeys(city);
    }

    getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
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
