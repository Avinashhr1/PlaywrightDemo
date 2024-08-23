import { test, expect } from '@playwright/test';

// const baseURL = 'https://www.homecentre.com/om/en';

// test('has title', async ({ page }) => {
//   await page.goto("/ae/en");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle("Shop Furniture & Decor | Home Centre Oman");
// });


// test('verify links in department pages',async({ page}) =>{
//   await page.goto('/eg/en');
//   const tempArray : any[] = [];
//    const categorylinksList = await page.locator('//a[contains(@href,"/c/")]');
//    const searchLinkList = await page.locator('//a[contains(@href,"/search/")]')
//   console.log('Link:',await categorylinksList.count());

//   for (let i = 0; i < await categorylinksList.count(); i++) {
//     const element = await categorylinksList.nth(i).getAttribute('href');
//     console.log('element:',element);
//     tempArray.push(element)
//     console.log('categoryLink:',categorylinksList.nth(i));
//     await categorylinksList.nth(i).click();
//     await page.goBack();
//   }
  
// })

test('Verify Links in department pagess',async({page})=>{
  
  await page.goto('/ae/en');

const tempArray: any[] = [];

// Locate all category links
  let categorylinksList = await page.locator('//a[contains(@href, "/c/") and not(contains(@href, "/c/giftcard"))]');
console.log('Total Links:', await categorylinksList.count());
for(let i = 0; i < await categorylinksList.count(); i++){
  const element = await categorylinksList.nth(i).getAttribute('href');
    console.log('Link element:', element);
}

// for (let i = 0; i < await categorylinksList.count(); i++) {
//     // Get the href attribute of the current link
//     const element = await categorylinksList.nth(i).getAttribute('href');
//     console.log('Link element:', element);
//     tempArray.push(element);

//     // Click on the nth link
//     // await categorylinksList.nth(i).click({ force: true });
//     const elementHandle = await categorylinksList.nth(i).elementHandle();
    
//     // Use evaluate to click on the element
//     await page.evaluate((el) => (el as HTMLElement).click(), elementHandle);

//     // Wait for the page to load and check if there are any products on the page
//     await page.waitForLoadState('domcontentloaded',{timeout:100000}); // Wait until the network is idle
//     const productsList = await page.locator('#sort-panel-count'); // Replace with the actual selector for the products

//     // await expect(productsList).toContainText('Products',{timeout:10000});

//     if(await productsList.isVisible()){
//       console.log('product Count:',await productsList.textContent())
//     }else{
//       console.log('product Count:',await productsList.textContent())
//     }
//     // if (await productsList.count() > 0) {
//     //     console.log(`Products found on page ${element}`);
//     // } else {
//     //     console.log(`No products found on page ${element}`);
//     // }

//     // Navigate back to the main page
//     await page.goBack();

//     // Re-locate the category links list since the page context has changed
//     // This is important to prevent Stale Element Exception
//     categorylinksList = await page.locator('//a[contains(@href, "/c/") and not(contains(@href, "/c/giftcard"))]');
//     console.log('Total Links:', await categorylinksList.count());

//   }

})



// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
