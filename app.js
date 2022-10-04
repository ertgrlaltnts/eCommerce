const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const orderRouter = require("./routers/orderRouter");
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const connectDb = require("./db/connectDb");

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "ertgrlaltnts",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/ecommerce",
    }),
  })
);

connectDb(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use("/users", authRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

const port = 8000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
