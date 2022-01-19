/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51KGsWvHClDptJtFWiz6DRfN1EEsJuuXRhfpWuVtfh8TTRriETA7JbI2c4ecgBmZ4mRUu77P3cF6MylkJUSzOuTz600Yb3rCAyu"
);

// API

// App config
const app = express();

// MIDDLEWARES
app.use(cors({origin: true}));
// app.use(cors());

// API ROUTES
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment request received BOOM!!! for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "gbp",
  });
  console.log(response)
  response.status(201).send({clientSecret: paymentIntent.client_secret});
});

// LISTEN COMMAND
exports.api = functions.https.onRequest(app);

