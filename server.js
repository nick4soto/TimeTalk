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
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error processing request" });
    }
});
