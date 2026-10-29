import { type Page } from '@playwright/test';
//import
import { SauceLoginPage } from './sauce-login-page';
import { InventoryPage } from './inventory-page';
import { CartPage } from './cart-page';
import { CheckoutInformationPage } from './checkout-information-page';
import { CheckoutOverviewPage } from './checkout-overview-page';

export class SaucePageManager {
    //objects
    private readonly page: Page;
    private readonly loginPage: SauceLoginPage;
    private readonly inventoryPage: InventoryPage;
    private readonly cartPage: CartPage;
    private readonly checkoutInformationPage: CheckoutInformationPage;
    private readonly checkoutOverviewPage: CheckoutOverviewPage;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new SauceLoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutInformationPage = new CheckoutInformationPage(page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(page);
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
    getCheckoutInformationPage() {
        return this.checkoutInformationPage;
    }
    getCheckoutOverviewPage() {
        return this.checkoutOverviewPage;
    }
}
