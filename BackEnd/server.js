const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
process.on("uncaughtException", function (err) {
  if (process.env.NODE_ENV === "PRODUCTION") {
    console.log(err.message);
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err.stack);
  }

  console.log("Server is shutting down due to uncaught Exception");
  process.exit(1);
});
dotenv.config({ path: "BackEnd/config/config.env" });
const app = require("./app");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const port = process.env.PORT || 6000;
const DatabaseConnection = require("./database");
DatabaseConnection();
const server = app.listen(port, () => {
  console.log(`Server is started on ${port} on ${process.env.NODE_ENV} mode`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Server is shutting down due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
