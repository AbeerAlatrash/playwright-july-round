import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {

    //Locators
    private readonly titleLocator: Locator;
    private readonly inventoryListLocator: Locator;
    private readonly cartBadgeLocator: Locator;
    private readonly cartLinkLocator: Locator;

    //Variables
    private readonly inventoryEndpoint = "/inventory.html";
    private readonly pageTitle = "Products";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.titleLocator = page.locator('[data-test="title"]');
        this.inventoryListLocator = page.locator('[data-test="inventory-list"]');
        this.cartBadgeLocator = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLinkLocator = page.locator('[data-test="shopping-cart-link"]');
    }

    //Helpers
    private productItem(productName: string): Locator {
        return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    }

    //Actions
    async addProductToCart(productName: string) {
        await this.productItem(productName).getByRole('button', { name: 'Add to cart' }).click();
    }
    async removeProductFromCart(productName: string) {
        await this.productItem(productName).getByRole('button', { name: 'Remove' }).click();
    }
    async openCart() {
        await this.cartLinkLocator.click();
    }

    //Assertions
    async verifyUserIsOnInventoryPage() {
        await expect(this.page).toHaveURL(new RegExp(this.inventoryEndpoint));
        await expect(this.titleLocator).toHaveText(this.pageTitle);
        await expect(this.inventoryListLocator).toBeVisible();
    }
    async verifyCartBadgeCount(count: number) {
        await expect(this.cartBadgeLocator).toHaveText(count.toString());
    }
    async verifyCartBadgeIsHidden() {
        await expect(this.cartBadgeLocator).toBeHidden();
    }
}
