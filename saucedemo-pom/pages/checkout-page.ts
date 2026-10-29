import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {

    //Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly titleLocator: Locator;

    //Variables
    private readonly checkoutOverviewEndpoint = "/checkout-step-two.html";
    private readonly checkoutOverviewTitle = "Checkout: Overview";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.titleLocator = page.locator('[data-test="title"]');
    }

    //Actions
    async fillCheckoutInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    //Assertions
    async verifyUserIsOnCheckoutOverviewPage() {
        await expect(this.page).toHaveURL(new RegExp(this.checkoutOverviewEndpoint));
        await expect(this.titleLocator).toHaveText(this.checkoutOverviewTitle);
    }
}
