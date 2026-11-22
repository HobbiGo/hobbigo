const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: "Kamu adalah asisten AI customer support dan travel planner untuk HobbiGo. Jawab dalam bahasa Indonesia yang ramah, ringkas, dan jelas terkait perjalanan, estimasi budget perjalanan, eSIM, dan pesanan.",
          },
        ],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: clean }],
        },
      ],
    }),
  }
);
