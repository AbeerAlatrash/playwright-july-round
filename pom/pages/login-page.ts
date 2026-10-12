import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {

    //Locators 
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly rememberMeCheckbox: Locator;
    private readonly usernameEmptyErrorLocator: Locator;
    private readonly passwordEmptyErrorLocator: Locator;
    private readonly errorMessageLocator: Locator;

    //Variables 
    private readonly loginEndpoint = "/index.html";
    private readonly usernameEmptyErrorMessage = "Username is required.";
    private readonly passwordEmptyErrorMessage = "Password is required.";
    private readonly errorMessage = "Invalid credentials. Use admin/admin";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'user' });
        this.passwordInput = page.getByRole('textbox', { name: 'password' });
        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
        this.usernameEmptyErrorLocator = page.locator('#usernameError');
        this.passwordEmptyErrorLocator = page.locator('#passwordError');
        this.errorMessageLocator = page.locator('#loginError');
    }

    //Actions
    async navigateToLoginPage() {
        await this.page.goto("/index.html"); //baseURL/index.html
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.check();
        await this.loginButton.click();
    }

    //Assertions
    async verifyUserIsLoggedIn() {
        await expect(this.page).toHaveURL(/.*main.html/); //REGEX to check if the URL contains 'main.html'
    }
    async verifyUsernameEmptyError() {
        await expect(this.usernameEmptyErrorLocator).toHaveText(this.usernameEmptyErrorMessage);
    }

    async verifyPasswordEmptyError() {
        await expect(this.passwordEmptyErrorLocator).toHaveText(this.passwordEmptyErrorMessage);
    }

    async verifyInvalidCredentialsErrorMessage() {
        await expect(this.errorMessageLocator).toHaveText(this.errorMessage);
    }

    async verifyUserIsOnLoginPage() {
        await expect(this.loginButton).toBeVisible();
    }
}