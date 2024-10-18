// api/webhook.js
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app as a serverless function (if needed)
module.exports = app;
