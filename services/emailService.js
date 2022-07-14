const nodemailer = require("nodemailer");

function sendMail({ from, to, subject, text, html }) {

    let transporter=nodemailer.createTransport({
            host:process.env.HOST,
            port:process.env.PORT,
            secure:false,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
    })


    let info=await transporter.sendMail({
        from:from,
        to:to,
        subject:subject,
        text:text,
        html:html
    })
}

module.exports = sendMail;
