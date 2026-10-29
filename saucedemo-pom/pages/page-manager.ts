import { type Page } from '@playwright/test';
import { LoginPage } from './login-page';
import { InventoryPage } from './inventory-page';
import { CartPage } from './cart-page';
import { CheckoutPage } from './checkout-page';

export class PageManager {
    //objects
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly inventoryPage: InventoryPage;
    private readonly cartPage: CartPage;
    private readonly checkoutPage: CheckoutPage;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }

    //getter methods
    getLoginPage() {
        return this.loginPage;
    }
    getInventoryPage() {
        return this.inventoryPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
}
