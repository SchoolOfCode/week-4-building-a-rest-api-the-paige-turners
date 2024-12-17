import express from "express";
import { promises as fs } from "node:fs";

import { FILEPATH } from "./config.js";
import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";
// import { readQuotes, writeQuotes } from "./helper.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

//listen for a get request
//the route will be /quotes
//when we receive a request we want to:
//get all of the quotes
//respond with those quotes

app.get("/quotes", async function (req, res) {
  const quotes = await getQuotes();
  res.json(quotes);
});

//listen for get request
//the route will be /quotes/:id
//when we receive request we want to:
//get the id from the request in express
//use the id to find the right quote
//respond with the quote
app.get("/quotes/:id", async function (req, res) {
  const id = req.params.id;
  const quote = await getQuoteByID(id);
  res.json(quote);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
