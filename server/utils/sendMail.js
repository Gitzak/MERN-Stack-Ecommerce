const nodemailer = require("nodemailer"); 
const config = require('./../config/keys');

const SendMailToUSer = () => {

    const transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
          user: config.mail.user,
          pass: config.mail.pass
        },
    });
    
    
    const mailOptions = {
        from: config.mail.user,
        to: "malloukab77@gmail.com",
        subject: "Your Account Information",
        html: `
        <html>
          <body>
            <p>Hello,</p>
            <p>Your email: jhuhhui</p>
            <p>Your hashed password: jhvhvhj</p>
            <p>Thank you.</p>
            <a href="http://localhost:6500/userLogin" id="myProfile"> Go to my  Profile</a>
          </body>
        </html>
      `,
    };
    
    
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          res.status(500).send("Internal Server Error");
        } else {
          console.log("Email sent successfully:", info.response);
          res.status(200).send("Email sent successfully");
        }
      });
    
}


