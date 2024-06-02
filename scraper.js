const puppeteer = require('puppeteer');

async function scrapePage(url, startPage, endPage) {
    const browser = await puppeteer.launch({ headless: false }); // Open browser with UI for easier debugging
    const page = await browser.newPage();

    for (let i = startPage; i <= endPage; i++) {
        const currentPageUrl = `${url}&page=${i}`;
        await page.goto(currentPageUrl, { waitUntil: 'networkidle2' });
        console.log(`Successfully visited: ${currentPageUrl}`);
    }

    await browser.close();
}

module.exports = scrapePage;


/*const puppeteer = require('puppeteer');

async function scrapePage(url, startPage, endPage) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let scrapedData = [];

    for (let i = startPage; i <= endPage; i++) {
        await page.goto(`${url}&page=${i}`, { waitUntil: 'networkidle2' });

        const data = await page.evaluate(() => {
            let items = [];
            document.querySelectorAll('.statement-card').forEach(item => {
                items.push({
                    id: item.getAttribute('data-id'),
                    title: item.querySelector('.statement-card__title').innerText,
                    price: item.querySelector('.statement-card__price').innerText,
                    // Add other fields as needed
                });
            });
            return items;
        });

        scrapedData = scrapedData.concat(data);
    }

    await browser.close();
    console.log('Scraped Data:', scrapedData); // Debugging
    return scrapedData;
}

module.exports = scrapePage;*/
