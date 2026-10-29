import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager';
import loginData from '../test-data/login-data.json';
import products from '../test-data/products.json';
import checkoutData from '../test-data/checkout-data.json';

const validUser = loginData.validUsers[0];
let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
    await pageManager.getLoginPage().login(validUser.username, validUser.password);
    await pageManager.getInventoryPage().verifyUserIsOnInventoryPage();
});

// Test Case 3: Add Product to Cart (DDT)
products.forEach(({ productName }) => {
    test(`Add a product to the cart - ${productName}`, async () => {
        await pageManager.getInventoryPage().addProductToCart(productName);
        await pageManager.getInventoryPage().verifyCartBadgeCount(1);
    });
});

// Test Case 4: Remove Product from Cart (DDT)
products.forEach(({ productName }) => {
    test(`Remove a product from the cart - ${productName}`, async () => {
        await pageManager.getInventoryPage().addProductToCart(productName);
        await pageManager.getInventoryPage().verifyCartBadgeCount(1);
        await pageManager.getInventoryPage().removeProductFromCart(productName);
        await pageManager.getInventoryPage().verifyCartBadgeIsHidden();
        await pageManager.getInventoryPage().openCart();
        await pageManager.getCartPage().verifyCartIsEmpty();
    });
});

// Test Case 5: Checkout Information (DDT)
checkoutData.forEach(({ productName, firstName, lastName, zipCode }) => {
    test(`Complete checkout information - ${firstName} ${lastName}`, async () => {
        await pageManager.getInventoryPage().addProductToCart(productName);
        await pageManager.getInventoryPage().openCart();
        await pageManager.getCartPage().verifyProductIsInCart(productName);
        await pageManager.getCartPage().clickCheckoutButton();
        await pageManager.getCheckoutPage().fillCheckoutInformation(firstName, lastName, zipCode);
        await pageManager.getCheckoutPage().verifyUserIsOnCheckoutOverviewPage();
    });
});
