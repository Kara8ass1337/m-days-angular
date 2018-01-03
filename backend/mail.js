const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'cpanel6.d.fozzy.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'm-days@m-days.ru',
        pass: '******'
    }
});

// setup email data with unicode symbols
const mailOptions = {
    from: '"m-days" <no-reply@m-days.ru>', // sender address
    to: 'shilov-1@yandex.ru', // list of receivers
    subject: 'Test Photos', // Subject line
    text: 'Hello world!', // plain text body
    html: '<b>Hello world!</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }

    console.log('Message sent: %s', info);
});