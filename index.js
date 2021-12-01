//generate express application with port 5000

const express = require("express");
const database = require("./src/helpers/database");
const models = require("./src/models");
const controllers = require("./src/controllers");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const port = 5000;


database.afterSync(() => {
  console.log(models);
  console.log("Tables synced successfully");
});
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));

Object.keys(controllers).forEach((controller) => {
  app.use(controllers[controller]);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
