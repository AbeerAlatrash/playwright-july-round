import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import loginData from '../test-data/login-data.json';


let loginPage: LoginPage;

test('User can login with valid credentials', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.validCase.username, loginData.validCase.password);
    await loginPage.verifyUserIsLoggedIn();
});

//DDT: the negative cases are read from the "negativeCases" array in login-data.json
loginData.negativeCases.forEach(({ title, username, password, errorType }) => {
    test(`An error is displayed when ${title}`, async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(username, password);
        await loginPage.verifyErrorByType(errorType);
    });
});
