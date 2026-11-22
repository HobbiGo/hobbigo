export default {
  async fetch(request, env, ctx) {
    // Opsional: batasi hanya method tertentu jika perlu
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    try {
      // Ganti URL target sesuai kebutuhan kamu (bisa juga pakai env.TARGET_URL)
      const targetUrl = env.TARGET_URL || "https://example.com";

      const upstreamResponse = await fetch(targetUrl, {
        method: request.method,
        headers: {
          "user-agent": "Cloudflare-Worker/1.0",
        },
      });

      const body = await upstreamResponse.text();

      return new Response(body, {
        status: upstreamResponse.status,
        headers: {
          "content-type":
            upstreamResponse.headers.get("content-type") ||
            "text/plain; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: "Gagal mengambil data dari server tujuan",
          detail: err instanceof Error ? err.message : String(err),
        }),
        {
          status: 502,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
    }
  },
};
