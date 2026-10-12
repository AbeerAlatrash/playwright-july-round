import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager';

let pageManager: PageManager;

test.beforeAll(async ({ }) => {
    console.log('Starting the test suite');
});

test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
    await pageManager.getLoginPage().login('admin', 'admin');
});

test('Verify that the home page is accessible after login', async ({ page }) => {
    await pageManager.getHomePage().verifyUserIsOnHomePage();
});


test('Verify that the user can logout from the home page', async ({ page }) => {
    await pageManager.getHomePage().clickLogoutButton();
    await pageManager.getLoginPage().verifyUserIsOnLoginPage();
});

test.afterEach(async ({ page }) => {
    console.log('Test completed');
});

test.afterAll(async ({ }) => {
    console.log('All tests completed');
});