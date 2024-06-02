const express = require('express');
const bodyParser = require('body-parser');
const scrapePage = require('./scraper');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Web Scraper is Running');
});

app.post('/scrape', async (req, res) => {
    const { url, startPage, endPage } = req.body;
    await scrapePage(url, startPage, endPage);
    res.send('Scraping Completed');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


/*const express = require('express');
const bodyParser = require('body-parser');
const scrapePage = require('./scraper');
const saveData = require('./saveData');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Web Scraper is Running');
});

app.post('/scrape', async (req, res) => {
    const { url, startPage, endPage } = req.body;
    const data = await scrapePage(url, startPage, endPage);

    // Ensure data structure for saveData
    data.forEach(item => {
        const itemData = {
            id: item.id,
            data: {
                title: item.title,
                price: item.price,
                // Add other fields here
            },
            images: [] // Add logic to extract image URLs if needed
        };
        saveData(item.id, itemData.data, itemData.images);
    });

    res.send('Scraping Completed');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});*/
