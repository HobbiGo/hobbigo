(() => {
  const WORKER_BASE_URL = window.location.hostname.includes("github.io")
    ? "https://hobbigo.wenyonghan927.workers.dev"
    : "";

  async function postJson(path, payload, errorMessage) {
    const res = await fetch(`${WORKER_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(errorMessage);
    return res.json();
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
    if (!res.ok) throw new Error("Gagal mengambil data kurs");
    return res.json();
  };

  function bindSupportChat() {
    const chatInput = document.querySelector(
      'input[placeholder*="Ketik pesan"], textarea[placeholder*="Ketik pesan"], #support-input, [data-support-input]'
    );
    const sendBtn =
      chatInput?.closest("form, div")?.querySelector('button[type="submit"], button') ||
      Array.from(document.querySelectorAll("button")).find((btn) =>
        btn.textContent.trim().toLowerCase().includes("kirim")
      );

    if (!chatInput || !sendBtn || chatInput.dataset.workerBound) return;
    chatInput.dataset.workerBound = "true";

    const handleSend = async (e) => {
      if (e) e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      chatInput.disabled = true;
      sendBtn.disabled = true;
      const originalText = sendBtn.textContent;
      sendBtn.textContent = "...";

      try {
        const data = await window.hobbiGoAskSupport(text);
        const container =
          chatInput.closest('[class*="chat"], [id*="chat"], [class*="support"]') ||
          chatInput.parentElement;

        const replyBox = document.createElement("div");
        replyBox.style.cssText =
          "margin-top:8px;padding:8px 10px;border-radius:8px;background:#f1f5f9;color:#0f172a;font-size:12px;";
        replyBox.textContent = data.reply || "Balasan diterima.";
        container?.insertBefore(replyBox, chatInput.closest("form") || chatInput);

        chatInput.value = "";
      } catch (err) {
        console.error(err);
      } finally {
        chatInput.disabled = false;
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
        chatInput.focus();
      }
    };

    sendBtn.addEventListener("click", handleSend);
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSend(e);
      }
    });
  }

  function bindPlannerButton() {
    const plannerBtn = Array.from(document.querySelectorAll("button, a")).find((el) =>
      el.textContent.toLowerCase().includes("ai journey planner")
    );

    if (!plannerBtn || plannerBtn.dataset.workerBound) return;
    plannerBtn.dataset.workerBound = "true";

    plannerBtn.addEventListener("click", async (e) => {
      const href = plannerBtn.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("javascript")) return;

      e.preventDefault();
      const destination = prompt("Tujuan liburan kamu?", "Jepang") || "Jepang";
      const days = Number(prompt("Berapa hari?", "5")) || 5;
      const mood =
        prompt("Suasana / tema? (Budaya, Pantai, Petualangan, City Escape)", "Budaya") ||
        "Budaya";

      try {
        const res = await window.hobbiGoGeneratePlan({ destination, days, mood });
        alert(res.plan?.summary || "Rencana perjalanan siap!");
      } catch {
        alert("Maaf, fitur AI Journey Planner sedang tidak dapat diakses.");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindSupportChat();
    bindPlannerButton();
  });
})();
