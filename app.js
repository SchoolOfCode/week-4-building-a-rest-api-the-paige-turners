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

/* --- Ticket 3 --- */
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

/* --- Ticket 4 --- */
app.get("/quotes/:id", async function (req, res) {
  const id = req.params.id;
  const quote = await getQuoteByID(id);
  res.json(quote);
});

/* --- Ticket 5 --- */
app.post("/quotes/", async function (req, res){
  const newQuote = await addQuote(req.body);
  res.status(201).json({
    message: 'Resource created successfully',
    data: newQuote,
  });
})

/* --- Ticket 6 --- */
app.patch("/quotes/:id", async function (req, res){
  const id = req.params.id;
  const updateData = req.body;
  const updatedQuote = await editQuote(id, updateData.quoteText, updateData.author);
  res.status(200).json({
    message: 'Resource updated successfully',
    data: updatedQuote,
  });
})

/* --- Ticket 7 --- */
app.delete("/quotes/:id", async function (req, res){
  const id = req.params.id;
  const deleteQuote = await deleteQuote(id);
  res.status(200).json({
    message: 'Resource deleted successfully',
  });
}
)
app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

