const express = require('express');
const { OpenAI } = require('openai');
require("dotenv").config();


const openai = new OpenAI({
    apiKey:process.env.OPENAI_KEY
});

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-about', async (req, res) => {
  const { keyword } = req.body;

  if (!word) {
    return res.status(400).json({ error: 'keyword is required' });
  }


  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages:[ {role:"user",content:`Generate an 'about' section for a user using the word: ${word}`}],
      max_tokens: 150,
    });

    const aboutSection = response.choices[0].message.content;
    res.json({ about: aboutSection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the about section' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
