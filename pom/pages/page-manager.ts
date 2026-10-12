import { type Page } from '@playwright/test';
//import
import { LoginPage } from './login-page';
import { HomePage } from './home-page';

export class PageManager {
    //objects
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    //  private readonly productsPage: ProductsPage;


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        //     this.productsPage = new ProductsPage(page);
    }


    //getter methods
    getLoginPage() {
        return this.loginPage;
    }
    getHomePage() {
        return this.homePage;
    }
    // getProductsPage() {
    //     return this.productsPage;
    // }
}
