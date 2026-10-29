import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager';
import loginData from '../test-data/login-data.json';

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
});

// Test Case 1: Valid Login (DDT)
loginData.validUsers.forEach(({ username, password }) => {
    test(`Login with valid credentials - ${username}`, async () => {
        await pageManager.getLoginPage().login(username, password);
        await pageManager.getInventoryPage().verifyUserIsOnInventoryPage();
    });
});

// Test Case 2: Invalid Login (DDT)
loginData.invalidUsers.forEach(({ username, password, errorMessage }) => {
    test(`Login with invalid credentials - username: "${username}" password: "${password}"`, async () => {
        await pageManager.getLoginPage().login(username, password);
        await pageManager.getLoginPage().verifyErrorMessage(errorMessage);
    });
});
