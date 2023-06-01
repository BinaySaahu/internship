const mailer = require("../mailer/mailer");

const sendEmail = async(req,res)=>{
    let array = req.body;
    var mail = {
        to: "info@redpositive.in",
        subject: "Data of Selected rows",
        html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Email Verification</title>
            <style>
            table {
                border-collapse: collapse;
                width: 99%;
                color: #333;
                font-family: Arial, sans-serif;
                font-size: 14px;
                text-align: left;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                margin: auto;
                margin-top: 50px;
                margin-bottom: 50px;
              }
              table th {
                background-color: #4CAF50;
                color: #fff;
                font-weight: bold;
                padding: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-top: 1px solid #4CAF50;
                border-bottom: 1px solid #4CAF50;
                height: 20px;
              }
              
              table td {
              
                padding: 10px;
                border-bottom: 1px solid rgb(49 55 71);
                font-weight: bold;
              }
              

            </style>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                <tr><TD>${array.map(e=>Object.values(e)

                    .join('<TD>')).join('<tr><TD>')}
                </tbody>
            </table>
        </body>
        </html>`,
      };
      await mailer.sendMail(mail).then((rslt)=>{
        res.status(200).json({message:"Mail sent"});
      });

}

exports.sendEmail = sendEmail;