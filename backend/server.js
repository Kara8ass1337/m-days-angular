const appRoot = require('app-root-path');
const getRandomImage = require('./getRandomFile');
const mail = require('./mail');
const express = require('express');
const app = express();
const port = 8000;
const rateLimit = require('express-request-limit');
const rateLimitOpts = {
    timeout: 1000 * 5,
    exactPath: true,
    cleanUpInterval: 0,
    errStatusCode: 429,
    errMessage: 'Too many requests made to this route'
};

app.use(express.static(`${appRoot}/build`)); //корень веба
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/bg', /*rateLimit(rateLimitOpts),*/ async (req, res) => {
    const randomImage = await getRandomImage(`${appRoot}/public/img_bg`);

    res.send(randomImage);
});

/*app.post('/mail', async (req, res) => {
    if (req.body.text) {
        res.status(200).send('ok');

        mail({
            body: req.body,
            headers: req.headers
        });
    } else {
        res.status(400).send('Bad request');
    }

});*/

app.listen(port, () => {
    console.log(`We are live on ${port}`);
});