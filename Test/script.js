async function translateToShakespeare() {
    const userTextElement = document.getElementById("userText");
    const resultDiv = document.getElementById("result");

    if (!userTextElement || !resultDiv) {
        console.error("Required elements are missing from the HTML.");
        return;
    }

    const userText = userTextElement.value;
    resultDiv.textContent = "Translating to Shakespearean...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`  // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  
                messages: [
                    {
                        role: "user",
                        content: `Translate the following modern English to Shakespearean English:\n\n"${userText}"`
                    }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();
        console.log("API response:", data);

        // Display the response
        if (data.choices && data.choices.length > 0) {
            resultDiv.textContent = data.choices[0].message.content.trim();
        } else {
            resultDiv.textContent = "Sorry, something went wrong. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.textContent = "Error translating text. Please try again later.";
    }
}
