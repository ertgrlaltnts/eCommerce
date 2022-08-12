const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const authRouter = require("./routers/authRouter");
const orderRouter = require("./routers/orderRouter");
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const connectDb = require("./db/connectDb");

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "ertgrlaltnts",
    resave: false,
    saveUninitialized: true,
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

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
