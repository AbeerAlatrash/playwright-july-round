import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager';
import loginData from '../test-data/login-data.json';

let pageManager: PageManager;

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
});

test('Login with valid credentials', async () => {
    await pageManager.getLoginPage().login(loginData.validCase.username, loginData.validCase.password);
    await pageManager.getInventoryPage().verifyUserIsOnInventoryPage();
});

test('Login with invalid credentials', async () => {
    await pageManager.getLoginPage().login(loginData.invalidCase.username, loginData.invalidCase.password);
    await pageManager.getLoginPage().verifyInvalidCredentialsErrorMessage();
});

test('Login with empty credentials shows username required error', async () => {
    await pageManager.getLoginPage().clickLoginButton();
    await pageManager.getLoginPage().verifyUsernameRequiredErrorMessage();
});
