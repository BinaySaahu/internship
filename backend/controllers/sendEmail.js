const mailer = require("../mailer/mailer");

const sendEmail = async(req,res)=>{
    var mail = {
        to: "21052245@kiit.ac.in",
        subject: "Data of Selected rows",
        html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Email Verification</title>
        </head>
        <body>
            <div>${JSON.stringify(req.body)}</div>
        </body>
        </html>`,
      };
      await mailer.sendMail(mail).then((rslt)=>{
        res.status(200).json({message:"Mail sent"});
      });

}

exports.sendEmail = sendEmail;