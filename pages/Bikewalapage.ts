import {BasePage} from './BasePage'
import {Page} from '@playwright/test'
import { Bikepage } from './BikePage';
import bikewaladata from '../data/bikewala.json';

export class Bikewalapage extends Bikepage{

readonly page :Page

constructor(page: Page){
    super(page)
    this.page=page

}
async selectCity(city:string){
     
  await this.page.locator(bikewaladata.citydropdown).getByText('Select a city').click();
  await this.page.locator(bikewaladata.citydropdown).getByText(bikewaladata.cityvalue).click();
  await this.page.locator(bikewaladata.searchCityBudget).click();
}
//used locator directly without wrapped in methods of basepage or bikepage 
async getLowestPrice(bike:string){
 let bikecheck:string;
 //created enum for bike names to select checkbox
enum checkboxvalues{ 
  classic = "classic",
  Hunter = "Hunter 350",
 }
 if(bike.toLowerCase().includes("hunter")){ 
    bikecheck=checkboxvalues.Hunter;
 }else if(bike.toLowerCase().includes("classic")){
    bikecheck=checkboxvalues.classic;
 }
  await this.page.goto(bikewaladata.url,{ waitUntil: 'domcontentloaded' });

  await this.selectCity("Bangalore");

  await this.page.locator(bikewaladata.royalEnfiled).first().click();
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForTimeout(2000);
  await this.page.getByRole('checkbox', { name: bikecheck }).check();
  await this.page.waitForSelector(bikewaladata.SortBy);
  await this.page.selectOption(bikewaladata.SortBy, '2');

  const page1Promise = this.page.waitForEvent('popup');
  await this.page.locator('h3').nth(0).click();
  await this.page.screenshot({ path: 'screenshot.png' });
  const page1 = await page1Promise;
  const price=await page1.locator('span').filter({ hasText: '₹' }).nth(0).textContent();
  await page1.close();

  console.log(price);  
  const bikewalaprice=price?.split("₹")[1].trim().replace(/,/g, '');
  return bikewalaprice;

}

}
