import { test } from '@playwright/test';
import { PageManager } from '../pages/page-manager.ts';
import homeData from '../test-data/home-data.ts';
import loginData from '../test-data/login-data.json';
import { CsvReader } from '../utils/csvReader.ts';

let pageManager: PageManager;

test.beforeAll(async ({ }) => {
    console.log('Starting the test suite');
});

test.beforeEach(async ({ page }) => {
    //1. preparing test data and navigating to the home page
    const csv = new CsvReader();
    await csv.loadFile('../test-data/login-data.csv');
    pageManager = new PageManager(page);
    await pageManager.getLoginPage().navigateToLoginPage();
    //  await pageManager.getLoginPage().login(loginData.validCase.username, loginData.validCase.password);
    await pageManager.getLoginPage().login(csv.getDataByRowAndColumn(0, 'username')!, csv.getDataByRowAndColumn(0, 'password')!);
    //  await pageManager.getLoginPage().login(homeData.loginData.username, homeData.loginData.password);
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