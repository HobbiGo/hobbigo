(() => {
  const WORKER_BASE_URL =
    window.location.hostname.includes("github.io") ||
    window.location.hostname.includes("vercel.app")
      ? "https://hobbigo.wenyonghan927.workers.dev"
      : "";

  async function postJson(path, payload, errorMessage) {
    const res = await fetch(`${WORKER_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || errorMessage);
    }
    return data;
  }

  // 1. Support Chat (/api/support)
  window.hobbiGoAskSupport = function (message) {
    return postJson("/api/support", { message }, "Gagal menghubungi Support Worker");
  };

  // 2. AI Journey Planner (/api/planner)
  window.hobbiGoGeneratePlan = function ({ destination, days, mood }) {
    return postJson(
      "/api/planner",
      { destination, days, mood },
      "Gagal membuat rencana perjalanan"
    );
  };

  // 3. Kurs Referensi (/api/rates)
  window.hobbiGoGetRates = async function () {
    const res = await fetch(`${WORKER_BASE_URL}/api/rates`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Gagal mengambil data kurs");
    }
    return data;
  };
})();