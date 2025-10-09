import { expect } from '@playwright/test';
import {test} from '../fixture/test-fixture'
import {Bikepage} from '../pages/BikePage'



//used bikewala and drivex pages in fixture to create objects
test.describe.configure({ retries: 2,mode : 'serial' });
test('get lowest second hand bike price',async({bikewala,drivex,browserName})=>{
 test.skip(browserName!=='chromium',"skipping in webkit and firefox as it is taking more time to load the page")
    const bikewalaprice=await bikewala.getLowestPrice("Royal Enfield classic 350");
    const drivexprice=await drivex.getLowestPrice("Royal Enfield classic 350");
    console.log("bikewalaprice "+bikewalaprice);
    console.log("drivexprice "+drivexprice);
    

})

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Test has failed
    await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
  }
});