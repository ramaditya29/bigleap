var nodemailer = require('nodemailer');



async function send(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'support@@bigleaptech.com',
          pass: 'bigleap@1'
        }
      });
      
      var mailOptions = {
        from: 'support@@bigleaptech.com',
        to: 'ramaditya29@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy! test'
      };
      
    var status = await transporter.sendMail(mailOptions)
    console.log(status);/*, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })*/
}

send()