const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer'); 
const { welcomeEmail, forgotPasswordEmail } = require('./templates'); 
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
  
  await consumer.subscribe({ topics: ['user-registered', 'forgot-password'], fromBeginning: true });

  console.log("=== Mail Service is listening for Registration & Forgot Password messages ===");

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        const { email, name } = data;
        
        console.log(`✨ Kafka Received [${topic}]: Preparing email for ${email}`);

        let mailOptions = {
          from: `"HireHeaven" <${process.env.EMAIL_USER}>`,
          to: email,
        };

        switch (topic) {
          case 'user-registered':
            mailOptions.subject = '✨ Welcome to HireHeaven!';
            mailOptions.html = welcomeEmail(name, data.role);
            break;
            
          case 'forgot-password':
            mailOptions.subject = '🔒 Reset Your HireHeaven Password';
            mailOptions.html = forgotPasswordEmail(name, data.resetLink);
            break;

          default:
            console.warn(`Received message from unknown topic: ${topic}`);
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent for ${topic} to ${email}. Response: ${info.response}`);

      } catch (error) {
        console.error(`Error in Mail Service (${topic}):`, error.message);
      }
    },
  });
};

run().catch(console.error);