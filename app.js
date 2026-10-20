// =========================================
// FILE JAVASCRIPT HOBIGO - TOOLS EDITION
// =========================================

const products = [
  {id:1, type:"Hotel", name:"Bali Beach Resort", place:"Kuta, Bali", price:850000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  {id:2, type:"Hotel", name:"Ubud Private Villa", place:"Ubud, Bali", price:1500000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9},
  {id:3, type:"Flight", name:"Garuda Indonesia", place:"CGK - DPS", price:1800000, img:"https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.6},
  {id:4, type:"Transport", name:"Toyota Alphard", place:"Bali", price:1200000, img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8},
  {id:5, type:"Restaurant", name:"Jimbaran Seafood", place:"Jimbaran, Bali", price:350000, img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7},
  {id:6, type:"Hotel", name:"Tokyo Grand Hotel", place:"Shinjuku, Tokyo", price:2500000, img:"https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9},
  {id:7, type:"Hotel", name:"Paris Luxury Suite", place:"Champs-Élysées, Paris", price:3800000, img:"https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7}
];

let cart = [];
let transactions = [];
let mapInstance = null; 
let liveMarker = null;
let liveInterval = null;

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
  const target = document.getElementById(id);
  if(target) target.classList.add("active");
  
  if(id==="market") renderMarket();
  if(id==="booking") renderBooking();
  if(id==="transactions") renderTransactions();
  
  window.scrollTo({top:0,behavior:"smooth"});
}

function goToMarket(type) {
  showPage('market');
  const select = document.getElementById('marketType');
  if(select) {
    select.value = type;
    renderMarket();
  }
}

function renderHome(){
  const container = document.getElementById("homeDestinations");
  if(!container) return;
  container.innerHTML = products.slice(0,4).map(p=>`
    <div class="dest-card" onclick="addProduct(${p.id})">
      <div class="dest-img" style="background-image:url('${p.img}')">
        <span class="badge-dest">${p.type}</span>
      </div>
      <div class="dest-info">
        <h4>${p.name}</h4>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-top:10px">
          <span><i class="fa-solid fa-star" style="color:var(--gold)"></i> ${p.rating}</span>
          <span>${money(p.price)}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function renderMarket(){
  const grid = document.getElementById("marketGrid");
  const type = document.getElementById("marketType").value;
  const sort = document.getElementById("marketSort").value;
  if(!grid) return;

  // 1. Filter
  let list = products.filter(p => (type==="All" || p.type===type));
  
  // 2. Sorting (Urutan)
  if(sort === "low") list.sort((a,b) => a.price - b.price);
  if(sort === "high") list.sort((a,b) => b.price - a.price);
  if(sort === "rating") list.sort((a,b) => b.rating - a.rating);

  if(list.length === 0) {
    grid.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  grid.innerHTML = list.map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <span style="font-size:10px;background:var(--gold);color:#000;padding:2px 8px;border-radius:10px;font-weight:800">${p.type}</span>
        <h4 style="margin-top:5px;">${p.name}</h4>
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
  if(p) { 
    cart.push({...p}); 
    saveCart(); 
    // Alert diganti dengan Chatbot notification
    alert(p.name + " ditambahkan ke keranjang!"); 
  }
}

function renderBooking(){
  const container = document.getElementById("bookingContent");
  if(!container) return;
  if(!cart.length) { container.innerHTML = "<p>Keranjang masih kosong.</p>"; return; }
  
  const total = cart.reduce((s,p)=>s+p.price,0);
  container.innerHTML = `
    <div style="background:var(--bg-card);padding:20px;border-radius:16px;border:1px solid var(--border-color)">
      ${cart.map((p,i)=>`
        <div style="display:flex;justify-content:space-between;margin-bottom:10px;color:#fff;border-bottom:1px solid var(--border-color);padding-bottom:10px">
          <div><b>${p.name}</b></div>
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
  if(!container) return;
  if(!transactions.length) { container.innerHTML = "<p>Belum ada transaksi.</p>"; return; }
  
  container.innerHTML = transactions.map(t=>`
    <div style="background:var(--bg-card);padding:15px;margin-bottom:10px;border-radius:10px;display:flex;justify-content:space-between;border:1px solid var(--border-color)">
      <div><b style="color:#fff">${t.id}</b><br><small style="color:var(--text-muted)">${t.date}</small></div>
      <div style="text-align:right"><b style="color:var(--gold)">${money(t.total)}</b><br><small style="color:#10b981">LUNAS</small></div>
    </div>
  `).join("");
}

// MAPS AI PLANNER
function generateTrip(){
  const container = document.getElementById("tripResult");
  if(!container) return;
  container.innerHTML = `<p style="text-align:center; color:var(--gold);"><i class="fa-solid fa-spinner fa-spin"></i> AI merancang rute...</p>`;
  
  setTimeout(() => {
    container.innerHTML = `
      <div class="map-card">
        <h3 style="color:var(--gold);margin-bottom:10px"><i class="fa-solid fa-route"></i> Smart Route</h3>
        <div id="map-container"></div>
        <button class="live-tracking-btn" onclick="startLiveJourney()"><i class="fa-solid fa-location-crosshairs"></i> Mulai Simulasi Perjalanan</button>
      </div>
    `;
    setTimeout(initMap, 100);
  }, 1000); 
}

function initMap() {
  try {
    if (typeof L === 'undefined') {
      document.getElementById('map-container').innerHTML = '<p style="color:red;padding:20px;">Gagal memuat peta.</p>';
      return;
    }
    const startCoord = [-8.7486, 115.1672]; 
    const hotelCoord = [-8.8200, 115.1800]; 

    if(mapInstance) { mapInstance.remove(); }
    mapInstance = L.map('map-container').setView(startCoord, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    L.marker(startCoord).addTo(mapInstance).bindPopup("<b>Bandara</b>");
    L.marker(hotelCoord).addTo(mapInstance).bindPopup("<b>Hotel</b>");

    const routeLine = L.polyline([startCoord, hotelCoord], {color: '#facc15', weight: 5, dashArray: '10, 10'}).addTo(mapInstance);
    mapInstance.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    liveMarker = L.marker(startCoord).addTo(mapInstance).bindPopup("Anda di sini");
    window.routeCoordinates = [startCoord, hotelCoord];
    window.routeIndex = 0;
  } catch (error) { console.log(error); }
}

function startLiveJourney() {
  if(!liveMarker || !mapInstance) return;
  if(liveInterval) clearInterval(liveInterval);
  
  window.routeIndex = 0;
  liveMarker.setLatLng(window.routeCoordinates[0]);
  
  liveInterval = setInterval(() => {
    window.routeIndex++;
    if(window.routeIndex < window.routeCoordinates.length) {
      liveMarker.setLatLng(window.routeCoordinates[window.routeIndex]);
      mapInstance.panTo(window.routeCoordinates[window.routeIndex]);
    } else {
      clearInterval(liveInterval);
      liveInterval = null;
      alert("🎉 Anda tiba di Hotel!");
    }
  }, 3000);
}

// CHATBOT AI
function toggleChat() { document.getElementById('chatWindow').classList.toggle('show'); }
function sendChat() { 
  const input = document.getElementById('chatInput'); 
  const body = document.getElementById('chatBody'); 
  if(!input.value.trim()) return; 
  
  body.innerHTML += `<div class="chat-msg user">${input.value}</div>`; 
  input.value = ''; 
  body.scrollTop = body.scrollHeight;
  
  setTimeout(() => { 
    body.innerHTML += `<div class="chat-msg bot">Baik, saya mengerti. Untuk destinasi tersebut, saya merekomendasikan Anda mencoba fitur <b>AI Planner</b> atau melihat paket di <b>Marketplace</b> kami.</div>`; 
    body.scrollTop = body.scrollHeight; 
  }, 1000); 
}

document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("date")) document.getElementById("date").value = new Date().toISOString().slice(0,10);
  saveCart();
  renderHome();
  renderMarket();
});
