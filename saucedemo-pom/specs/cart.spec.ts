import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager';
import loginData from '../test-data/login-data.json';

test('Add a product to the cart', async ({ page }) => {
    const pageManager = new PageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
    await pageManager.getLoginPage().login(loginData.validCase.username, loginData.validCase.password);
    await pageManager.getInventoryPage().verifyUserIsOnInventoryPage();
    await pageManager.getInventoryPage().addProductToCart('Sauce Labs Backpack');
    await pageManager.getInventoryPage().verifyCartBadgeCount(1);
});
