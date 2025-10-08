import { expect } from '@playwright/test';
import {test} from '../fixture/test-fixture'
import {Bikepage} from '../pages/BikePage'



//used bikewala and drivex pages in fixture to create objects
test.only('get lowest second hand bike price',async({bikewala,drivex})=>{

    const bikewalaprice=await bikewala.getLowestPrice("Royal Enfield classic 350");
    const drivexprice=await drivex.getLowestPrice("Royal Enfield classic 350");
    console.log("bikewalaprice "+bikewalaprice);
    console.log("drivexprice "+drivexprice);
    

})