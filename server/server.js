import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("DIPX AI SERVER RUNNING");
});

// AI endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5.3",
      input: message,
    });

    res.json({
      reply: response.output[0].content[0].text,
    });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on port " + process.env.PORT)
);
