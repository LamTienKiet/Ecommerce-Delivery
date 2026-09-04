const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lamtienkiet123@gmail.com',
      pass: 'wtpz cusy pmer ankk',
    },
  });

  try {
    console.log("Sending...");
    const info = await transporter.sendMail({
      from: '"Test" <lamtienkiet123@gmail.com>',
      to: 'lamtienkiet123@gmail.com', // send to self to test
      subject: 'Test Email',
      text: 'This is a test email.',
    });
    console.log("Success:", info.messageId);
  } catch (err) {
    console.error("Error:", err);
  }
}

testEmail();
