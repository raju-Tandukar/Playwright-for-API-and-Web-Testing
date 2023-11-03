import AxeBuilder from "@axe-core/playwright";
import test, { expect } from "../fixtures/baseTest"
import testData from '../test_data/userInfo.json'
import invalidTestData from '../test_data/invalidUserInfo.json'
import productData from '../test_data/addProductToCart.json'

test.beforeAll(async ({ request }) =>{
  console.log("Delete User " + testData.name + " if already exist.");
  let response = await request.get('https://automationexercise.com/api/getUserDetailByEmail?email=' + testData.email)
  let respBody = JSON.parse(await response.text())
  if(respBody.responseCode==200){
      response = await request.delete('/' + 'api/deleteAccount', {
          form: {
              email: testData.email,
              password: testData.password
          }
      });
      respBody = JSON.parse(await response.text())
      console.log('Verify response code is 200')
      expect((respBody.responseCode).toString()).toEqual('200')
      console.log('Verify User exists! message');
      expect((respBody.message)).toContain('Account deleted!')
  }
});

test.describe('UI test scenarios for automation exercise web application', () => {
  
  test("UI Test1 - Register user", async ({ page, loginPage, headerMenu }, testinfo) => {
    console.log("test start")
    await headerMenu.openSite()
    await headerMenu.gotoSignUp_Login_Page()
    await loginPage.registerUser(testData.name, testData.email, testData.title, testData.password, testData.days, testData.months, testData.years, testData.firstname, testData. lastname, testData.company, testData.address1, testData.address2, testData.country, testData.state, testData.city, testData.zipcode, testData.mobile_number)
    console.log("test ends")
  });

  test("UI Test2 - Login user", async ({ page, loginPage, headerMenu }, testinfo) => {
    console.log("test start")
    await headerMenu.openSite()
    await headerMenu.gotoSignUp_Login_Page()
    await loginPage.Login(invalidTestData.invalidEmail, invalidTestData.invalidPassword)
    await loginPage.Verify_User_Is_LoggedIn(false);
    await loginPage.Login(testData.email, testData.password)
    await loginPage.Verify_User_Is_LoggedIn(true);
    console.log("test ends")
  });

  test("UI Test3 - Add to Cart (Data-Driven Tests from External file)", async ({ page, loginPage, headerMenu, productsPage, cartPage }, testinfo) => {
    console.log("test start")
    await headerMenu.openSite()
    await headerMenu.gotoSignUp_Login_Page()
    await loginPage.Login(testData.email, testData.password)
    await headerMenu.gotoSignUp_Product_Page();
    await productsPage.Search_And_Add_Products_To_Cart(productData.searchString, productData.productList)
    await headerMenu.gotoCart_Page()
    await cartPage.Verify_Added_Products_Name_Contains(productData.searchString)
    await cartPage.Verify_Added_Products_Name_Should_Not_Contains(productData.invalidColor)
    console.log("test ends")
  });

});
