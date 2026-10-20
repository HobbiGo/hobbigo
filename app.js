// =========================================
// FILE JAVASCRIPT HOBIGO (DATA LENGKAP + MAP)
// =========================================

// DATA PRODUK LENGKAP (Hotels, Flights, Transport, Resto, Wisata)
const products = [
  {id:1, type:"Hotel", name:"Bali Beach Resort", place:"Kuta, Bali", price:850000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  {id:2, type:"Hotel", name:"Ubud Private Villa", place:"Ubud, Bali", price:1500000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9},
  {id:3, type:"Hotel", name:"Ayana Resort and Spa", place:"Jimbaran, Bali", price:3200000, img:"https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9},
  {id:4, type:"Hotel", name:"Padma Resort Ubud", place:"Ubud, Bali", price:2100000, img:"https://images.pexels.com/photos/241784/pexels-photo-241784.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  
  {id:5, type:"Flight", name:"Garuda Indonesia (CGK-DPS)", place:"Jakarta - Bali", price:1800000, img:"https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.6},
  {id:6, type:"Flight", name:"Citilink (CGK-DPS)", place:"Jakarta - Bali", price:950000, img:"https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.5},
  {id:7, type:"Flight", name:"AirAsia (DPS-SIN)", place:"Bali - Singapore", price:1400000, img:"https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.4},
  
  {id:8, type:"Transport", name:"Toyota Alphard (Driver)", place:"Bali", price:1200000, img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  {id:9, type:"Transport", name:"Toyota Avanza (7 Seat)", place:"Bali", price:450000, img:"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7},
  
  {id:10, type:"Restaurant", name:"Jimbaran Bay Seafood", place:"Jimbaran, Bali", price:350000, img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  {id:11, type:"Restaurant", name:"Local Bali Kitchen", place:"Canggu, Bali", price:150000, img:"https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7},
  
  {id:12, type:"Attraction", name:"Uluwatu Temple Sunset", place:"Uluwatu, Bali", price:150000, img:"https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9},
  {id:13, type:"Activity", name:"Nusa Penida Day Tour", place:"Sanur, Bali", price:850000, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  {id:14, type:"Activity", name:"Ayung River Rafting", place:"Ubud, Bali", price:550000, img:"https://images.pexels.com/photos/1732281/pexels-photo-1732281.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8}
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

function renderMarket(){
  const type = document.getElementById("marketType").value;
  // Filter berdasarkan tipe, tapi pastikan huruf besar/kecilnya cocok
  const list = products.filter(p => (type==="All" || p.type.toLowerCase() === type.toLowerCase()));
  
  document.getElementById("marketGrid").innerHTML = list.map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <div style="position:relative">
        <img src="${p.img}" alt="${p.name}">
        <span style="position:absolute;top:10px;left:10px;background:var(--gold);color:#000;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:800">${p.type}</span>
      </div>
      <div class="info">
        <h4 style="margin-top:5px;color:#fff">${p.name}</h4>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px"><i class="fa-solid fa-location-dot"></i> ${p.place}</p>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:12px;color:var(--gold);margin-bottom:5px"><i class="fa-solid fa-star"></i> ${p.rating}</div>
            <span style="color:var(--gold);font-weight:800;font-size:16px">${money(p.price)}</span>
          </div>
          <button class="btn-gold" style="padding:6px 12px;font-size:12px;margin:0;">Tambah</button>
        </div>
      </div>
    </div>
  `).join("");
}

function addProduct(id){
  const p = products.find(x=>x.id===id);
  if(p) { 
    cart.push({...p}); 
    saveCart(); 
    alert(p.name + " berhasil ditambahkan ke keranjang!"); 
  }
}

function renderBooking(){
  const container = document.getElementById("bookingContent");
  if(!cart.length) { container.innerHTML = "<p style='color:var(--text-muted)'>Keranjang masih kosong.</p>"; return; }
  const total = cart.reduce((s,p)=>s+p.price,0);
  container.innerHTML = `
    <div style="background:var(--bg-card);padding:25px;border-radius:20px;border:1px solid var(--border-color)">
      ${cart.map((p,i)=>`
        <div style="display:flex;justify-content:space-between;margin-bottom:15px;color:#fff;border-bottom:1px solid var(--border-color);padding-bottom:10px">
          <div><b>${p.name}</b><br><small style="color:var(--text-muted)">${p.type}</small></div>
          <div style="display:flex;align-items:center;gap:15px">
            <b style="color:var(--gold)">${money(p.price)}</b>
            <button onclick="removeItem(${i})" style="background:transparent;border:none;color:#ef4444;cursor:pointer"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join("")}
      <div style="display:flex;justify-content:space-between;font-size:20px;font-weight:800;color:var(--gold);margin-top:20px"><span>Total</span><span>${money(total)}</span></div>
      <button class="btn-gold full-width" style="margin-top:20px" onclick="checkout()">Bayar Sekarang</button>
    </div>
  `;
}

function removeItem(i) { cart.splice(i,1); saveCart(); renderBooking(); }

function checkout(){
  if(!cart.length) return;
  const total = cart.reduce((s,p)=>s+p.price,0);
  const trxId = "HBG-" + Date.now().toString().slice(-6);
  transactions.unshift({ id: trxId, date: new Date().toLocaleString(), total: total, status: "Paid" });
  localStorage.setItem("hobbigoTransactions", JSON.stringify(transactions));
  cart = []; saveCart();
  alert(`Pembayaran Sukses! ID Transaksi: ${trxId}`);
  showPage('transactions');
}

function renderTransactions(){
  const container = document.getElementById("transactionsContent");
  if(!transactions.length) { container.innerHTML = "<p>Belum ada transaksi.</p>"; return; }
  
  container.innerHTML = transactions.map(t=>`
    <div style="background:var(--bg-card);padding:15px;margin-bottom:10px;border-radius:10px;display:flex;justify-content:space-between;border:1px solid var(--border-color)">
      <div><b style="color:#fff">${t.id}</b><br><small style="color:var(--text-muted)">${t.date}</small></div>
      <div style="text-align:right"><b style="color:var(--gold)">${money(t.total)}</b><br><small style="color:#10b981">LUNAS</small></div>
    </div>
  `).join("");
}

// =========================================
// SISTEM PETA & AI (TETAP AMAN)
// =========================================
function generateTrip(){
  const dest = document.getElementById("dest").value || "Bali";
  document.getElementById("tripResult").innerHTML = `<p style="text-align:center; color:var(--gold); margin-top:20px;"><i class="fa-solid fa-spinner fa-spin"></i> AI merancang rute...</p>`;
  
  setTimeout(() => {
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
    setTimeout(() => { initMap(); }, 100);
  }, 1000); 
}

function initMap() {
  try {
    if (typeof L === 'undefined') {
      document.getElementById('map-container').innerHTML = '<p style="color:red;padding:20px;">Error: Library Peta belum termuat.</p>';
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

// INIT
document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("date")) document.getElementById("date").value = new Date().toISOString().slice(0,10);
  saveCart();
  renderMarket();
});
