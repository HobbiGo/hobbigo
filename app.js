// =========================================
// FILE JAVASCRIPT HOBIGO (DENGAN MAP & LIVE TRACKING)
// =========================================

const products = [
  {id:1, type:"Hotel", name:"Bali Beach Resort", place:"Kuta, Bali", price:850000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"2.4K"},
  {id:2, type:"Hotel", name:"Ubud Private Villa", place:"Ubud, Bali", price:1500000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"1.2K"},
  {id:3, type:"Flight", name:"Garuda Indonesia", place:"CGK - DPS", price:1800000, img:"https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.6, reviews:"3.1K"},
  {id:4, type:"Transport", name:"Toyota Alphard", place:"Bali", price:1200000, img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"856"}
];

let cart = [];
let transactions = [];
let mapInstance = null; 
let liveMarker = null;
let liveInterval = null;
let culinaryMarkers = [];
let eventMarkers = [];

try { 
  cart = JSON.parse(localStorage.getItem("hobbigoCart")) || []; 
  transactions = JSON.parse(localStorage.getItem("hobbigoTransactions")) || [];
} catch(e) { cart = []; transactions = []; }

function money(n){ return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n); }
function saveCart(){ 
  localStorage.setItem("hobbigoCart", JSON.stringify(cart)); 
  const h = document.getElementById("cartCountHeader");
  if(h) h.textContent = cart.length; 
}

function showPage(id){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id==="market") renderMarket();
  if(id==="booking") renderBooking();
  if(id==="transactions") renderTransactions();
  window.scrollTo({top:0,behavior:"smooth"});
}

function goToMarket(type) {
  showPage('market');
  document.getElementById('marketType').value = type;
  renderMarket();
}

// =========================================
// FUNGSI AI GENERATE + PETA
// =========================================
function generateTrip(){
  const dest = document.getElementById("dest").value || "Bali";
  
  document.getElementById("tripResult").innerHTML = `<p style="text-align:center; color:var(--gold);"><i class="fa-solid fa-spinner fa-spin"></i> AI sedang merancang rute perjalanan...</p>`;
  
  setTimeout(() => {
    document.getElementById("tripResult").innerHTML = `
      <div class="map-card">
        <h3 style="color:var(--gold);margin-bottom:15px"><i class="fa-solid fa-route"></i> Smart Route & Global Discovery</h3>
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:15px">AI telah menyusun rute perjalanan Anda. Klik tombol di bawah untuk melihat data global.</p>
        
        <!-- Container untuk Peta Leaflet -->
        <div id="map-container" style="height:400px; border-radius:15px; margin-bottom:15px;"></div>
        
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:15px;">
          <button class="btn-outline" onclick="showGlobalCulinary()"><i class="fa-solid fa-utensils"></i> Tampilkan Kuliner Global</button>
          <button class="btn-outline" onclick="showGlobalEvents()"><i class="fa-solid fa-music"></i> Tampilkan Live Events</button>
          <button class="live-tracking-btn" style="margin-top:0" onclick="startLiveJourney()"><i class="fa-solid fa-location-crosshairs"></i> Mulai Perjalanan</button>
        </div>
      </div>
    `;
    
    initMap();
  }, 1500); 
}

// =========================================
// FUNGSI MEMBUAT PETA (LEAFLET)
// =========================================
function initMap() {
  const startCoord = [-8.7486, 115.1672]; // Bandara
  const restCoord = [-8.8000, 115.1700];  // Tempat wisata
  const hotelCoord = [-8.8200, 115.1800]; // Hotel

  if(mapInstance) { mapInstance.remove(); }

  mapInstance = L.map('map-container').setView(startCoord, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);

  L.marker(startCoord).addTo(mapInstance).bindPopup("<b>Bandara Ngurah Rai</b><br>Titik Awal");
  L.marker(restCoord).addTo(mapInstance).bindPopup("<b>Pantai Kuta</b><br>Destinasi 1");
  L.marker(hotelCoord).addTo(mapInstance).bindPopup("<b>Bali Beach Resort</b><br>Titik Akhir");

  const routeLine = L.polyline([startCoord, restCoord, hotelCoord], {
    color: '#facc15', weight: 5, opacity: 0.8, dashArray: '10, 10'
  }).addTo(mapInstance);

  mapInstance.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

  liveMarker = L.marker(startCoord, {
    icon: L.divIcon({
      className: 'custom-icon',
      html: '<div style="background:#ef4444;width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 10px #ef4444;"></div>',
      iconSize: [20, 20]
    })
  }).addTo(mapInstance).bindPopup("Anda di sini");

  window.routeCoordinates = [startCoord, restCoord, hotelCoord];
  window.routeIndex = 0;
}

// =========================================
// FUNGSI ANIMASI "LIVE JOURNEY"
// =========================================
function startLiveJourney() {
  if(!liveMarker) return;
  if(liveInterval) clearInterval(liveInterval);
  
  window.routeIndex = 0;
  liveMarker.setLatLng(window.routeCoordinates[0]);
  mapInstance.setView(window.routeCoordinates[0], 14);

  liveInterval = setInterval(() => {
    window.routeIndex++;
    if(window.routeIndex < window.routeCoordinates.length) {
      const nextCoord = window.routeCoordinates[window.routeIndex];
      liveMarker.setLatLng(nextCoord);
      mapInstance.panTo(nextCoord);
    } else {
      clearInterval(liveInterval);
      liveInterval = null;
      alert("🎉 Perjalanan Selesai! Anda telah tiba di Hotel.");
    }
  }, 3000);
}

// =========================================
// FUNGSI SIMULASI DATA GLOBAL (KULINER & EVENT)
// =========================================
function showGlobalCulinary() {
  // Hapus marker kuliner sebelumnya
  culinaryMarkers.forEach(m => mapInstance.removeLayer(m));
  culinaryMarkers = [];

  // Data Simulasi (Nanti bisa diganti dengan API Foursquare)
  const mockCulinary = [
    { name: "Warung Babi Guling Ibu Oka", lat: -8.7500, lng: 115.1600, rating: "4.8" },
    { name: "Jimbaran Seafood Club", lat: -8.7900, lng: 115.1650, rating: "4.9" },
    { name: "Potato Head Beach Club", lat: -8.8100, lng: 115.1750, rating: "4.7" }
  ];

  mockCulinary.forEach(place => {
    const marker = L.marker([place.lat, place.lng], {
      icon: L.divIcon({
        className: 'food-icon',
        html: '<div style="background:#f59e0b;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.3)">🍽️</div>',
        iconSize: [30, 30]
      })
    }).addTo(mapInstance).bindPopup(`<b>${place.name}</b><br>⭐ ${place.rating} (Global Data)`);
    
    culinaryMarkers.push(marker);
  });
  
  alert("Menampilkan Spot Kuliner Global (Simulasi)!");
}

function showGlobalEvents() {
  // Hapus marker event sebelumnya
  eventMarkers.forEach(m => mapInstance.removeLayer(m));
  eventMarkers = [];

  // Data Simulasi (Nanti bisa diganti dengan API Ticketmaster)
  const mockEvents = [
    { name: "Bali Jazz Festival 2026", lat: -8.8200, lng: 115.1900 },
    { name: "Sunset DJ Party at Rock Bar", lat: -8.7950, lng: 115.1550 }
  ];

  mockEvents.forEach(ev => {
    const marker = L.marker([ev.lat, ev.lng], {
      icon: L.divIcon({
        className: 'event-icon',
        html: '<div style="background:#8b5cf6;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.3)">🎵</div>',
        iconSize: [30, 30]
      })
    }).addTo(mapInstance).bindPopup(`<b>${ev.name}</b><br>Live Event (Global Data)`);
    
    eventMarkers.push(marker);
  });
  
  alert("Menampilkan Live Events Global (Simulasi)!");
}

// =========================================
// SISA LOGIKA MARKETPLACE & BOOKING
// =========================================
function renderMarket(){
  const type = document.getElementById("marketType").value;
  const list = products.filter(p => (type==="All" || p.type===type));
  
  document.getElementById("marketGrid").innerHTML = list.map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <span style="font-size:10px;background:var(--gold);color:#000;padding:2px 8px;border-radius:10px;font-weight:800">${p.type}</span>
        <h4 style="margin-top:5px;color:#fff">${p.name}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px"><i class="fa-solid fa-location-dot"></i> ${p.place}</p>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="color:var(--gold);font-weight:700">${money(p.price)}</span>
          <button class="btn-gold" style="padding:5px 10px;font-size:12px;margin:0;">Tambah</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addProduct(id){
  const p = products.find(x=>x.id===id);
  cart.push({...p}); saveCart();
  alert(p.name + " ditambahkan ke keranjang!");
}

function renderBooking(){
  const container = document.getElementById("bookingContent");
  if(!cart.length) { container.innerHTML = "<p>Keranjang kosong.</p>"; return; }
  const total = cart.reduce((s,p)=>s+p.price,0);
  container.innerHTML = `
    <div style="background:var(--bg-card);padding:20px;border-radius:16px;">
      ${cart.map(p=>`<div style="display:flex;justify-content:space-between;margin-bottom:10px;color:#fff"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join("")}
      <hr style="border-color:var(--border-color);margin:15px 0">
      <div style="display:flex;justify-content:space-between;font-size:20px;font-weight:800;color:var(--gold)"><span>Total</span><span>${money(total)}</span></div>
      <button class="btn-gold full-width" style="margin-top:20px" onclick="checkout()">Bayar Sekarang</button>
    </div>
  `;
}

function checkout(){
  const total = cart.reduce((s,p)=>s+p.price,0);
  const trxId = "HBG-" + Date.now().toString().slice(-6);
  transactions.unshift({ id: trxId, date: new Date().toLocaleString(), total: total, status: "Paid" });
  localStorage.setItem("hobbigoTransactions", JSON.stringify(transactions));
  cart = []; saveCart();
  showModal(`<h2 style="color:var(--gold)">Pembayaran Sukses ✓</h2><p>ID Transaksi: ${trxId}</p><p>Total: ${money(total)}</p>`);
  showPage('transactions');
}

function renderTransactions(){
  document.getElementById("transactionsContent").innerHTML = transactions.map(t=>`
    <div style="background:var(--bg-card);padding:15px;margin-bottom:10px;border-radius:10px;display:flex;justify-content:space-between;">
      <div><b style="color:#fff">${t.id}</b><br><small style="color:var(--text-muted)">${t.date}</small></div>
      <div style="text-align:right"><b style="color:var(--gold)">${money(t.total)}</b><br><small style="color:#10b981">LUNAS</small></div>
    </div>
  `).join("");
}

function showModal(html){ document.getElementById("modalContent").innerHTML = html; document.getElementById("modal").classList.add("show"); }
function closeModal(){ document.getElementById("modal").classList.remove("show"); }

document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("date")) document.getElementById("date").value = new Date().toISOString().slice(0,10);
  saveCart();
  renderMarket();
});
