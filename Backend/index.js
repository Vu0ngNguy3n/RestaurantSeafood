const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const seafoodRouter = require("./routes/seafood");
const typeSeafoodRouter = require("./routes/typeseafood");
const commentRouter = require("./routes/comment");
const accountRouter = require("./routes/account");
const mailRouter = require("./routes/mailer");
const orderRouter = require("./routes/order");

dotenv.config();

// Connect database
mongoose.connect(process.env.MONGODB_URL);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// ROUTES
app.use("/restaurant/seafood", seafoodRouter);
app.use("/restaurant/typeSeafood", typeSeafoodRouter);
app.use("/restaurant/comment", commentRouter);
app.use("/restaurant/account", accountRouter);
app.use("/restaurant/mail", mailRouter);
app.use("/restaurant/order", orderRouter);

app.listen(8000, () => {
  console.log("server is running");
});
