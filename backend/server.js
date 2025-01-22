// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Configure environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Use middleware
app.use(express.json());
app.use(cors());

// Define the /translate route
app.post('/translate', async (req, res) => {
    const prompt = req.body.text;  // Full prompt is sent by the frontend

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: 150
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        res.json(response.data);
    }  catch (error) {
        console.error("Error:", error.response?.data || error.message || error);
        res.status(500).json({ error: "Error processing request" });
    }
    
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
