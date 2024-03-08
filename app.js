const path = require("path");

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const baseRoutes = require("./routes/base.routes");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes")

const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes")
const cartMiddleware = require("./middlewares/cart")
const sessionConfig = require("./config/session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", express.static(path.join(__dirname, "product-data/images")))
app.use(express.static(path.join(__dirname, "product-data/images")))

app.use(expressSession(sessionConfig()));

app.use(csrf());

app.use(addCsrfTokenMiddleware.addCsrfToken);

app.use(checkAuthMiddleware.checkAuthStatus)

app.use(cartMiddleware)

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(protectRoutesMiddleware)
app.use("/admin", adminRoutes)

app.use(errorHandlerMiddleware.errorHandler);

db.connectToDb()
  .then((result) => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
