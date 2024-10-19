Hi i am Soyeb bin Taher, here is the details of my task-1
# Webhook Integration for Forms.app and 123FormBuilder

## Overview

This project implements a webhook to capture form data submitted from [forms.app](https://forms.app/) and forwards it to [123FormBuilder](https://www.123formbuilder.com/) via their API. The main objective is to automate form creation in 123FormBuilder based on user submissions from forms.app.

## Problem Statement

The goal was to create a system where:
1. Users submit a form on forms.app.
2. The submitted data (Form Name and Form Active status) is captured via a webhook.
3. The captured data is then sent to 123FormBuilder to create a new form.

## Approach

### Design Decisions
- **Webhook Architecture**: I chose to use a webhook to listen for incoming form submissions in real-time, providing a seamless integration between the two platforms.
- **Express.js**: For handling the incoming webhook requests, I used Express.js, a minimal and flexible Node.js web application framework, which simplifies routing and middleware integration.
- **Body Parsing**: I utilized the `body-parser` middleware to easily parse incoming JSON data from forms.app.
- **API Communication**: I made HTTP requests to the 123FormBuilder API to create new forms using the data captured from the webhook.

### Steps Taken
1. **Create Form on forms.app**:
   - Designed a form with two fields: "Form Name" and "Form Active" (a checkbox).
   - Saved the form to get a public URL for testing.

2. **Set Up the Webhook**:
   - Created a Node.js server using Express to handle POST requests from forms.app.
   - Configured the server to log incoming form submissions.

3. **Process Incoming Data**:
   - Extracted the form data (Form Name and Form Active status) from the incoming request.
   - Implemented a function to send the data to 123FormBuilder API for form creation.

4. **Testing**:
   - Used a tool like [Ngrok](https://ngrok.com/) to expose my local server to the internet for testing.
   - Submitted the form on forms.app and verified that the data was received by the server and forwarded to 123FormBuilder.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- An account on forms.app
- An account on 123FormBuilder

### Installation

1. **Clone the Repository**:
   ```bash
       git clone https://github.com/yourusername/webhook-integration.git
       cd webhook-integration
2. **Install Dependencies**:
   ```bash
        npm install

3. **In the root directory, create a .env file and add your 123FormBuilder API token**:
      FORMBUILDER_JWT_TOKEN=your_api_key_here
4. **Run the server and expose your server**
```bash
    nodemon index.js
    ngrok http 5000

5. **Set Up the Webhook in forms.app** :

Navigate to your form's integration settings in forms.app.
Enter the Ngrok public URL followed by /api/webhook (e.g., https://your-ngrok-subdomain.ngrok.io/api/webhook).
Save the settings.
