const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const formDataList = []; // Initialize an array to store form data

async function createForm(formName, formActive) {
  try {
    const formBuilderApiKey = process.env.FORMBUILDER_JWT_TOKEN;
    const formCreationUrl = "https://api.123formbuilder.com/v2/forms";

    const newForm = {
      name: formName,
      active: formActive === "Yes" ? 0 : 3,
      fields: [
        { type: "text", label: "Name" },
        { type: "email", label: "Email" },
      ],
    };

    const response = await axios.post(formCreationUrl, newForm, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${formBuilderApiKey}`,
      },
    });

    console.log("Form created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating form:",
      error.response?.data || error.message
    );
    throw error;
  }
}

app.post("/api/webhook", async (req, res) => {
  const formData = req.body;

  if (!formData || !formData.answer || !formData.answer.answers) {
    console.error("Invalid form data:", formData);
    return res.status(400).send("Invalid data");
  }

  const formName = formData.answer.answers[0].t;
  const formActive = formData.answer.answers[1].c[0].t;

  console.log(`Form Name: ${formName}, Form Active: ${formActive}`);

  try {
    const createdForm = await createForm(formName, formActive);
    formDataList.push({ formName, formActive, createdForm });
    res.status(200).json({
      message: "Webhook received and form created successfully",
      form: createdForm,
    });
  } catch (error) {
    res.status(500).send("Failed to create form on 123FormBuilder");
  }
});

app.get("/api/data", (req, res) => {
  res.status(200).json(formDataList);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
