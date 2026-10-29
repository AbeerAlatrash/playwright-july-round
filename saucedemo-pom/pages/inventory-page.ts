import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {

    //Locators
    private readonly titleLocator: Locator;
    private readonly inventoryListLocator: Locator;
    private readonly cartBadgeLocator: Locator;

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
    }

    //Actions
    async addProductToCart(productName: string) {
        await this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
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
}
