const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'mail-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'mail-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-registered', fromBeginning: true });

  console.log("📨 Mail Service is listening for messages...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const userData = JSON.parse(message.value.toString());
      console.log(`✨ Kafka Received: Prepare email for ${userData.email}`);
      
      // LOGIC: In the next step, we add Nodemailer here
    },
  });
};

run().catch(console.error);