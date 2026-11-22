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
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || errorMessage);
    }
    return data;
  }

  window.hobbiGoAskSupport = function (message) {
    return postJson("/api/support", { message }, "Gagal menghubungi Support Worker");
  };

  window.hobbiGoGeneratePlan = function ({ destination, days, mood }) {
    return postJson(
      "/api/planner",
      { destination, days, mood },
      "Gagal membuat rencana perjalanan"
    );
  };

  window.hobbiGoGetRates = async function () {
    const res = await fetch(`${WORKER_BASE_URL}/api/rates`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Gagal mengambil data kurs");
    }
    return data;
  };

  function appendChatBubble(container, text, isError = false) {
    if (!container) return;
    const bubble = document.createElement("div");
    bubble.style.cssText = isError
      ? "margin-top:8px;padding:8px 10px;border-radius:8px;background:#fee2e2;color:#991b1b;font-size:12px;"
      : "margin-top:8px;padding:8px 10px;border-radius:8px;background:#f1f5f9;color:#0f172a;font-size:12px;";
    bubble.textContent = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  function bindSupportChat() {
    if (document.getElementById("chatInputText")) return;

    const chatInput = document.querySelector(
      'input[placeholder*="Ketik pesan"], textarea[placeholder*="Ketik pesan"], #support-input, [data-support-input]'
    );
    if (!chatInput || chatInput.dataset.workerBound) return;

    const sendBtn =
      chatInput.closest("form, div")?.querySelector('button[type="submit"], button') ||
      Array.from(document.querySelectorAll("button")).find((btn) =>
        btn.textContent.trim().toLowerCase().includes("kirim")
      );

    if (!sendBtn) return;
    chatInput.dataset.workerBound = "true";

    const handleSend = async (e) => {
      if (e) e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const container =
        chatInput.closest('[class*="chat"], [id*="chat"], [class*="support"]') ||
        chatInput.parentElement;

      chatInput.disabled = true;
      sendBtn.disabled = true;
      const originalText = sendBtn.textContent;
      sendBtn.textContent = "...";

      try {
        const data = await window.hobbiGoAskSupport(text);
        appendChatBubble(container, data.reply || "Balasan diterima.", false);
        chatInput.value = "";
      } catch (err) {
        appendChatBubble(
          container,
          err?.message || "Maaf, layanan chat sedang gangguan.",
          true
        );
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
    if (typeof window.openAiPlannerModal === "function") return;

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

  function initBindings() {
    bindSupportChat();
    bindPlannerButton();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBindings();
    const observer = new MutationObserver(() => initBindings());
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
