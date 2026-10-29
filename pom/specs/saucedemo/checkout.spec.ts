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

//Test Case 5: Checkout Information
sauceData.checkoutCases.forEach(({ productName, firstName, lastName, postalCode }) => {
    test(`Complete checkout information for ${firstName} ${lastName} with ${productName}`, async ({ page }) => {
        //2. Add a product from JSON
        await pageManager.getInventoryPage().addProductToCart(productName);

        //3. Open the cart
        await pageManager.getInventoryPage().openCart();
        await pageManager.getCartPage().verifyProductIsInCart(productName);

        //4. Proceed to Checkout
        await pageManager.getCartPage().clickCheckoutButton();
        await pageManager.getCheckoutInformationPage().verifyUserIsOnCheckoutInformationPage();

        //5. Fill the checkout form with First Name, Last Name and ZIP Code from JSON
        await pageManager.getCheckoutInformationPage().fillCheckoutInformation(firstName, lastName, postalCode);

        //6. Verify that the user is navigated to the Checkout Overview page
        await pageManager.getCheckoutOverviewPage().verifyUserIsOnCheckoutOverviewPage();
        await pageManager.getCheckoutOverviewPage().verifyProductIsInOverview(productName);
    });
});
