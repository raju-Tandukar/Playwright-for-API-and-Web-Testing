import { expect, Page, } from "@playwright/test";
import { CommonPage } from "../common/commonPage";
import { CommonScenario } from "../common/commonScenario";


export class HeaderMenuList extends CommonPage {

  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async openSite(){
    await this.page.goto('/',{timeout:92000,waitUntil:'domcontentloaded'});
    await expect(this.page).toHaveTitle('Automation Exercise');
}

  async gotoSignUp_Login_Page() {
    await this.page.locator('a[href="/login"]').click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveTitle('Automation Exercise - Signup / Login');
  }

  async gotoSignUp_Product_Page() {
    await this.page.locator('a[href="/products"]').click();
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveTitle('Automation Exercise - All Products');
  }

  async gotoCart_Page() {
    await this.page.locator('li a[href="/view_cart"]').click({force:true, timeout: 50000});
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.page).toHaveTitle('Automation Exercise - Checkout');
  }

}