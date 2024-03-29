const fs = require("fs");
const path = require("path");

const express = require("express");
require("dotenv").config();
const { json } = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const rolesRoutes = require("./routes/roles-routes");
const prescriptionsRoutes = require("./routes/prescriptions-routes");
const referralsRoutes = require("./routes/referrals-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/referrals", referralsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});


app.use(
  "/uploads/documents",
  express.static(path.join("uploads", "documents"))
);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.atgne4o.mongodb.net/healthcaresystem?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
