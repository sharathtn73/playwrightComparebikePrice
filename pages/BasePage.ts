import {Page} from '@playwright/test'

export class BasePage{
readonly page:Page;

constructor(page: Page)
{   
    this.page=page;
}

 async clickonElement(selector:string, i?:number|null)
{   console.log("Clicking on "+selector);
    await this.page.locator(selector).nth(i||0).click();
}

async navigateTo(url:string){
 console.log("Loding URL "+url);
 await this.page.goto(url,{ waitUntil: 'domcontentloaded' });

}

async fillwithDelay(selector:string, text:string,delay?:number)
{    console.log("entering text"+text);
     this.page.locator(selector);   
    await this.page.keyboard.type(text ,{delay:delay||50});
}

async fill(selector:string, text:string)
{    console.log("entering text"+text);
     this.page.locator(selector);   
    await this.page.keyboard.type(text);
}
async GetbyText(text:string)
{    console.log("getByext"+text);
    await this.page.getByText(text).click();
}
}   