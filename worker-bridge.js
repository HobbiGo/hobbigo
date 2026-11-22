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

  function getSendButton() {
    const input = document.getElementById("chatInputText");
    return input?.closest(".chat-footer, form, div")?.querySelector("button") || null;
  }

  function hookIndexChat() {
    const input = document.getElementById("chatInputText");
    if (
      !input ||
      typeof window.sendChatMessage !== "function" ||
      typeof window.appendChatMessage !== "function" ||
      window.sendChatMessage._workerHooked
    ) {
      return false;
    }

    const hookedSendChatMessage = async function () {
      const currentInput = document.getElementById("chatInputText");
      const currentBtn = getSendButton();
      const text = currentInput?.value.trim();
      if (!text) return;

      window.appendChatMessage(text, "user");
      currentInput.value = "";
      currentInput.disabled = true;
      if (currentBtn) currentBtn.disabled = true;

      const container = document.getElementById("chatMessagesContainer");
      const pendingBubble = document.createElement("div");
      pendingBubble.className = "chat-msg support";
      pendingBubble.textContent = "Menghubungkan ke HobbiGo Support...";
      if (container) {
        container.appendChild(pendingBubble);
        container.scrollTop = container.scrollHeight;
      }

      try {
        const data = await window.hobbiGoAskSupport(text);
        pendingBubble.textContent = data?.reply || "Balasan diterima.";
      } catch (err) {
        pendingBubble.textContent =
          err?.message || "Maaf, balasan support gagal dimuat. Silakan coba lagi.";
      } finally {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
        currentInput.disabled = false;
        if (currentBtn) currentBtn.disabled = false;
        currentInput.focus();
      }
    };

    hookedSendChatMessage._workerHooked = true;
    window.sendChatMessage = hookedSendChatMessage;
    return true;
  }

  function hookIndexPlanner() {
    if (
      typeof window.generateDemoItinerary !== "function" ||
      typeof window.openModal !== "function" ||
      window.generateDemoItinerary._workerHooked
    ) {
      return false;
    }

    const originalGenerate = window.generateDemoItinerary;
    const hookedGenerateItinerary = async function () {
      const destEl = document.getElementById("aiDest");
      const durEl = document.getElementById("aiDuration");
      const budgetEl = document.getElementById("aiBudget");

      if (!destEl || !durEl || !budgetEl) {
        return originalGenerate.apply(this, arguments);
      }

      const destination = destEl.value.trim() || "Bali";
      const days = Number(durEl.value) || 5;
      const budget = Number(budgetEl.value);

      if (!Number.isFinite(budget) || budget <= 0) {
        if (typeof window.showToast === "function") {
          return window.showToast("Isi budget yang valid.");
        }
        return;
      }

      const activities = [
        "Kedatangan, check-in, dan eksplorasi kuliner lokal",
        "Wisata budaya dan pengalaman lokal",
        "Eksplorasi alam dan waktu santai",
        "Tur tambahan dan personal shopping",
        "Belanja oleh-oleh, check-out, dan perjalanan pulang",
      ];

      let summaryText = "";
      try {
        const apiRes = await window.hobbiGoGeneratePlan({
          destination,
          days,
          mood: "Budaya",
        });
        summaryText = apiRes?.plan?.summary || "";
      } catch (err) {
        console.warn("Menggunakan fallback itinerary lokal:", err);
      }

      let list = "";
      for (let day = 0; day < days; day++) {
        const activity = day === days - 1 ? activities[4] : activities[day] || activities[2];
        const safeActivity =
          typeof window.escapeHTML === "function" ? window.escapeHTML(activity) : activity;
        list += `<li>Hari ${day + 1}: ${safeActivity}.</li>`;
      }

      const safeDest =
        typeof window.escapeHTML === "function" ? window.escapeHTML(destination) : destination;
      const formattedBudget =
        typeof window.formatIDR === "function" ? window.formatIDR(budget) : `Rp ${budget}`;
      const summaryHtml = summaryText
        ? `<p style="margin-top:8px;font-size:13px;">${
            typeof window.escapeHTML === "function" ? window.escapeHTML(summaryText) : summaryText
          }</p>`
        : "";

      window.openModal(
        "Itinerary: " + destination,
        `<p class="demo-note">Rencana perjalanan terhubung ke HobbiGo Worker.</p>
         <p><strong>${safeDest}</strong> • ${days} hari • Budget ${formattedBudget}</p>
         ${summaryHtml}
         <ol style="padding-left:22px;margin-top:16px;">${list}</ol>`,
        `<button class="btn btn-primary" onclick="closeModal();addToCart('tr1');switchPage('cart')">Tambahkan Contoh Paket Bali</button>`
      );
    };

    hookedGenerateItinerary._workerHooked = true;
    window.generateDemoItinerary = hookedGenerateItinerary;
    return true;
  }

  function runHooks() {
    const chatDone = hookIndexChat();
    const plannerDone = hookIndexPlanner();
    return chatDone && plannerDone;
  }

  function startWatcher() {
    if (runHooks()) return;

    let ticks = 0;
    const interval = setInterval(() => {
      ticks += 1;
      if (runHooks() || ticks >= 50) {
        clearInterval(interval);
      }
    }, 150);

    const observer = new MutationObserver(() => {
      if (runHooks()) {
        observer.disconnect();
      }
    });

    const target = document.body || document.documentElement;
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }
  }

  startWatcher();
  document.addEventListener("DOMContentLoaded", runHooks);
  window.addEventListener("load", runHooks);
})();
