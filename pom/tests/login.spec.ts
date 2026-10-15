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

test('An error is displayed when username is empty', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.emptyUsernameCase.username, loginData.emptyUsernameCase.password);
    await loginPage.verifyUsernameEmptyError();
});

test('An error is displayed when password is empty', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.emptyPasswordCase.username, loginData.emptyPasswordCase.password);
    await loginPage.verifyPasswordEmptyError();
});

test('An error is displayed when invalid credentials are provided', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.invalidPasswordCase.username, loginData.invalidPasswordCase.password);
    await loginPage.verifyInvalidCredentialsErrorMessage();
});