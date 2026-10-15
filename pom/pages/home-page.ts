import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    //Locators
    private readonly welcomeMessageLocator: Locator;
    private readonly logoutButtonLocator: Locator;

    //Variables
    private readonly homePageEndpoint = "/Pages/main.html";
    private readonly welcomeMessage = "Practice Modules";
    private readonly page: Page;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.welcomeMessageLocator = page.getByRole('heading', { level: 1 });
        this.logoutButtonLocator = page.getByRole('button', { name: 'Logout' });
    }

    //Actions
    async navigateToHomePage() {
        await this.page.goto(this.homePageEndpoint); //baseURL/Pages/main.html
    }
    async clickLogoutButton() {
        await this.logoutButtonLocator.click();
    }

    //Assertions
    async verifyUserIsOnHomePage() {
        await expect(this.welcomeMessageLocator).toHaveText(this.welcomeMessage);
    }

}