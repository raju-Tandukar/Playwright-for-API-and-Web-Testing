import { expect, Page, } from "@playwright/test";
import { CommonPage } from "../common/commonPage";
import { CommonScenario } from "../common/commonScenario";

export class CartPage extends CommonPage {

  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  async Verify_Added_Products_Name_Contains(nameContains: string){
    console.log("Assert whether each added product in the Cart contains the text: " + nameContains);
    this.Verify_Name_Contains(nameContains, true)
  }

  async Verify_Added_Products_Name_Should_Not_Contains(nameContains: string){
    console.log("Assert whether no added product in the Cart contains the text: " + nameContains);
    this.Verify_Name_Contains(nameContains, false)
  }

  async Verify_Name_Contains(nameContains: string, shouldContain: boolean){
    const productList = await this.page.locator('a[href^="/product_details"]').all();
    for await(const product of productList){
      let text = await product.textContent()
      if (text !== null) {
        if(shouldContain)
          expect(text.toLowerCase()).toContain(nameContains.toLowerCase())
        else
          expect(text.toLowerCase()).not.toContain(nameContains.toLowerCase())
      } else {
        console.warn('Element text is null.');
      }
    }
  }
}