import { expect, Page, } from "@playwright/test";
import { CommonPage } from "../common/commonPage";
import { CommonScenario } from "../common/commonScenario";


export class ProductsPage extends CommonPage {

  constructor(public page: Page, readonly scenario: CommonScenario) {
    super(page, scenario);
  }

  
  async Search_Product(searchQuery: string){
    await this.page.locator('input#search_product').fill(searchQuery);
    await this.page.locator('i.fa.fa-search').click({force:true});
  }

  async Search_And_Add_Products_To_Cart(searchQuery: string, productList: string[]){
    await this.Search_Product(searchQuery);
    for await(const product of productList){
      let productLoc=(name)=>`xpath=//div[contains(@class,'productinfo') and contains(.,'${product}')]//i[contains(@class,'fa-shopping-cart')]`
      await this.page.locator(productLoc(product)).click({force:true})
      await this.page.waitForTimeout(2000);
      await this.page.locator('button[data-dismiss="modal"]').click({force:true, timeout: 90000})
   }
}
}