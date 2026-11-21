export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Header CORS agar aman dipanggil dari frontend (GitHub Pages / Workers)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight request (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Endpoint cek status API (/api/health)
    if (url.pathname === "/api/health") {
      return Response.json(
        {
          status: "ok",
          service: "HobbiGo Worker",
          timestamp: new Date().toISOString(),
        },
        { headers: corsHeaders }
      );
    }

    // 2. Endpoint demo AI Journey Planner atau Chat Support (/api/chat)
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();
        const pesanUser = body.message || "";

        return Response.json(
          {
            reply: `Halo Traveler! Pesan "${pesanUser}" sudah diterima oleh HobbiGo Worker. Fitur AI Journey Planner siap membantu menyusun perjalananmu.`,
          },
          { headers: corsHeaders }
        );
      } catch (err) {
        return Response.json(
          { error: "Format JSON tidak valid" },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // 3. Sajikan file statis (index.html, style.css, app.js, folder chelea, telku, dll.)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  },
};
