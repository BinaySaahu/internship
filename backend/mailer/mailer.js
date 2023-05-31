const mailer = require("nodemailer");

async function sendmail({
    name = "Binay",
    to,
    subject = "",
    html = "",
  }) {
    try {
      var transport = mailer.createTransport({
        service: "gmail",
        auth: {
          user: "binaysahu364@gmail.com",
          pass: "xdubcqjbahmnqjrh",
        },
      });
      const mailoption = {
        from: `${name}<binaysahu364@gmail.com>`,
        to: to,
        subject: subject,
        html: html,
      };
      var result = await transport.sendMail(mailoption);
      return result;
    } catch (error) {
      return error;
    }
  }
  
  exports.sendMail = sendmail;
  