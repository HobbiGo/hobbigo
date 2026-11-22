async function askGemini(apiKey, prompt, history) {
  const contents = [];

  if (Array.isArray(history)) {
    for (const item of history.slice(-6)) {
      if (!item || typeof item !== "object") continue;
      const role = item.role === "assistant" || item.role === "model" ? "model" : "user";
      const text =
        typeof item.content === "string"
          ? item.content
          : typeof item.text === "string"
          ? item.text
          : "";
      if (text.trim()) {
        contents.push({ role, parts: [{ text: text.trim() }] });
      }
    }
  }

  contents.push({ role: "user", parts: [{ text: prompt }] });

  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: "Anda adalah asisten bantuan pelanggan HOBBIGO. Jawablah dengan ramah, jelas, dan ringkas dalam bahasa Indonesia. Jika ditanya soal transaksi atau pembayaran, jelaskan bahwa ini adalah versi demo tanpa pemesanan atau pembayaran nyata."
            }
          ]
        },
        contents
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      lastError = new Error(`Model ${model} HTTP ${res.status}: ${errText}`);
      continue;
    }

    const data = await res.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text || "")
        .join("")
        .trim() || "";

    if (!replyText) {
      lastError = new Error(`Respons kosong dari model ${model}`);
      continue;
    }

    return replyText;
  }

  throw lastError || new Error("Semua model Gemini gagal merespons");
}
