// =========================================
// FILE JAVASCRIPT HOBIGO
// =========================================
const products = [
  {id:1, type:"Hotel", name:"Bali Beach Resort", place:"Kuta, Bali", price:850000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"2.4K", featured:true},
  {id:2, type:"Hotel", name:"Ubud Private Villa", place:"Ubud, Bali", price:1500000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"1.2K", featured:false},
  {id:3, type:"Flight", name:"Jakarta - Bali (PP)", place:"CGK - DPS", price:1800000, img:"https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.6, reviews:"3.1K", featured:true},
  {id:4, type:"Transport", name:"Toyota Alphard Rental", place:"Bali, Indonesia", price:1200000, img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"856", featured:true},
  {id:5, type:"Activity", name:"Nusa Penida Boat Tour", place:"Sanur → Nusa Penida", price:2500000, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"746", featured:false},
  {id:6, type:"Restaurant", name:"Jimbaran Seafood Dinner", place:"Jimbaran, Bali", price:450000, img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7, reviews:"2.1K", featured:false},
  {id:7, type:"Attraction", name:"Uluwatu Sunset Tour", place:"Uluwatu, Bali", price:150000, img:"https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"1.1K", featured:false}
];

let cart = [];
try { cart = JSON.parse(localStorage.getItem("hobbigoCart")) || []; } catch(e) { cart = []; }

function money(n){ return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n); }
function saveCart(){ localStorage.setItem("hobbigoCart", JSON.stringify(cart)); document.getElementById("cartCount").textContent = cart.length; }

function showPage(id){
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id==="market") renderMarket();
  if(id==="booking") renderBooking();
  window.scrollTo({top:0,behavior:"smooth"});
}

function goToMarket(type) {
  showPage('market');
  document.getElementById('marketType').value = type;
  renderMarket();
}

function renderHome(){
  document.getElementById("homeProducts").innerHTML = products.slice(0, 4).map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <div class="prod-img" style="background-image:url('${p.img}')">
        ${p.featured ? '<span class="badge-featured">★ FEATURED</span>' : ''}
      </div>
      <div class="prod-info">
        <h4>${p.name}</h4>
        <div class="prod-loc"><i class="fa-solid fa-location-dot"></i> ${p.place}</div>
        <div class="prod-rating"><i class="fa-solid fa-star"></i> ${p.rating} <span>(${p.reviews})</span></div>
        <div class="prod-bottom">
          <div class="prod-price">${money(p.price)}</div>
          <button class="btn-book">Book Now</button>
        </div>
      </div>
    </div>
  `).join("");
}

function renderMarket(){
  const q = (document.getElementById("marketSearch").value||"").toLowerCase();
  const type = document.getElementById("marketType").value;
  const list = products.filter(p => (type==="All" || p.type===type) && (p.name+" "+p.place).toLowerCase().includes(q));
  
  document.getElementById("marketGrid").innerHTML = list.map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <div class="prod-img" style="background-image:url('${p.img}')">
        <span class="badge-sponsor" style="background:#2563eb">${p.type}</span>
      </div>
      <div class="prod-info">
        <h4>${p.name}</h4>
        <div class="prod-loc"><i class="fa-solid fa-location-dot"></i> ${p.place}</div>
        <div class="prod-rating"><i class="fa-solid fa-star"></i> ${p.rating} <span>(${p.reviews})</span></div>
        <div class="prod-bottom">
          <div class="prod-price">${money(p.price)}</div>
          <button class="btn-book">Add</button>
        </div>
      </div>
    </div>
  `).join("") || '<div style="text-align:center;padding:40px;color:#64748b;width:100%">No products found for this category.</div>';
}

function addProduct(id){
  const p = products.find(x=>x.id===id);
  if(cart.find(x=>x.id===id)) {
    showModal(`<h2>Already Added ✓</h2><p><b>${p.name}</b> is already in your cart.</p><button class="btn" onclick="closeModal();showPage('booking')">View Booking</button>`);
    return;
  }
  cart.push({...p}); saveCart();
  showModal(`<h2>Added to Trip ✓</h2><p><b>${p.name}</b> has been added to your package.</p><button class="btn" onclick="closeModal();showPage('booking')">View Booking</button>`);
}

function showCart(){ showPage("booking"); }

function renderBooking(){
  const container = document.getElementById("bookingContent");
  if(!cart.length){
    container.innerHTML = `<div style="text-align:center;padding:40px;background:#fff;border-radius:16px"><h3>Your package is empty</h3><p style="color:#64748b;margin-bottom:20px">Go to Marketplace and add items.</p><button class="btn" style="width:auto" onclick="showPage('market')">Explore Marketplace</button></div>`;
    return;
  }
  const total = cart.reduce((s,p)=>s+p.price,0);
  container.innerHTML = `
    <div style="background:#fff;padding:25px;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,.05)">
      ${cart.map((p,i)=>`
        <div class="row">
          <div style="display:flex;gap:15px;align-items:center">
            <img src="${p.img}" style="width:60px;height:60px;border-radius:8px;object-fit:cover" onerror="this.src='https://via.placeholder.com/60'">
            <div><strong>${p.name}</strong><br><span style="font-size:12px;color:#64748b">${p.type}</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:15px">
            <strong>${money(p.price)}</strong>
            <button class="btn-book" style="background:#fee2e2;color:#ef4444" onclick="removeItem(${i})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join("")}
      <div class="row" style="border-top:2px solid #e2e8f0;padding-top:20px;margin-top:10px">
        <strong style="font-size:18px">Total</strong>
        <strong style="font-size:22px;color:#2563eb">${money(total)}</strong>
      </div>
      <button class="btn btn-green" style="margin-top:15px" onclick="checkout()">Book This Trip</button>
    </div>
  `;
}

function removeItem(i){ cart.splice(i,1); saveCart(); renderBooking(); }

function generateTrip(){
  const dest = document.getElementById("dest").value || "Destination";
  const people = Math.max(1, Number(document.getElementById("people").value||1));
  const days = Number(document.getElementById("days").value);
  const style = document.getElementById("style").value;
  const interest = document.getElementById("interest").value;
  const total = (style==="Economy"?650000:style==="Exclusive"?1600000:950000) * people * days;

  document.getElementById("tripResult").innerHTML = `
    <div style="background:#fff;padding:25px;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,.05)">
      <span class="badge-sponsor" style="position:relative;top:0;left:0;display:inline-block;margin-bottom:10px">AI GENERATED</span>
      <h2 style="margin-bottom:5px">${dest} — ${days} Days</h2>
      <p style="color:#64748b;margin-bottom:20px">${people} traveler(s) • ${style} • ${interest}</p>
      <div class="timeline">
        <div><strong>Day 1 — Arrival</strong><br><span style="font-size:13px;color:#64748b">Hotel check-in → local culinary → free time</span></div>
        <div><strong>Day 2 — Explore</strong><br><span style="font-size:13px;color:#64748b">${interest} experience → lunch → sunset attraction</span></div>
        <div><strong>Day ${days} — Departure</strong><br><span style="font-size:13px;color:#64748b">Shopping → airport transfer</span></div>
      </div>
      <div style="background:#f4f7fb;padding:15px;border-radius:10px;margin-bottom:20px;text-align:center">
        <div style="font-size:12px;color:#64748b">Estimated Cost</div>
        <div style="font-size:24px;font-weight:800;color:#2563eb">${money(total)}</div>
      </div>
      <button class="btn" onclick="addAIPlanToCart(${total}, '${dest}')">+ Add Plan to Cart</button>
    </div>`;
}

function addAIPlanToCart(total, dest){
  cart.push({ id:Date.now(), type:"AI Package", name:`AI Trip (${dest})`, place:"Custom", price:total, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=200" });
  saveCart();
  showModal(`<h2>Plan Added ✓</h2><p>Your AI itinerary to <b>${dest}</b> has been added.</p><button class="btn" onclick="closeModal();showPage('booking')">View Booking</button>`);
}

function buildEvent(){
  const type = document.getElementById("eventType").value;
  const loc = document.getElementById("eventLocation").value;
  const n = Math.max(1, Number(document.getElementById("participants").value||1));
  const days = Number(document.getElementById("eventDays").value);
  const cost = n * 450000 * days;
  
  document.getElementById("eventResult").innerHTML = `
    <div style="background:#fff;padding:25px;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,.05)">
      <span class="badge-featured" style="position:relative;top:0;left:0;display:inline-block;margin-bottom:10px">CORPORATE PACKAGE</span>
      <h2 style="margin-bottom:15px">${type} — ${loc}</h2>
      <div class="row"><span>Participants</span><strong>${n} pax</strong></div>
      <div class="row"><span>Duration</span><strong>${days} Day(s)</strong></div>
      <div class="row"><span>Estimated Cost</span><strong style="color:#2563eb;font-size:20px">${money(cost)}</strong></div>
      <button class="btn btn-green" style="margin-top:15px" onclick="showModal('<h2>Request Sent ✓</h2><p>Our team will contact you shortly.</p>')">Request Package</button>
    </div>`;
}

function checkout(){
  const total = cart.reduce((s,p)=>s+p.price,0);
  showModal(`
    <h2 style="color:#10b981;margin-bottom:10px">Booking Created ✓</h2>
    <p style="color:#64748b;margin-bottom:15px">Your booking code is <b>HBG-${Date.now().toString().slice(-6)}</b></p>
    <div class="row"><span>Total Amount</span><strong style="color:#2563eb">${money(total)}</strong></div>
    <button class="btn" style="margin-top:15px" onclick="closeModal();cart=[];saveCart();showPage('home')">Finish</button>
  `);
}

function showModal(html){ document.getElementById("modalContent").innerHTML = html; document.getElementById("modal").classList.add("show"); }
function closeModal(){ document.getElementById("modal").classList.remove("show"); }

// INIT
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  if(dateInput) dateInput.value = new Date().toISOString().slice(0,10);
  saveCart();
  renderHome();
  renderMarket();
});
