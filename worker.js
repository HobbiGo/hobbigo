export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    if (!url.pathname.startsWith("/api/")) {
      if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
        return env.ASSETS.fetch(request);
      }
      return new Response("Not Found", { status: 404 });
    }

    if (request.method === "GET") {
      return jsonResponse({ status: "ok", service: "hobbigo-support-worker" });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    let userMessage = "";
    let body = {};

    try {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        body = await request.json().catch(() => ({}));
      } else {
        const rawText = await request.text();
        try {
          body = JSON.parse(rawText);
        } catch {
          body = { message: rawText };
        }
      }

      userMessage = extractMessage(body);
      if (!userMessage) {
        const emptyMsg = "Silakan ketik pesan terlebih dahulu.";
        return jsonResponse({
          error: "Pesan kosong",
          reply: emptyMsg,
          message: emptyMsg,
          response: emptyMsg
        });
      }

      const apiKey = typeof env.GEMINI_API_KEY === "string" ? env.GEMINI_API_KEY.trim() : "";
      if (!apiKey) {
        const fallback = buildFallbackReply(userMessage);
        return jsonResponse({
          reply: fallback,
          message: fallback,
          response: fallback,
          fallback: true,
          warning: "GEMINI_API_KEY belum terpasang"
        });
      }

      const geminiReply = await askGemini(apiKey, userMessage, body.history);
      return jsonResponse({
        reply: geminiReply,
        message: geminiReply,
        response: geminiReply
      });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("askGemini error:", errMsg);
      const fallback = buildFallbackReply(userMessage);
      return jsonResponse({
        reply: fallback,
        message: fallback,
        response: fallback,
        fallback: true,
        warning: errMsg
      });
    }
  }
};

function extractMessage(body) {
  if (!body || typeof body !== "object") return "";
  if (typeof body.message === "string" && body.message.trim()) return body.message.trim();
  if (typeof body.prompt === "string" && body.prompt.trim()) return body.prompt.trim();
  if (typeof body.text === "string" && body.text.trim()) return body.text.trim();
  if (typeof body.query === "string" && body.query.trim()) return body.query.trim();

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    const last = body.messages[body.messages.length - 1];
    if (typeof last === "string") return last.trim();
    if (last && typeof last.content === "string") return last.content.trim();
    if (last && typeof last.text === "string") return last.text.trim();
  }
  return "";
}

function buildFallbackReply(userMessage) {
  const lower = (userMessage || "").toLowerCase();
  if (
    lower.includes("pesawat") ||
    lower.includes("hotel") ||
    lower.includes("kereta") ||
    lower.includes("tour")
  ) {
    return "Halo! Ini versi demo HOBBIGO. Layanan Pesawat, Hotel & Penginapan, Pusat Sewa, Kereta, Acara & Grup, Paket Tour, TELKU eSIM, dan CHELEA Commerce masih dalam mode demo dan belum memproses pemesanan/pembayaran nyata.";
  }
  return "Halo! Selamat datang di Bantuan HOBBIGO (mode demo). Silakan tanyakan informasi seputar layanan HOBBIGO seperti Pesawat, Hotel & Penginapan, Pusat Sewa, Kereta, Acara & Grup, Paket Tour, TELKU eSIM, atau CHELEA Commerce.";
}

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

  const requestBody = JSON.stringify({
    systemInstruction: {
      parts: [
        {
          text: "Anda adalah asisten bantuan pelanggan HOBBIGO. Jawablah dengan ramah, jelas, dan ringkas dalam bahasa Indonesia. Jika ditanya soal transaksi atau pembayaran, jelaskan bahwa ini adalah versi demo tanpa pemesanan atau pembayaran nyata."
        }
      ]
    },
    contents
  });

  const models = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash"
  ];
  const errors = [];

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: requestBody
    });

    if (!res.ok) {
      const errText = await res.text();
      errors.push(`${model} HTTP ${res.status}: ${errText.slice(0, 180)}`);
      continue;
    }

    const data = await res.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text || "")
        .join("")
        .trim() || "";

    if (!replyText) {
      errors.push(`${model}: respons kosong`);
      continue;
    }

    return replyText;
  }

  throw new Error(errors.join(" | ") || "Semua model Gemini gagal merespons");
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store"
    }
  });
}
