const nodemailer = require('nodemailer');

/**
 *
 * @param text {string}
 * @param attachments[] {string}
 */
module.exports = function({text, attachments} = {}) {
    const transporter = nodemailer.createTransport({
        host: 'cpanel6.d.fozzy.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'm-days@m-days.ru',
            pass: '******'
        }
    });

    const mailOptions = {
        from: '"m-days" <no-reply@m-days.ru>', // sender address
        to: 'shilov-1@yandex.ru', // list of receivers
        subject: 'Photos', // Subject line
        text,
        attachments
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log('Message sent: %s', info);
    });
};
