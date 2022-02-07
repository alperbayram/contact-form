const nodemailer = require('nodemailer');

exports.getContact = (req, res) => {
  res.status(200).render('/');
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
      <li>First Name: ${req.body.firstname}</li>
      <li>Last Name: ${req.body.lastname}</li>
      <li>Email: ${req.body.emailaddress}</li>
      <li>Country: ${req.body.country}</li>
      <li>Adress: ${req.body.streetaddress}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true, // true for 465, false for other ports
      auth: {
        user: `${process.env.REACT_APP_EMAIL}`, // generated ethereal user
        pass: `${process.env.REACT_APP_EMAIL_PASS}`, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${req.body.firstname} 👻${process.env.REACT_APP_EMAIL}`, // sender address
      to: `${process.env.REACT_APP_EMAIL}`, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    //console.log(outputMessage);
    res.status(200).redirect('/');
  } catch (error) {
    console.log(error);
    res.status(200).redirect('/');
  }
};
