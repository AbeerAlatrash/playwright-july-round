import { test } from '@playwright/test';
import { SaucePageManager } from '../../pages/saucedemo/sauce-page-manager';
import sauceData from '../../test-data/saucedemo/sauce-data.json';

test.use({ baseURL: 'https://www.saucedemo.com' });

let pageManager: SaucePageManager;

test.beforeEach(async ({ page }) => {
    //1. Login using valid credentials
    pageManager = new SaucePageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
    await pageManager.getLoginPage().login(sauceData.validUser.username, sauceData.validUser.password);
    await pageManager.getLoginPage().verifyUserIsLoggedIn();
});

//Test Case 4: Remove Product from Cart
sauceData.removeProductCases.forEach(({ productName }) => {
    test(`Remove a product from the cart: ${productName}`, async ({ page }) => {
        //2. Add the product (read from JSON) to the cart
        await pageManager.getInventoryPage().addProductToCart(productName);
        await pageManager.getInventoryPage().verifyCartBadgeCount(1);

        //3. Remove the same product
        await pageManager.getInventoryPage().removeProductFromCart(productName);

        //4. Verify that the cart is empty
        await pageManager.getInventoryPage().verifyCartBadgeIsHidden();
        await pageManager.getInventoryPage().openCart();
        await pageManager.getCartPage().verifyCartIsEmpty();
    });
});
