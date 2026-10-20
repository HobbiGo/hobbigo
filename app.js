// =========================================
// FILE JAVASCRIPT HOBIGO (VERSI AMAN)
// =========================================

const products = [
  {id:1, type:"Hotel", name:"Bali Beach Resort", place:"Kuta, Bali", price:850000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"},
  {id:2, type:"Hotel", name:"Ubud Private Villa", place:"Ubud, Bali", price:1500000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400"}
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

function generateTrip(){
  const dest = document.getElementById("dest").value || "Bali";
  document.getElementById("tripResult").innerHTML = `<p style="text-align:center; color:var(--gold);"><i class="fa-solid fa-spinner fa-spin"></i> AI merancang rute...</p>`;
  
  setTimeout(() => {
    // Render HTML Peta
    document.getElementById("tripResult").innerHTML = `
      <div class="map-card">
        <h3 style="color:var(--gold);margin-bottom:15px"><i class="fa-solid fa-route"></i> Smart Route & Global Discovery</h3>
        <div id="map-container" style="height:400px; border-radius:15px; margin-bottom:15px; background:#1e293b;"></div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:15px;">
          <button class="btn-outline" onclick="showGlobalCulinary()"><i class="fa-solid fa-utensils"></i> Kuliner</button>
          <button class="btn-outline" onclick="showGlobalEvents()"><i class="fa-solid fa-music"></i> Live Events</button>
          <button class="live-tracking-btn" style="margin-top:0" onclick="startLiveJourney()"><i class="fa-solid fa-location-crosshairs"></i> Mulai Perjalanan</button>
        </div>
      </div>
    `;
    
    // Beri jeda 0.1 detik agar DIV map siap sebelum Leaflet dijalankan
    setTimeout(() => {
      initMap();
    }, 100);
  }, 1000); 
}

function initMap() {
  try {
    // Cek apakah Leaflet sudah ter-load dari index.html
    if (typeof L === 'undefined') {
      document.getElementById('map-container').innerHTML = '<p style="color:red;padding:20px;">Error: Library Peta (Leaflet) belum termuat di index.html.</p>';
      return;
    }

    const startCoord = [-8.7486, 115.1672]; 
    const restCoord = [-8.8000, 115.1700];  
    const hotelCoord = [-8.8200, 115.1800]; 

    if(mapInstance) { mapInstance.remove(); }

    mapInstance = L.map('map-container').setView(startCoord, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(mapInstance);

    L.marker(startCoord).addTo(mapInstance).bindPopup("<b>Bandara</b>");
    L.marker(restCoord).addTo(mapInstance).bindPopup("<b>Pantai Kuta</b>");
    L.marker(hotelCoord).addTo(mapInstance).bindPopup("<b>Hotel</b>");

    const routeLine = L.polyline([startCoord, restCoord, hotelCoord], {
      color: '#facc15', weight: 5, opacity: 0.8, dashArray: '10, 10'
    }).addTo(mapInstance);

    mapInstance.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    liveMarker = L.marker(startCoord).addTo(mapInstance).bindPopup("Anda di sini");
    window.routeCoordinates = [startCoord, restCoord, hotelCoord];
    window.routeIndex = 0;

  } catch (error) {
    console.error("Peta Error:", error);
    document.getElementById('map-container').innerHTML = `<p style="color:red;padding:20px;">Gagal memuat peta: ${error.message}</p>`;
  }
}

function startLiveJourney() {
  if(!liveMarker || !mapInstance) return;
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
      alert("🎉 Perjalanan Selesai!");
    }
  }, 3000);
}

function showGlobalCulinary() {
  if(!mapInstance) return;
  culinaryMarkers.forEach(m => mapInstance.removeLayer(m));
  culinaryMarkers = [];

  const mockCulinary = [
    { name: "Warung Babi Guling", lat: -8.7500, lng: 115.1600 },
    { name: "Jimbaran Seafood", lat: -8.7900, lng: 115.1650 }
  ];

  mockCulinary.forEach(place => {
    const marker = L.marker([place.lat, place.lng]).addTo(mapInstance).bindPopup(`<b>🍽️ ${place.name}</b>`);
    culinaryMarkers.push(marker);
  });
}

function showGlobalEvents() {
  if(!mapInstance) return;
  eventMarkers.forEach(m => mapInstance.removeLayer(m));
  eventMarkers = [];

  const mockEvents = [
    { name: "Bali Jazz Festival", lat: -8.8200, lng: 115.1900 }
  ];

  mockEvents.forEach(ev => {
    const marker = L.marker([ev.lat, ev.lng]).addTo(mapInstance).bindPopup(`<b>🎵 ${ev.name}</b>`);
    eventMarkers.push(marker);
  });
}

function renderMarket(){
  const type = document.getElementById("marketType").value;
  const list = products.filter(p => (type==="All" || p.type===type));
  document.getElementById("marketGrid").innerHTML = list.map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <h4 style="margin-top:5px;color:#fff">${p.name}</h4>
        <span style="color:var(--gold);font-weight:700">${money(p.price)}</span>
      </div>
    </div>
  `).join("");
}

function addProduct(id){
  const p = products.find(x=>x.id===id);
  if(p) { cart.push({...p}); saveCart(); alert(p.name + " ditambahkan!"); }
}

function renderBooking(){
  const container = document.getElementById("bookingContent");
  if(!cart.length) { container.innerHTML = "<p>Keranjang kosong.</p>"; return; }
  container.innerHTML = `<div style="background:var(--bg-card);padding:20px;border-radius:16px;">
      ${cart.map(p=>`<div style="display:flex;justify-content:space-between;margin-bottom:10px;color:#fff"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join("")}
      <button class="btn-gold full-width" style="margin-top:20px" onclick="checkout()">Bayar</button>
    </div>`;
}

function checkout(){
  const total = cart.reduce((s,p)=>s+p.price,0);
  transactions.unshift({ id: "HBG-"+Date.now().toString().slice(-6), date: new Date().toLocaleString(), total: total });
  localStorage.setItem("hobbigoTransactions", JSON.stringify(transactions));
  cart = []; saveCart();
  showPage('transactions');
}

function renderTransactions(){
  document.getElementById("transactionsContent").innerHTML = transactions.map(t=>`
    <div style="background:var(--bg-card);padding:15px;margin-bottom:10px;border-radius:10px;display:flex;justify-content:space-between;">
      <div><b>${t.id}</b><br><small>${t.date}</small></div>
      <div style="text-align:right"><b style="color:var(--gold)">${money(t.total)}</b></div>
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
