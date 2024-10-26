async function translateToEra() {
    const userTextElement = document.getElementById("userText");
    const resultDiv = document.getElementById("result");

    if (!userTextElement || !resultDiv) {
        console.error("Required elements are missing from the HTML.");
        return;
    }

    const userText = userTextElement.value;
    const promptTemplate = document.body.getAttribute("data-prompt");  // Get the custom prompt from the data attribute
    const prompt = `${promptTemplate}\n\n"${userText}"`;

    resultDiv.textContent = "Translating...";

    try {
        const response = await fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: prompt })
        });

        const data = await response.json();
        console.log("Backend response:", data);

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
