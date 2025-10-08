import {test as base,Page} from '@playwright/test'
import { Bikepage } from '../pages/BikePage'
import { Bikewalapage } from '../pages/Bikewalapage'
import { Drivexpage } from '../pages/Drivexpage'
import * as fs from 'fs';

type MyFixture={
   // page: Page,
    searchpage: Bikepage
    bikewala: Bikewalapage
    drivex: Drivexpage
    data: string
};

export const test= base.extend<MyFixture>({

searchpage: async({ page }, use) => {
    await use(new Bikepage(page));
},

bikewala: async({ page }, use) => {
    await use(new Bikewalapage(page));
},

drivex: async({ page }, use) => {
    await use(new Drivexpage(page));
},


data: async({ }, use) => {
    const rawData = fs.readFileSync('./data/locator.json', 'utf-8'); // returns string
    const data=JSON.parse(rawData) as string;
    await use(data);

},
})