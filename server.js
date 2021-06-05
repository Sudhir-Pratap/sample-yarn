const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

const server = app.listen(PORT, () => {
  console.info(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
