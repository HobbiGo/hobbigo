const HOBBIGO_CATALOG = {
  flights: [
    {
      id: "FLT-GA402",
      airline: "Garuda Indonesia",
      airlineCode: "GA",
      flightNumber: "GA-402",
      origin: { city: "Jakarta", airport: "Soekarno-Hatta", code: "CGK" },
      destination: { city: "Denpasar (Bali)", airport: "Ngurah Rai", code: "DPS" },
      departureTime: "08:15",
      arrivalTime: "11:05",
      duration: "1j 50m",
      transit: "Langsung",
      cabinClass: "Economy",
      baggageKg: 20,
      pricePerPaxIDR: 1450000,
      seatsLeft: 6
    },
    {
      id: "FLT-QZ7510",
      airline: "Indonesia AirAsia",
      airlineCode: "QZ",
      flightNumber: "QZ-7510",
      origin: { city: "Jakarta", airport: "Soekarno-Hatta", code: "CGK" },
      destination: { city: "Denpasar (Bali)", airport: "Ngurah Rai", code: "DPS" },
      departureTime: "13:40",
      arrivalTime: "16:30",
      duration: "1j 50m",
      transit: "Langsung",
      cabinClass: "Economy",
      baggageKg: 0,
      pricePerPaxIDR: 890000,
      seatsLeft: 9
    },
    {
      id: "FLT-ID6362",
      airline: "Batik Air",
      airlineCode: "ID",
      flightNumber: "ID-6362",
      origin: { city: "Jakarta", airport: "Soekarno-Hatta", code: "CGK" },
      destination: { city: "Yogyakarta", airport: "Yogyakarta International", code: "YIA" },
      departureTime: "09:20",
      arrivalTime: "10:35",
      duration: "1j 15m",
      transit: "Langsung",
      cabinClass: "Economy",
      baggageKg: 20,
      pricePerPaxIDR: 780000,
      seatsLeft: 11
    },
    {
      id: "FLT-JT018",
      airline: "Lion Air",
      airlineCode: "JT",
      flightNumber: "JT-018",
      origin: { city: "Surabaya", airport: "Juanda", code: "SUB" },
      destination: { city: "Denpasar (Bali)", airport: "Ngurah Rai", code: "DPS" },
      departureTime: "10:10",
      arrivalTime: "12:05",
      duration: "55m",
      transit: "Langsung",
      cabinClass: "Economy",
      baggageKg: 20,
      pricePerPaxIDR: 640000,
      seatsLeft: 14
    },
    {
      id: "FLT-SQ953",
      airline: "Singapore Airlines",
      airlineCode: "SQ",
      flightNumber: "SQ-953",
      origin: { city: "Jakarta", airport: "Soekarno-Hatta", code: "CGK" },
      destination: { city: "Singapore", airport: "Changi", code: "SIN" },
      departureTime: "07:45",
      arrivalTime: "10:35",
      duration: "1j 50m",
      transit: "Langsung",
      cabinClass: "Economy",
      baggageKg: 25,
      pricePerPaxIDR: 2150000,
      seatsLeft: 5
    }
  ],
  hotels: [
    {
      id: "HTL-DPS-01",
      name: "The Anvaya Beach Resort Bali",
      city: "Kuta, Bali",
      stars: 5,
      rating: 4.8,
      reviewCount: 1420,
      roomType: "Deluxe Room",
      bedType: "1 King Bed / 2 Twin Beds",
      breakfastIncluded: true,
      freeCancellation: true,
      facilities: ["Akses Pantai", "Kolam Renang", "WiFi Gratis", "Spa", "Restoran"],
      pricePerNightIDR: 1850000
    },
    {
      id: "HTL-DPS-02",
      name: "Amnaya Resort Kuta",
      city: "Kuta, Bali",
      stars: 4,
      rating: 4.8,
      reviewCount: 1150,
      roomType: "Deluxe Room",
      bedType: "1 King Bed",
      breakfastIncluded: true,
      freeCancellation: true,
      facilities: ["Kolam Renang", "WiFi Gratis", "Pusat Kebugaran", "Restoran"],
      pricePerNightIDR: 980000
    },
    {
      id: "HTL-YOG-01",
      name: "Greenhost Boutique Hotel Prawirotaman",
      city: "Yogyakarta",
      stars: 4,
      rating: 4.7,
      reviewCount: 980,
      roomType: "Erde Room",
      bedType: "1 Queen Bed",
      breakfastIncluded: true,
      freeCancellation: true,
      facilities: ["Kolam Renang", "WiFi Gratis", "Eco-Friendly", "Kafe Rooftop"],
      pricePerNightIDR: 620000
    },
    {
      id: "HTL-BDG-01",
      name: "The Gaia Hotel Bandung",
      city: "Setiabudi, Bandung",
      stars: 5,
      rating: 4.9,
      reviewCount: 1640,
      roomType: "Deluxe Valley View",
      bedType: "1 King Bed",
      breakfastIncluded: true,
      freeCancellation: true,
      facilities: ["Infinity Pool Air Hangat", "WiFi Gratis", "Kids Club", "Spa", "Balkon"],
      pricePerNightIDR: 2100000
    }
  ],
  carRentals: [
    {
      id: "CAR-AVZ-01",
      vehicleName: "Toyota Avanza 1.5 G",
      category: "MPV",
      seats: 7,
      luggage: 3,
      transmission: "Automatic",
      driverOption: "Dengan Sopir + BBM (12 Jam)",
      city: "Bali",
      rating: 4.9,
      pricePerDayIDR: 550000
    },
    {
      id: "CAR-INV-02",
      vehicleName: "Toyota Kijang Innova Zenix",
      category: "MPV Premium",
      seats: 7,
      luggage: 4,
      transmission: "Automatic",
      driverOption: "Dengan Sopir + BBM (12 Jam)",
      city: "Bali",
      rating: 4.9,
      pricePerDayIDR: 850000
    },
    {
      id: "CAR-BRIO-03",
      vehicleName: "Honda Brio RS",
      category: "City Car",
      seats: 5,
      luggage: 2,
      transmission: "Automatic",
      driverOption: "Lepas Kunci (24 Jam)",
      city: "Yogyakarta",
      rating: 4.8,
      pricePerDayIDR: 325000
    },
    {
      id: "CAR-HIACE-04",
      vehicleName: "Toyota Hiace Commuter",
      category: "Minibus Grup",
      seats: 14,
      luggage: 8,
      transmission: "Manual",
      driverOption: "Dengan Sopir + BBM (12 Jam)",
      city: "Bandung",
      rating: 4.8,
      pricePerDayIDR: 1250000
    }
  ],
  attractions: [
    {
      id: "ATR-DPS-01",
      name: "Garuda Wisnu Kencana (GWK) Cultural Park",
      city: "Badung, Bali",
      category: "Budaya & Landmark",
      openHours: "09:00 - 21:00 WITA",
      rating: 4.7,
      ticketType: "Tiket Masuk Reguler + Pertunjukan Tari",
      pricePerPaxIDR: 125000,
      highlights: ["Patung GWK", "Tari Kecak Sore", "Shuttle Buggy Opsional"]
    },
    {
      id: "ATR-DPS-02",
      name: "Pura Luhur Uluwatu & Tari Kecak Sunset",
      city: "Uluwatu, Bali",
      category: "Budaya & Alam",
      openHours: "07:00 - 19:00 WITA",
      rating: 4.8,
      ticketType: "Tiket Masuk + Pertunjukan Tari Kecak",
      pricePerPaxIDR: 150000,
      highlights: ["Pemandangan Tebing", "Sunset Samudra Hindia", "Tari Kecak Api"]
    },
    {
      id: "ATR-YOG-01",
      name: "Candi Borobudur (Tiket Naik Struktur Candi)",
      city: "Magelang, Jawa Tengah",
      category: "Sejarah & UNESCO",
      openHours: "06:30 - 17:00 WIB",
      rating: 4.9,
      ticketType: "Tiket Masuk Domestik + Pemandu Lokal",
      pricePerPaxIDR: 120000,
      highlights: ["Sesi Kunjungan Terjadwal", "Sandal Upanat", "Pemandu Resmi"]
    },
    {
      id: "ATR-BDG-01",
      name: "Kawah Putih Ciwidey & Ranca Upas",
      city: "Ciwidey, Bandung",
      category: "Wisata Alam",
      openHours: "07:30 - 17:00 WIB",
      rating: 4.7,
      ticketType: "Tiket Terusan + Ontang-Anting",
      pricePerPaxIDR: 85000,
      highlights: ["Danau Kawah Vulkanik", "Skywalk Cantigi", "Penangkaran Rusa"]
    }
  ],
  dining: [
    {
      id: "DIN-DPS-01",
      name: "Bebek Tepi Sawah Ubud",
      city: "Ubud, Bali",
      cuisine: "Masakan Bali & Nusantara",
      priceLevel: "$$",
      averageSpendPerPaxIDR: 135000,
      rating: 4.6,
      openHours: "10:00 - 22:00 WITA",
      reservationRequired: true,
      signatureMenu: ["Crispy Duck", "Sate Lilit", "Es Daluman"]
    },
    {
      id: "DIN-DPS-02",
      name: "Menega Cafe Jimbaran Seafood",
      city: "Jimbaran, Bali",
      cuisine: "Seafood Bakar Tepian Pantai",
      priceLevel: "$$",
      averageSpendPerPaxIDR: 180000,
      rating: 4.7,
      openHours: "11:00 - 23:00 WITA",
      reservationRequired: true,
      signatureMenu: ["Paket Seafood Sunset", "Udang Bakar Madu", "Kerang Bumbu Jimbaran"]
    },
    {
      id: "DIN-BDG-01",
      name: "Kampung Daun Culture Gallery & Cafe",
      city: "Lembang, Bandung",
      cuisine: "Sunda & Tradisional",
      priceLevel: "$$",
      averageSpendPerPaxIDR: 150000,
      rating: 4.7,
      openHours: "11:00 - 23:00 WIB",
      reservationRequired: false,
      signatureMenu: ["Nasi Liwet Parahyangan", "Gurame Bakar", "Bandrek"]
    },
    {
      id: "DIN-YOG-01",
      name: "The House of Raminten",
      city: "Kotabaru, Yogyakarta",
      cuisine: "Kuliner Tradisional Jawa",
      priceLevel: "$",
      averageSpendPerPaxIDR: 65000,
      rating: 4.6,
      openHours: "09:00 - 24:00 WIB",
      reservationRequired: false,
      signatureMenu: ["Sego Kucing", "Ayam Koteka", "Wedang Uwuh"]
    }
  ],
  esimAndCommerce: [
    {
      id: "ESIM-ASIA-7D",
      service: "TELKU eSIM",
      name: "TELKU eSIM Asia Pasifik 7 Hari (10GB 5G)",
      priceIDR: 149000,
      activation: "Instan via QR Code"
    },
    {
      id: "ESIM-ID-15D",
      service: "TELKU eSIM",
      name: "TELKU eSIM Indonesia Wisatawan 15 Hari (20GB 5G)",
      priceIDR: 125000,
      activation: "Instan via QR Code"
    },
    {
      id: "CHL-TRV-KIT",
      service: "CHELIA Commerce",
      name: "CHELIA Travel Adapter Universal & Organizer Set",
      priceIDR: 215000,
      delivery: "Pengiriman Nasional"
    }
  ]
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Preflight CORS
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

    // Sajikan frontend statis (index.html, CSS, JS, gambar) dari env.ASSETS
    if (!url.pathname.startsWith("/api/")) {
      if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
        return env.ASSETS.fetch(request);
      }
      return new Response("Not Found", { status: 404 });
    }

    // 1. Endpoint Katalog Lengkap (/api/catalog?category=...)
    if (url.pathname === "/api/catalog" && request.method === "GET") {
      const category = url.searchParams.get("category");
      const liveIntegrations = getLiveIntegrationStatus(env);

      if (category && Object.prototype.hasOwnProperty.call(HOBBIGO_CATALOG, category)) {
        return jsonResponse({
          status: "ok",
          category,
          liveIntegrations,
          items: HOBBIGO_CATALOG[category]
        });
      }

      return jsonResponse({
        status: "ok",
        liveIntegrations,
        catalog: HOBBIGO_CATALOG
      });
    }

    // 2. Endpoint Pencarian Cepat (/api/search?category=flights&q=bali atau live Google Places / Amadeus)
    if (url.pathname === "/api/search" && request.method === "GET") {
      const category = url.searchParams.get("category") || "all";
      const query = (url.searchParams.get("q") || "").trim();

      // Jika Google Places API Key sudah dipasang & kategori attractions/dining, pakai data live
      if (
        env.GOOGLE_PLACES_API_KEY &&
        query &&
        (category === "attractions" || category === "dining")
      ) {
        try {
          const livePlaces = await searchGooglePlacesLive(
            env.GOOGLE_PLACES_API_KEY.trim(),
            query,
            category
          );
          if (livePlaces.length > 0) {
            return jsonResponse({
              status: "ok",
              source: "google_places_live",
              category,
              query,
              items: livePlaces
            });
          }
        } catch (err) {
          console.error("Google Places live error:", err);
        }
      }

      const results = searchCatalogLocal(category, query);
      return jsonResponse({
        status: "ok",
        source: "hobbigo_catalog",
        category,
        query,
        items: results
      });
    }

    // 3. Healthcheck GET /api/support
    if (request.method === "GET") {
      return jsonResponse({
        status: "ok",
        service: "hobbigo-support-worker",
        liveIntegrations: getLiveIntegrationStatus(env),
        endpoints: ["/api/support", "/api/catalog", "/api/search"]
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method Not Allowed" }, 405);
    }

    // 4. Endpoint Chat AI (/api/support)
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
        const emptyMsg = "Silakan ketik pesan terlebih dahulu agar saya bisa membantu.";
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

      // Ambil konteks tempat wisata/kuliner live dari Google Places jika key sudah terpasang
      let liveContextNote = "";
      if (env.GOOGLE_PLACES_API_KEY && shouldQueryPlaces(userMessage)) {
        try {
          const places = await searchGooglePlacesLive(
            env.GOOGLE_PLACES_API_KEY.trim(),
            userMessage,
            "all"
          );
          if (places.length > 0) {
            liveContextNote = `\nData Live Tempat & Kuliner Terkait: ${JSON.stringify(places.slice(0, 5))}`;
          }
        } catch (err) {
          console.error("Google Places context error:", err);
        }
      }

      const geminiReply = await askGemini(
        apiKey,
        userMessage,
        body.history,
        liveContextNote
      );

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

function getLiveIntegrationStatus(env) {
  return {
    geminiAI: Boolean(env && env.GEMINI_API_KEY),
    amadeusFlightHotel: Boolean(env && env.AMADEUS_CLIENT_ID && env.AMADEUS_CLIENT_SECRET),
    googlePlaces: Boolean(env && env.GOOGLE_PLACES_API_KEY)
  };
}

function searchCatalogLocal(category, query) {
  const q = (query || "").toLowerCase();
  const categories =
    category && category !== "all" && Object.prototype.hasOwnProperty.call(HOBBIGO_CATALOG, category)
      ? [category]
      : Object.keys(HOBBIGO_CATALOG);

  const matched = [];
  for (const cat of categories) {
    for (const item of HOBBIGO_CATALOG[cat]) {
      if (!q || JSON.stringify(item).toLowerCase().includes(q)) {
        matched.push({ category: cat, ...item });
      }
    }
  }
  return matched;
}

function shouldQueryPlaces(text) {
  const lower = (text || "").toLowerCase();
  return (
    lower.includes("wisata") ||
    lower.includes("pariwisata") ||
    lower.includes("makan") ||
    lower.includes("restoran") ||
    lower.includes("kuliner") ||
    lower.includes("kafe")
  );
}

async function searchGooglePlacesLive(placesApiKey, query, category) {
  const prefix =
    category === "dining"
      ? "restoran tempat makan "
      : category === "attractions"
      ? "tempat wisata "
      : "";

  const res = await fetchWithTimeout(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": placesApiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.regularOpeningHours.weekdayDescriptions"
      },
      body: JSON.stringify({
        textQuery: `${prefix}${query}`,
        languageCode: "id",
        maxResultCount: 5
      })
    },
    6000
  );

  if (!res.ok) return [];
  const data = await res.json();
  const places = Array.isArray(data?.places) ? data.places : [];

  return places.map((p) => ({
    id: p.id || "",
    name: p.displayName?.text || "",
    address: p.formattedAddress || "",
    rating: p.rating || null,
    reviewCount: p.userRatingCount || 0,
    priceLevel: p.priceLevel || ""
  }));
}

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
  if (lower.includes("pesawat") || lower.includes("tiket")) {
    return "Asisten HOBBIGO siap membantu pencarian tiket pesawat. Contoh rute tersedia di katalog: Jakarta (CGK) - Denpasar Bali (DPS) mulai Rp890.000/orang (AirAsia QZ-7510) atau Rp1.450.000/orang (Garuda Indonesia GA-402), serta Jakarta - Yogyakarta (YIA) Rp780.000/orang (Batik Air ID-6362).";
  }
  if (lower.includes("hotel") || lower.includes("penginapan")) {
    return "Asisten HOBBIGO menyediakan pilihan hotel & penginapan, antara lain The Anvaya Beach Resort Bali (Rp1.850.000/malam), Amnaya Resort Kuta (Rp980.000/malam), dan Greenhost Boutique Hotel Yogyakarta (Rp620.000/malam).";
  }
  if (lower.includes("sewa") || lower.includes("mobil") || lower.includes("kendaraan")) {
    return "Tersedia layanan Pusat Sewa kendaraan: Toyota Avanza 1.5 G dengan sopir + BBM di Bali (Rp550.000/hari), Innova Zenix (Rp850.000/hari), serta Honda Brio RS lepas kunci di Yogyakarta (Rp325.000/hari).";
  }
  if (lower.includes("wisata") || lower.includes("pariwisata")) {
    return "Pilihan tiket tempat pariwisata HOBBIGO antara lain Garuda Wisnu Kencana (GWK) Bali (Rp125.000/orang), Pura Luhur Uluwatu & Tari Kecak (Rp150.000/orang), Candi Borobudur (Rp120.000/orang), dan Kawah Putih Ciwidey (Rp85.000/orang).";
  }
  if (lower.includes("makan") || lower.includes("restoran") || lower.includes("kuliner")) {
    return "Rekomendasi tempat makan di HOBBIGO: Bebek Tepi Sawah Ubud (~Rp135.000/orang), Menega Cafe Jimbaran Seafood (~Rp180.000/orang), Kampung Daun Bandung (~Rp150.000/orang), dan The House of Raminten Yogyakarta (~Rp65.000/orang).";
  }
  return "Halo! Selamat datang di Support HOBBIGO. Silakan tanyakan detail rute pesawat, hotel, sewa kendaraan, tiket wisata, tempat makan, TELKU eSIM, atau CHELEA Commerce.";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options, timeoutMs = 8500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function askGemini(apiKey, prompt, history, liveContextNote = "") {
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

  const catalogContext = JSON.stringify(HOBBIGO_CATALOG);

  const requestBody = JSON.stringify({
    systemInstruction: {
      parts: [
        {
          text:
            "Anda adalah asisten bantuan pelanggan resmi HOBBIGO yang melayani Travel (Pesawat, Hotel & Penginapan, Pusat Sewa Kendaraan, Tempat Pariwisata & Tiket, Tempat Makan & Reservasi, Paket Tour, Acara & Grup), TELKU eSIM, dan CHELEA Commerce. " +
            "Gunakan data katalog HOBBIGO berikut sebagai referensi utama untuk menyebutkan nama maskapai, nomor penerbangan, hotel, tipe mobil, destinasi wisata, restoran, dan harga dalam Rupiah (IDR) secara akurat dan terstruktur. " +
            "Jika pengguna mencari rute atau kota yang belum ada di katalog, tetap bantu buatkan estimasi jadwal, itinerary, dan rincian budget yang realistis dalam bahasa Indonesia yang ramah dan profesional. " +
            `Data Katalog HOBBIGO: ${catalogContext}${liveContextNote}`
        }
      ]
    },
    contents
  });

  const models = [
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash"
  ];
  const errors = [];

  for (const model of models) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetchWithTimeout(
          endpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey
            },
            body: requestBody
          },
          8500
        );

        if (!res.ok) {
          const errText = await res.text();
          errors.push(`${model} (try ${attempt}) HTTP ${res.status}: ${errText.slice(0, 140)}`);

          if ((res.status === 503 || res.status === 429) && attempt < 3) {
            await sleep(attempt * 800);
            continue;
          }
          break;
        }

        const data = await res.json();
        const replyText =
          data?.candidates?.[0]?.content?.parts
            ?.map((p) => p?.text || "")
            .join("")
            .trim() || "";

        if (!replyText) {
          errors.push(`${model} (try ${attempt}): respons kosong`);
          break;
        }

        return replyText;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${model} (try ${attempt}) err: ${msg.slice(0, 120)}`);
        if (attempt < 3) {
          await sleep(attempt * 800);
        }
      }
    }
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
