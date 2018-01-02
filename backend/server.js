const appRoot = require('app-root-path');
const getRandomImage = require('./getRandomFile');
const express = require('express');
const app = express();

const port = 8000;

app.use(express.static(`${appRoot}/build`));
//app.use(express.static(`${appRoot}/public`));

app.get('/bg', async (req, res) => {
    const randomImage = await getRandomImage(`${appRoot}/build/img_bg`);

    res.send(randomImage);
});

app.listen(port, () => {
    console.log(`We are live on ${port}`);
});