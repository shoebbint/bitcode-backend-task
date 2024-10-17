const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Webhook endpoint to receive POST requests
app.post('/webhook', (req, res) => {
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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
