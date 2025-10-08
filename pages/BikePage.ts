import {BasePage} from './BasePage'
import {Page} from '@playwright/test'

export class Bikepage extends BasePage{

readonly searchBar:any;

constructor(page: Page){
    super(page)
    this.searchBar=page.locator("input[placeholder*='Search your bike here']");

}

async EnterBikeToSearch(selector: string,text:string){
   await this.fillwithDelay(selector,text,200)
}

async clickOnsearch(selector:string,i?:number|null){

    await this.clickonElement(selector,i)
}

}