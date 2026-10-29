import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {

    //Locators
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;

    //Variables
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    //Helpers
    private getProductCard(productName: string): Locator {
        return this.inventoryItems.filter({ hasText: productName });
    }

    //Actions
    async addProductToCart(productName: string) {
        await this.getProductCard(productName).getByRole('button', { name: 'Add to cart' }).click();
    }
    async removeProductFromCart(productName: string) {
        await this.getProductCard(productName).getByRole('button', { name: 'Remove' }).click();
    }
    async openCart() {
        await this.cartLink.click();
    }

    //Assertions
    async verifyCartBadgeCount(count: number) {
        await expect(this.cartBadge).toHaveText(count.toString());
    }
    async verifyCartBadgeIsHidden() {
        await expect(this.cartBadge).toBeHidden();
    }
}
