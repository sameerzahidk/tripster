import nodemailer from 'nodemailer';

export default async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: 'postmaster@sandbox788cf8f0c99a4276a6139b1a54cab2fe.mailgun.org',
        pass: 'Kuchnahi021!'
      }
    });

    let mailOptions = {
      from: 'info@tripser.com',
      to: req.body.to,
      subject: 'Booking Confirmation',
      text: 'your booking is confirmed!',
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    console.log(info);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
};
