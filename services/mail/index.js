const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer'); 
const { welcomeEmail } = require('./templates');
require('dotenv').config();


const kafka = new Kafka({
  clientId: 'mail-service',
  brokers: ['localhost:9092']
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000, 
  greetingTimeout: 10000,
  socketTimeout: 10000
});



const consumer = kafka.consumer({ groupId: 'mail-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-registered', fromBeginning: true });

  console.log("===Mail Service is listening for messages===");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const userData = JSON.parse(message.value.toString());
        const { email, name, role } = userData;
        
        console.log(`Kafka Received: Preparing email for ${email}`);

        const mailOptions = {
          from: `"HireHeaven" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: '✨ Welcome to HireHeaven!',
          html: welcomeEmail(name, role) 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(` Welcome email sent to ${email}. Response: ${info.response}`);

      } catch (error) {
        console.error(` Error in Mail Service:`, error.message);
      }
    },
  });
};

run().catch(console.error);