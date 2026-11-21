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

function buildChatReply(message = "") {
  const clean = String(message).trim();
  if (!clean) {
    return { error: "Pesan tidak boleh kosong" };
  }
  return {
    reply: `Halo Traveler! Pesan "${clean}" sudah diterima oleh HobbiGo Worker. Ada yang bisa kami bantu?`,
  };
}

async function handlePlanner(request) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return jsonResponse({ error: parsed.error }, 400);

  const destination = String(parsed.data.destination || "Jepang").trim() || "Jepang";
  const days = Number(parsed.data.days) || 5;
  const mood = String(parsed.data.mood || "Budaya").trim() || "Budaya";

  return jsonResponse({
    plan: {
      destination,
      days,
      mood,
      summary: `Draft rencana ${days} hari ke ${destination} (${mood}) siap disesuaikan!`,
    },
  });
}

function handleRates() {
  return jsonResponse({
    base: "IDR",
    rates: { USD: 0.00006, JPY: 0.009, SGD: 0.00008 },
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
      if (!parsed.ok) return jsonResponse({ error: parsed.error }, 400);

      const result = buildChatReply(parsed.data.message);
      if (result.error) return jsonResponse({ error: result.error }, 400);
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
