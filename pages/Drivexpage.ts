import {BasePage} from './BasePage'
import {Page} from '@playwright/test'
import { Bikepage } from './BikePage';
import drivexdata from '../data/drivex.json';

export class Drivexpage extends Bikepage{


readonly page :Page
 bikepage:Bikepage
constructor(page: Page){
    super(page)
    this.page=page

}

async getLowestPrice(bike:string){
    this.bikepage=new Bikepage(this.page);
    const bikePrefix = bike.substring(0, 5).toLowerCase();
    await this.bikepage.navigateTo(drivexdata.url);
    await this.bikepage.clickonElement(drivexdata.BangloreCity);
    await this.bikepage.navigateTo(drivexdata.url);
   // await page.waitForSelector("(//label[@for='inputField'])[4]");
    await this.bikepage.EnterBikeToSearch(drivexdata.searchbox,bike)
    await this.page.locator("div[data-test-id='search-test-results']:nth-of-type(1)").hover();
    await this.bikepage.clickonElement("div[data-test-id='search-test-results']:nth-of-type(1)");
    
   // await this.page.waitForSelector(`a[href*="${bikePrefix}"]`);
    await this.bikepage.clickonElement("button[role='combobox']");
    await this.bikepage.GetbyText('Price - Low to High');
    //await this.page.pause();
    await this.bikepage.clickonElement("div[data-test-id=plp-product-card-0]");
    const price2=await this.page.locator("p[class*='flex items-center']").nth(0).textContent();
    let drivexprice:any=0;
    console.log(price2);
    if(price2.includes("lakhs")){   
     drivexprice=price2?.split("₹")[1].trim().replace(/,/g, '').split(" ")[0];
    }else{
     drivexprice=price2?.split("₹")[1].trim().replace(/,/g, '');
    }
    return drivexprice;
}
}