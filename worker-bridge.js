(() => {
  const WORKER_BASE_URL = window.location.hostname.includes("github.io")
    ? "https://hobbigo.wenyonghan927.workers.dev"
    : "";

  // 1. Fungsi panggil Support Chat (/api/support)
  window.hobbiGoAskSupport = async function (message) {
    const res = await fetch(`${WORKER_BASE_URL}/api/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("Gagal menghubungi Support Worker");
    return await res.json();
  };

  // 2. Fungsi panggil AI Journey Planner (/api/planner)
  window.hobbiGoGeneratePlan = async function ({ destination, days, mood }) {
    const res = await fetch(`${WORKER_BASE_URL}/api/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, days, mood }),
    });
    if (!res.ok) throw new Error("Gagal membuat rencana perjalanan");
    return await res.json();
  };

  // 3. Fungsi ambil kurs referensi (/api/rates)
  window.hobbiGoGetRates = async function () {
    const res = await fetch(`${WORKER_BASE_URL}/api/rates`);
    if (!res.ok) throw new Error("Gagal mengambil data kurs");
    return await res.json();
  };

  // 4. Auto-attach ke form/input chat support jika ada di halaman
  document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector(
      'input[placeholder*="Ketik pesan"], textarea[placeholder*="Ketik pesan"], #support-input, [data-support-input]'
    );
    const sendBtn =
      chatInput?.closest("form, div")?.querySelector('button[type="submit"], button') ||
      Array.from(document.querySelectorAll("button")).find((btn) =>
        btn.textContent.trim().toLowerCase().includes("kirim")
      );

    if (chatInput && sendBtn) {
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

    // 5. Auto-attach ke tombol "Buka AI Journey Planner" jika belum punya handler khusus
    const plannerBtn = Array.from(document.querySelectorAll("button, a")).find((el) =>
      el.textContent.toLowerCase().includes("ai journey planner")
    );

    if (plannerBtn && !plannerBtn.dataset.workerBound) {
      plannerBtn.dataset.workerBound = "true";
      plannerBtn.addEventListener("click", async (e) => {
        // Jika tombol mengarah ke halaman/modal lain, tetap biarkan berjalan;
        // jika tidak ada href/tujuan khusus, tampilkan draft cepat dari Worker
        const href = plannerBtn.getAttribute("href");
        if (!href || href === "#" || href.startsWith("javascript")) {
          e.preventDefault();
          const destination = prompt("Tujuan liburan kamu?", "Jepang") || "Jepang";
          const daysInput = prompt("Berapa hari?", "5");
          const days = Number(daysInput) || 5;
          const mood = prompt("Suasana / tema? (Budaya, Pantai, Petualangan, City Escape)", "Budaya") || "Budaya";

          try {
            const res = await window.hobbiGoGeneratePlan({ destination, days, mood });
            alert(res.plan?.summary || "Rencana perjalanan siap!");
          } catch (err) {
            alert("Maaf, fitur AI Journey Planner sedang tidak dapat diakses.");
          }
        }
      });
    }
  });
})();
