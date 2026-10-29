import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {

    //Locators
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessageLocator: Locator;

    //Variables
    private readonly loginEndpoint = "/";
    private readonly invalidCredentialsErrorMessage = "Epic sadface: Username and password do not match any user in this service";
    private readonly usernameRequiredErrorMessage = "Epic sadface: Username is required";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessageLocator = page.locator('[data-test="error"]');
    }

    //Actions
    async navigateToLoginPage() {
        await this.page.goto(this.loginEndpoint); //baseURL/
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.clickLoginButton();
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

    //Assertions
    async verifyInvalidCredentialsErrorMessage() {
        await expect(this.errorMessageLocator).toHaveText(this.invalidCredentialsErrorMessage);
    }
    async verifyUsernameRequiredErrorMessage() {
        await expect(this.errorMessageLocator).toHaveText(this.usernameRequiredErrorMessage);
    }
}
