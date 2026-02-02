const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['localhost:9092'], 
});

const producer = kafka.producer();

const emitUserSignedUp = async (userData) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'user-registered',
      messages: [
        { 
          value: JSON.stringify({
            email: userData.email,
            name: userData.name,
            role: userData.role
          }) 
        },
      ],
    });
    console.log("Kafka: Message sent to 'user-registered' topic");
  } catch (error) {
    console.error("Kafka Producer Error:", error);
  } finally {
    await producer.disconnect();
  }
};

const emitForgotPasswordMail = async (userData) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'forgot-password',
      messages: [
        { 
          value: JSON.stringify({
            email: userData.email,
            name: userData.name,
            resetLink: userData.resetLink
          }) 
        },
      ],
    });
    console.log("Kafka: Message sent to 'forgot-password' topic");
  } catch (error) {
    console.error("Kafka Producer Error:", error);
  } finally {
    await producer.disconnect();
  }
};


module.exports = { emitUserSignedUp,emitForgotPasswordMail };