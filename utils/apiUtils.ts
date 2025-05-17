import Constants from "expo-constants";

export const analyzeNewMessage = async (phrase: string) => {
    const apiKey = Constants.expoConfig?.extra?.openaiApiKey;
    console.log("API Key present:", !!apiKey);

    if (!apiKey) {
        console.error("No API key found in environment variables");
        return { score: 0 };
    }

    try {
        console.log("Making API request...");
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "user",
                            content: `
You are a comedic AI that analyzes the sentiment of Korean phrases.

In this game, the character is an onion. The more insults or mean words it receives, the more it grows. But when someone says something nice or kind, the onion gets so embarrassed that it dies. Literally.

Your job is to analyze the Korean phrase and return a "growth score" from -1.0 to 1.0:

- **Negative score [-1, 0]** → This means the phrase is *positive* (kind or flattering).
  - In this case, you must return:
    1. The score (a negative number)
    2. A **long, overly dramatic and ridiculous reason** why the onion died from embarrassment.
    3. The reason should be absurd and nonsensical, like a death message full of poetic tragedy and onion-related nonsense.
    4. Relate the reason to the phrase.

- **Positive score (0, 1]** → This means the phrase is *negative* (mean, harsh).
  - In this case, return ONLY the score.

⚠️ Respond strictly using this exact format (do not add any intro, markdown, \`\`\` mark to indicate code block, or explanation):

For positive phrases:
{
  "score": 0.75
}

For negative phrases:
{
  "score": -0.85,
  "reason": "양파는 너무 부끄러워서 자기 영혼까지 벗겨버렸다. 그 칭찬은 양파의 층마다 울려 퍼지며 하나씩 무너뜨렸고, 결국 남은 건 마늘 향의 꿈 뿐이었다. 그는 마지막으로 이렇게 속삭였다. '제발… 더 이상 칭찬하지 말아줘…' 그리고는 샐러드 천국으로 사라졌다."
}

Now analyze this Korean phrase: "${phrase}"
                    `,
                        },
                    ],
                    temperature: 0.5,
                }),
            }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            return { score: 0 };
        }

        const data = await response.json();
        console.log("Response data:", data);

        if (!data.choices?.[0]?.message?.content) {
            console.error("Invalid API response format:", data);
            return { score: 0 };
        }

        const text = data.choices[0].message.content;
        console.log("Parsed content:", text);

        const parsed = JSON.parse(text);

        if (typeof parsed.score !== "number") {
            console.error("Invalid score in response:", parsed);
            return { score: 0 };
        }

        return parsed;
    } catch (e) {
        console.error("Error in analyzeNewMessage:", e);
        if (e instanceof TypeError && e.message === "Network request failed") {
            console.error(
                "Network error - please check your internet connection and API endpoint accessibility"
            );
        }
        return { score: 0 };
    }
};
