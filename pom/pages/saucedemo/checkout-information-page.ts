import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutInformationPage {

    //Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly pageTitle: Locator;

    //Variables
    private readonly checkoutInformationTitle = "Checkout: Your Information";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.pageTitle = page.locator('[data-test="title"]');
    }

    //Actions
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    //Assertions
    async verifyUserIsOnCheckoutInformationPage() {
        await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
        await expect(this.pageTitle).toHaveText(this.checkoutInformationTitle);
    }
}
