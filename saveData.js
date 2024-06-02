const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadImage(url, filepath) {
    console.log(`Downloading image from ${url} to ${filepath}`);
    const response = await axios({
        url,
        responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('finish', resolve)
            .on('error', reject);
    });
}

function saveData(id, data, images) {
    const dir = path.join(__dirname, 'data', id.toString());
    if (!fs.existsSync(dir)) {
        console.log(`Creating directory ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
    }

    console.log(`Saving data for ID ${id}`);
    fs.writeFileSync(path.join(dir, 'info.txt'), JSON.stringify(data, null, 2));

    images.forEach((image, index) => {
        const imagePath = path.join(dir, `image${index}.jpg`);
        downloadImage(image, imagePath);
    });
}

module.exports = saveData;
