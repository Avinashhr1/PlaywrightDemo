// import { test, expect, chromium } from '@playwright/test';

// test('click 10 links in parallel', async () => {
//     // Initialize the browser
//     const browser = await chromium.launch();

//     // Create a new page and fetch links
//     const page = await browser.newPage();
//     await page.goto('/in/en');
//     const linksLocator = page.locator('//a[contains(@href, "/c/") and not(contains(@href, "/c/giftcard"))]');
//     const linksCount = await linksLocator.count();
//     console.log(linksCount);

//     // Fetch all links
//     const links: string[] = [];
//     for (let i = 0; i < linksCount; i++) {
//         const href = await linksLocator.nth(i).getAttribute('href');
//         if (href) {
//             links.push(href);
//         }
//     }

//     // Limit to 10 links or whatever number you need
//     const linksToClick = links.slice(0, linksCount/4);

//     // Create contexts and pages
//     const contexts = await Promise.all(linksToClick.map(async (link) => {
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         return { context, page, link };
//     }));

//     // Click links in parallel
//     await Promise.all(contexts.map(async ({ page, link }) => {
//         await page.goto(link);
//         // Perform actions after clicking, if needed
//         console.log(`Clicked on: ${link}`);
//         console.log('For this Catogory: ',await page.locator('//p[contains(.,"products available")]').textContent(),' Available');
//         await page.close();
//     }));

//     // Close the browser
//     await browser.close();
// });

import { test, expect, chromium } from '@playwright/test';

test('click 100 links divided into 10 parts', async () => {
    // Initialize the browser
    const browser = await chromium.launch();

    // Create a page and fetch all links
    const page = await browser.newPage();
    await page.goto('/in/en');
    
    // Locator to get all relevant links
    const linksLocator = page.locator('//a[contains(@href, "/c/")]');
    const linksCount = await linksLocator.count();
    console.log('Number of Links: ',linksCount)

    // Fetch all links
    const allLinks: string[] = [];
    for (let i = 0; i < linksCount; i++) {
        const href = await linksLocator.nth(i).getAttribute('href');
        if (href) {
            allLinks.push(href);
        }
    }

    // Define the number of parts
    const numberOfParts = 10;
    const linksPerPart = Math.ceil(allLinks.length / numberOfParts);

    // Function to process a batch of links
    const processLinksBatch = async (linksBatch: string[]) => {
        const contexts = await Promise.all(linksBatch.map(async (link: string) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            return { context, page, link };
        }));

        // Click links in parallel
        await Promise.all(contexts.map(async ({ page, link }) => {
            try {
                await page.goto(link);
                if(await page.url().includes(link)){
                    console.log(`Clicked on: ${link}`);
                    console.log(`For this Catogory:${link}`,await page.locator('//p[contains(.,"products available")]').textContent({timeout:80000}),' Available');
                }else{
                    console.log('Navigated to someother page');
                }
                // Perform additional actions if needed
                
            } catch (error) {
                console.error(`Failed to click on: ${link}`, error);
            } finally {
                await page.close();
            }
        }));

        // Clean up contexts
        await Promise.all(contexts.map(({ context }) => context.close()));
    };

    // Process each part
    for (let i = 0; i < numberOfParts; i++) {
        const start = i * linksPerPart;
        const end = Math.min(start + linksPerPart, allLinks.length);
        const linksBatch = allLinks.slice(start, end);

        console.log(`Processing batch ${i + 1}/${numberOfParts} with ${linksBatch.length} links.`);
        await processLinksBatch(linksBatch);
    }

    // Close the browser
    await browser.close();
});
