import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';


let loginPage: LoginPage;

test('User can login with valid credentials', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('admin', 'admin');
    await loginPage.verifyUserIsLoggedIn();
});

test('An error is displayed when username is empty', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('', 'admin');
    await loginPage.verifyUsernameEmptyError();
});

test('An error is displayed when password is empty', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('admin', '');
    await loginPage.verifyPasswordEmptyError();
});

test('An error is displayed when invalid credentials are provided', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login('admin', 'wrongpassword');
    await loginPage.verifyInvalidCredentialsErrorMessage();
});