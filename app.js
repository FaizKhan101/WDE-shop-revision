const path = require("path");

const express = require("express");
const csrf = require("csurf")

const authRoutes = require("./routes/auth.routes");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(csrf())

app.use(addCsrfTokenMiddleware)

app.use(authRoutes);

db.connectToDb()
  .then((result) => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
