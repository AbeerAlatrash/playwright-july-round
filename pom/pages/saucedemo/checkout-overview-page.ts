import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {

    //Locators
    private readonly pageTitle: Locator;
    private readonly cartItems: Locator;

    //Variables
    private readonly checkoutOverviewTitle = "Checkout: Overview";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
    }

    //Assertions
    async verifyUserIsOnCheckoutOverviewPage() {
        await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
        await expect(this.pageTitle).toHaveText(this.checkoutOverviewTitle);
    }
    async verifyProductIsInOverview(productName: string) {
        await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
    }
}
