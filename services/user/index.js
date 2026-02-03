require("dotenv").config();
const http = require("http");
const app = require("./app");
const { sequelize } = require('./models');
const { verifyCloudinary } = require('./config/cloudinary'); 

const port = process.env.PORT || 3000;

if (require.main === module) {
  const server = http.Server(app);

  const startServer = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to PostgreSQL has been established successfully.');

      const isCloudinaryReady = await verifyCloudinary();
      if (isCloudinaryReady) {
        console.log('Cloudinary configuration is valid.');
      } else {
        console.log('Cloudinary is not configured correctly. Uploads will fail.');
      }

      server.listen(port, () => {
        console.log(`User service is listening on port ${port}`);
      });

      const exitHandler = () => {
        if (server) {
          server.close(() => {
            console.log("Server closed");
            process.exit(1);
          });
        } else {
          process.exit(1);
        }
      };

      const unexpectedErrorHandler = (error) => {
        console.log(error);
        exitHandler();
      };

      process.on("uncaughtException", unexpectedErrorHandler);
      process.on("unhandledRejection", unexpectedErrorHandler);
      process.on("SIGTERM", () => {
        console.log("SIGTERM received");
        if (server) {
          server.close();
        }
      });

    } catch (error) {
      console.error('Unable to connect to the databases:', error);
      process.exit(1);
    }
  };

  startServer();
}

module.exports = app;