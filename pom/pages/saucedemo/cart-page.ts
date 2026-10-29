import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {

    //Locators
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;

    //Variables
    private readonly cartEndpoint = "/cart.html";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    //Actions
    async navigateToCartPage() {
        await this.page.goto(this.cartEndpoint); //baseURL/cart.html
    }
    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    //Assertions
    async verifyProductIsInCart(productName: string) {
        await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
    }
    async verifyCartIsEmpty() {
        await expect(this.page).toHaveURL(/.*cart.html/);
        await expect(this.cartItems).toHaveCount(0);
    }
}
