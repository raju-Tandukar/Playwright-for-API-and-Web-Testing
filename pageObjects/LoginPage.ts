import { expect, Page, } from "@playwright/test";
import { CommonPage } from "../common/commonPage";
import { CommonScenario } from "../common/commonScenario";


export class LoginPage extends CommonPage {

  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async registerUser(name: string, email: string, title: string, password: string, day: string, month: string, year: string, first_name: string, last_name: string, company: string, address: string, address2: string, country: string, state: string, city: string, zipcode: string, mobile_number: string){
    await this.page.locator('input[data-qa="signup-name"]').fill(name);
    await this.page.locator('input[data-qa="signup-email"]').fill(email);
    await this.page.locator('button[data-qa="signup-button"]').click();
    if(title=='Mr')
        await this.page.locator('div#uniform-id_gender1').click();
    else
        await this.page.locator('div#uniform-id_gender2').click();
    await this.page.locator('input[data-qa="password"]').fill(password);
    await this.page.locator('select[data-qa="days"]').selectOption(day);
    await this.page.locator('select[data-qa="months"]').selectOption(month);
    await this.page.locator('select[data-qa="years"]').selectOption(year);
    await this.page.locator('input[data-qa="first_name"]').fill(first_name);
    await this.page.locator('input[data-qa="last_name"]').fill(last_name);
    await this.page.locator('input[data-qa="company"]').fill(company);
    await this.page.locator('input[data-qa="address"]').fill(address);
    await this.page.locator('input[data-qa="address2"]').fill(address2);
    await this.page.locator('select[data-qa="country"]').selectOption(country);
    await this.page.locator('input[data-qa="state"]').fill(state, {force:true});
    await this.page.locator('input#city').fill(city, {force:true});
    await this.page.locator('input[data-qa="zipcode"]').fill(zipcode, {force:true});
    await this.page.locator('input[data-qa="mobile_number"]').fill(mobile_number, {force:true});
    await this.page.locator('button[data-qa="create-account"]').click({force:true});
    
    console.log('Verify User is Created sucesscully.');
    await expect(this.page.locator('h2[data-qa="account-created"] b')).toHaveText('Account Created!');
  }

  async Login(userName: string, password: string){
    await this.page.locator('input[data-qa="login-email"]').fill(userName);
    await this.page.locator('input[data-qa="login-password"]').fill(password);
    await this.page.locator('button[data-qa="login-button"]').click();
  }

  async Verify_User_Is_LoggedIn(isloggedIn: boolean){
    if(isloggedIn){
        console.log("Verify user is able to login with valid credential and can see Menu and title.")
        await expect(this.page.locator("div[class^='shop-menu']")).toHaveCount(1)
        await expect(this.page).toHaveTitle('Automation Exercise');
    }
    else {
        console.log("Verify user is not able to login with invalid credential and still in login page with error")
        await expect(this.page).toHaveURL('/'+ 'login');
        await expect(this.page.locator("div.login-form p")).toHaveText('Your email or password is incorrect!')
    }
  }
}