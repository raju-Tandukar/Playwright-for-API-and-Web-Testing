import { LoginPage } from "../pageObjects/LoginPage"
import { Page, test as baseTest } from "@playwright/test";
import { CommonScenario } from "../common/commonScenario";
import { CommonPage } from "../common/commonPage";
import { HeaderMenuList } from "../pageObjects/HeaderMenuList";
import { ProductsPage } from "../pageObjects/ProductsPage";
import { CartPage } from "../pageObjects/CartPage";

// declaring the objects type for autocompletion 
interface PageObjects {
    loginPage: LoginPage;
    headerMenu: HeaderMenuList;
    commonScenarioPage: CommonScenario;
    commonPage: CommonPage,
    productsPage: ProductsPage,
    cartPage: CartPage,
}
// intializing all the page objects you have in your app
// and import them as fixture in spec file
const test = baseTest.extend<PageObjects>({
    commonScenarioPage: async ({ page }, use, testinfo) => {
        await use(new CommonScenario(page, testinfo));
    },
    loginPage: async ({ page, commonScenarioPage }, use) => {
        await use(new LoginPage(page, commonScenarioPage));
    },
    headerMenu: async ({ page, commonScenarioPage }, use) => {
        await use(new HeaderMenuList(page, commonScenarioPage));
    },
    productsPage: async ({ page, commonScenarioPage }, use) => {
        await use(new ProductsPage(page, commonScenarioPage));
    },
    cartPage: async ({ page, commonScenarioPage }, use) => {
        await use(new CartPage(page, commonScenarioPage));
    },
});

test.beforeEach(async ({ browser }) => {
   // console.log('beforeEach tests');
});

test.afterEach(async ({ }) => {
   // console.log('afterEach tests');
});

export default test;
export const expect = test.expect;