const { createClient } = require('redis');

const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('ready', () => console.log('Redis: Ready and Connected!'));

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Could not connect to Redis:', err);
    }
})();

module.exports = redisClient;