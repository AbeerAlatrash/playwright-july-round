import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager';
import invalidLoginData from '../test-data/invalid-login.json';

invalidLoginData.forEach(({ username, password }) => {
    test(`Verify that the user cannot login with invalid credentials using ${username} & ${password}`, async ({ page }) => {
        const pageManager = new PageManager(page);
        await pageManager.getLoginPage().navigateToLoginPage();
        await pageManager.getLoginPage().login(username, password);
        await pageManager.getLoginPage().verifyInvalidCredentialsErrorMessage();
    });
});