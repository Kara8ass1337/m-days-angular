const appRoot = require('app-root-path');
const readDir = require('./readDir');
const express = require('express');
const app = express();

const port = 8000;

app.use(express.static(`${appRoot}/build`));
app.use(express.static(`${appRoot}/public`));

app.get('/bg', (req, res) => {
    readDir(`${appRoot}/build/img_bg`).then((files) => {
        res.send(files);
    }).catch((err) => {
        throw err;
    })
});

app.listen(port, () => {
    console.log(`We are live on ${port}`);
});