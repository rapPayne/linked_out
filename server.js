// "old" way of importing
// const express = require('express');
// new way of importing
import express from 'express';

const app = express();

app.use(express.static("client"));

//GET /api/people
app.get('/api/people', (req, res) => {
  res.send("Hello world");
});

app.listen(3001, () => {
  console.log("Listening for requests on port 3001");
})

