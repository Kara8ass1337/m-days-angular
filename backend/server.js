const appRoot = require('app-root-path');
const getRandomImage = require('./getRandomFile');
const mail = require('./mail');
const express = require('express');
const app = express();

const port = 8000;

app.use(express.static(`${appRoot}/build`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static(`${appRoot}/public`)); todo: разобраться откуда и как тянуть статику

app.get('/bg', async (req, res) => {
    const randomImage = await getRandomImage(`${appRoot}/build/img_bg`);

    res.send(randomImage);
});

app.post('/mail', async (req, res) => {
    //mail(req);

    //console.log(req.body);
});

app.listen(port, () => {
    console.log(`We are live on ${port}`);
});