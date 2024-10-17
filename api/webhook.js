// api/webhook.js
const express = require('express');
const app = express();
const crypto = require('crypto');
const port = process.env.PORT || 3000;
const webhookSecret = process.env.WEBHOOK_SECRET;
const formBuilderApiKey = process.env.FORMBUILDER_API_KEY;

require('dotenv').config();

// Middleware to parse incoming JSON data
app.use(express.json());
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Webhook endpoint to receive POST requests
app.post('/', (req, res) => {
  const formData = req.body;
  const receivedSecret = req.headers['x-webhook-secret']; // Assuming the secret is sent in a custom header

  const expectedSecret = 'your_generated_secret_key'; // The secret key you configured

  // Verify the secret
  if (receivedSecret !== expectedSecret) {
    console.log('Unauthorized request. Invalid secret key.');
    return res.status(403).send('Unauthorized');
  }

  // Proceed with processing the form data
  const formName = formData['Form Name'];
  const formActive = formData['Form Active'];

  console.log(`Form Name: ${formName}, Form Active: ${formActive}`);
  res.status(200).send('Webhook received successfully');
});

// Export the app as a serverless function
module.exports = app;
