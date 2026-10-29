import { type Page } from '@playwright/test';
import { LoginPage } from './login-page';
import { InventoryPage } from './inventory-page';

export class PageManager {
    //objects
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly inventoryPage: InventoryPage;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
    }

    //getter methods
    getLoginPage() {
        return this.loginPage;
    }
    getInventoryPage() {
        return this.inventoryPage;
    }
}
