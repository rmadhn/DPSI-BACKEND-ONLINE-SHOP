var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var app = express();
var sequelize = require("./models/index");
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var customerRouter = require("./routes/customer");
var categoriesRouter = require("./routes/categories");
var supplierRouter = require("./routes/suppliers");
var productsRouter = require("./routes/products");
var orderDetailsRouter = require("./routes/orderDetails");
var shippersRouter = require("./routes/shippers");
var employeesRouter = require("./routes/employees");
var ordersRouter = require("./routes/orders");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads")); // Middleware untuk menyajikan file statis

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/customer", customerRouter);
app.use("/categories", categoriesRouter);
app.use("/supplier", supplierRouter);
app.use("/products", productsRouter);
app.use("/order-details", orderDetailsRouter);
app.use("/shippers", shippersRouter);
app.use("/employees", employeesRouter);
app.use("/orders", ordersRouter);

sequelize.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
