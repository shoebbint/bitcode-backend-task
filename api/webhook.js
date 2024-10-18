// api/webhook.js
const express = require('express');
const app = express();
require('dotenv').config();

// Middleware to parse incoming JSON data
app.use(express.json());

// Webhook endpoint to receive POST requests
app.post('/webhook', (req, res) => {
  const formData = req.body;

  // Proceed with processing the form data
  const formName = formData['Form Name'];
  const formActive = formData['Form Active'];

  console.log(`Form Name: ${formName}, Form Active: ${formActive}`);
  res.status(200).send('Webhook received successfully');
});

// Export the app as a serverless function for Vercel
module.exports = app;
