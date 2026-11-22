const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data, status = 200) {
  return Response.json(data, { status, headers: CORS_HEADERS });
}

async function readJsonBody(request) {
  try {
    return { ok: true, data: await request.json() };
  } catch {
    return { ok: false, error: "Format JSON tidak valid" };
  }
}

async function buildChatReply(message = "", env) {
  const clean = String(message).trim();
  if (!clean) {
    return { error: "Pesan tidak boleh kosong" };
  }

  const apiKey = env?.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      reply: `Halo Traveler! Pesan "${clean}" sudah diterima oleh HobbiGo Worker, tetapi GEMINI_API_KEY belum diatur di environment Worker.`,
    };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
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

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const aiText =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text || "")
        .join("")
        .trim() || "Maaf, saya belum bisa memberikan jawaban saat ini.";

    return { reply: aiText };
  } catch (err) {
    return {
      reply: `Maaf, asisten AI sedang gangguan (${err?.message || "unknown error"}). Silakan coba lagi sebentar.`,
    };
  }
}

function buildItineraryDays(destination, days, mood) {
  const safeDays = Math.max(1, Math.min(Number(days) || 5, 14));
  const templates = [
    `Kedatangan di ${destination}, check-in akomodasi, dan eksplorasi kuliner lokal (${mood}).`,
    `Eksplorasi destinasi ikonik & pengalaman budaya di ${destination} dengan nuansa ${mood}.`,
    `Wisata alam, spot foto pilihan, dan waktu santai di sekitar ${destination}.`,
    `Aktivitas pilihan tambahan, rekomendasi lokal, atau belanja kebutuhan perjalanan.`,
    `Belanja oleh-oleh, check-out, dan persiapan perjalanan pulang dari ${destination}.`,
  ];

  const result = [];
  for (let i = 0; i < safeDays; i++) {
    if (i === safeDays - 1 && safeDays > 1) {
      result.push(templates[4]);
    } else {
      result.push(templates[i] || templates[2]);
    }
  }
  return result;
}

async function handlePlanner(request) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) {
    return jsonResponse({ error: parsed.error }, 400);
  }

  const destination = String(parsed.data.destination || "Bali").trim() || "Bali";
  const days = Math.max(1, Math.min(Number(parsed.data.days) || 5, 14));
  const mood = String(parsed.data.mood || "Budaya").trim() || "Budaya";
  const planDays = buildItineraryDays(destination, days, mood);

  return jsonResponse({
    plan: {
      destination,
      days,
      mood,
      summary: `Rencana perjalanan ${days} hari ke ${destination} (tema: ${mood}) siap disesuaikan.`,
      days: planDays,
    },
  });
}

function handleRates() {
  return jsonResponse({
    base: "IDR",
    rates: {
      USD: 0.000055,
      JPY: 0.00866,
      SGD: 0.00008,
      CNY: 0.00037,
      EUR: 0.000049,
    },
    updatedAt: new Date().toISOString(),
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const { pathname } = new URL(request.url);

    if (pathname === "/api/health" && request.method === "GET") {
      return jsonResponse({
        status: "ok",
        service: "HobbiGo Worker",
        timestamp: new Date().toISOString(),
      });
    }

    if ((pathname === "/api/support" || pathname === "/api/chat") && request.method === "POST") {
      const parsed = await readJsonBody(request);
      if (!parsed.ok) {
        return jsonResponse({ error: parsed.error }, 400);
      }
      const result = await buildChatReply(parsed.data.message, env);
      if (result.error) {
        return jsonResponse({ error: result.error }, 400);
      }
      return jsonResponse(result);
    }

    if (pathname === "/api/planner" && request.method === "POST") {
      return handlePlanner(request);
    }

    if (pathname === "/api/rates" && request.method === "GET") {
      return handleRates();
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404, headers: CORS_HEADERS });
  },
};
