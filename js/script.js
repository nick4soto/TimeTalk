async function translateToShakespeare() {
    const userTextElement = document.getElementById("userText");
    const resultDiv = document.getElementById("result");

    if (!userTextElement || !resultDiv) {
        console.error("Required elements are missing from the HTML.");
        return;
    }

    const userText = userTextElement.value;
    resultDiv.textContent = "Translating...";

    // Get the prompt from the data attribute in the HTML
    const promptTemplate = document.body.getAttribute("data-prompt");
    const prompt = `${promptTemplate}\n\n"${userText}"`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt
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
