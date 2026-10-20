// =========================================
// DATA PRODUK (SMART MOCK DATA - REALISTIS)
// =========================================
const products = [
  // HOTELS (Nama Asli & Harga Pasar)
  {id:1, type:"Hotel", name:"Ayana Resort and Spa", place:"Jimbaran, Bali", price:3200000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"12.4K", featured:true, badge:"Best Seller", discount:15},
  {id:2, type:"Hotel", name:"Potato Head Suites", place:"Seminyak, Bali", price:2800000, img:"https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"8.2K", featured:true, badge:"Eco-Friendly", discount:0},
  {id:3, type:"Hotel", name:"W Bali - Seminyak", place:"Seminyak, Bali", price:4500000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"5.1K", featured:false, badge:"Luxury", discount:10},
  {id:4, type:"Hotel", name:"Padma Resort Ubud", place:"Ubud, Bali", price:2100000, img:"https://images.pexels.com/photos/241784/pexels-photo-241784.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"9.3K", featured:true, badge:"Sisa 2 Kamar", discount:0},
  
  // FLIGHTS (Maskapai Asli)
  {id:5, type:"Flight", name:"Garuda Indonesia (CGK-DPS)", place:"Jakarta - Bali", price:1850000, img:"https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"15K", featured:true, badge:"Full Service", discount:0},
  {id:6, type:"Flight", name:"Citilink (CGK-DPS)", place:"Jakarta - Bali", price:950000, img:"https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.5, reviews:"22K", featured:false, badge:"Low Cost", discount:20},
  {id:7, type:"Flight", name:"AirAsia (DPS-SIN)", place:"Bali - Singapore", price:1400000, img:"https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.4, reviews:"18K", featured:false, badge:"Direct Flight", discount:0},
  
  // TRANSPORT
  {id:8, type:"Transport", name:"Toyota Alphard (With Driver)", place:"Bali", price:1500000, img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"2.1K", featured:true, badge:"Premium", discount:0},
  {id:9, type:"Transport", name:"Toyota Avanza (7 Seater)", place:"Bali", price:450000, img:"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7, reviews:"5.4K", featured:false, badge:"Best Value", discount:0},
  
  // RESTAURANTS & ATTRACTIONS
  {id:10, type:"Restaurant", name:"Jimbaran Bay Seafood", place:"Jimbaran, Bali", price:350000, img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"6.2K", featured:true, badge:"Romantic Dinner", discount:0},
  {id:11, type:"Attraction", name:"Uluwatu Temple Sunset", place:"Uluwatu, Bali", price:150000, img:"https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"25K", featured:false, badge:"Must Visit", discount:0},
  {id:12, type:"Activity", name:"Nusa Penida Day Tour", place:"Sanur, Bali", price:850000, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"11K", featured:true, badge:"Best Seller", discount:10}
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
        ${p.badge ? `<span class="badge-live">${p.badge}</span>` : ''}
      </div>
      <div class="prod-info">
        <h4>${p.name}</h4>
        <div class="prod-loc"><i class="fa-solid fa-location-dot"></i> ${p.place}</div>
        <div class="prod-rating"><i class="fa-solid fa-star"></i> ${p.rating} <span>(${p.reviews} reviews)</span></div>
        <div class="prod-bottom">
          <div>
            ${p.discount ? `<span style="font-size:10px;text-decoration:line-through;color:#94a3b8;display:block">${money(p.price)}</span>` : ''}
            <div class="prod-price">${money(p.price - (p.price * (p.discount/100)))}</div>
          </div>
          <button class="btn-book">Book Now</button>
        </div>
      </div>
    </div>
  `).join("");
}

function renderMarket(){
  const q = (document.getElementById("marketSearch").value||"").toLowerCase();
  const type = document.getElementById("marketType").value;
  
  // Efek Loading Simulasi
  document.getElementById("marketGrid").innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:50px;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color:#2563eb"></i><p style="margin-top:10px;color:#64748b">Mencari data real-time...</p></div>';
  
  setTimeout(() => {
    const list = products.filter(p => (type==="All" || p.type===type) && (p.name+" "+p.place).toLowerCase().includes(q));
    
    document.getElementById("marketGrid").innerHTML = list.map(p=>`
      <div class="card-prod" onclick="addProduct(${p.id})">
        <div class="prod-img" style="background-image:url('${p.img}')">
          <span class="badge-sponsor" style="background:#2563eb">${p.type}</span>
          ${p.badge ? `<span class="badge-live">${p.badge}</span>` : ''}
        </div>
        <div class="prod-info">
          <h4>${p.name}</h4>
          <div class="prod-loc"><i class="fa-solid fa-location-dot"></i> ${p.place}</div>
          <div class="prod-rating"><i class="fa-solid fa-star"></i> ${p.rating} <span>(${p.reviews})</span></div>
          <div class="prod-bottom">
            <div>
              ${p.discount ? `<span style="font-size:10px;text-decoration:line-through;color:#94a3b8;display:block">${money(p.price)}</span>` : ''}
              <div class="prod-price">${money(p.price - (p.price * (p.discount/100)))}</div>
            </div>
            <button class="btn-book">Add</button>
          </div>
        </div>
      </div>
    `).join("") || '<div style="text-align:center;padding:40px;color:#64748b;width:100%">Tidak ada produk yang cocok.</div>';
  }, 600); // Delay 0.6 detik agar terasa seperti mengambil data
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
  const total = cart.reduce((s,p)=>s+(p.price - (p.price * (p.discount ? p.discount/100 : 0))),0);
  container.innerHTML = `
    <div style="background:#fff;padding:25px;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,.05)">
      ${cart.map((p,i)=>{
        const finalPrice = p.price - (p.price * (p.discount ? p.discount/100 : 0));
        return `
        <div class="row">
          <div style="display:flex;gap:15px;align-items:center">
            <img src="${p.img}" style="width:60px;height:60px;border-radius:8px;object-fit:cover">
            <div><strong>${p.name}</strong><br><span style="font-size:12px;color:#64748b">${p.type}</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:15px">
            <strong>${money(finalPrice)}</strong>
            <button class="btn-book" style="background:#fee2e2;color:#ef4444" onclick="removeItem(${i})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
      }).join("")}
      <div class="row" style="border-top:2px solid #e2e8f0;padding-top:20px;margin-top:10px">
        <strong style="font-size:18px">Total</strong>
        <strong style="font-size:22px;color:#2563eb">${money(total)}</strong>
      </div>
      <button class="btn btn-green" style="margin-top:15px" onclick="checkout()">Book This Trip</button>
    </div>
  `;
}

function removeItem(i){ cart.splice(i,1); saveCart(); renderBooking(); }

// Fungsi lain (generateTrip, buildEvent, checkout, chatbot) tetap sama...
function generateTrip(){ const dest = document.getElementById("dest").value; const people = Number(document.getElementById("people").value||1); const days = Number(document.getElementById("days").value); const style = document.getElementById("style").value; const total = (style==="Economy"?650000:style==="Exclusive"?1600000:950000) * people * days; document.getElementById("tripResult").innerHTML = `<div style="background:#fff;padding:25px;border-radius:16px;box-shadow:0 4px 15px rgba(0,0,0,.05)"><h2>${dest} — ${days} Days</h2><p style="color:#64748b;margin-bottom:20px">${people} traveler(s) • ${style}</p><div style="background:#f4f7fb;padding:15px;border-radius:10px;margin-bottom:20px;text-align:center"><div style="font-size:12px;color:#64748b">Estimated Cost</div><div style="font-size:24px;font-weight:800;color:#2563eb">${money(total)}</div></div><button class="btn" onclick="addAIPlanToCart(${total}, '${dest}')">+ Add Plan to Cart</button></div>`; }
function addAIPlanToCart(total, dest){ cart.push({ id:Date.now(), type:"AI Package", name:`AI Trip (${dest})`, place:"Custom", price:total, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=200" }); saveCart(); showModal(`<h2>Plan Added ✓</h2><button class="btn" onclick="closeModal();showPage('booking')">View Booking</button>`); }
function buildEvent(){ const type = document.getElementById("eventType").value; const loc = document.getElementById("eventLocation").value; const n = Number(document.getElementById("participants").value||1); const days = Number(document.getElementById("eventDays").value); const cost = n * 450000 * days; document.getElementById("eventResult").innerHTML = `<div style="background:#fff;padding:25px;border-radius:16px;"><h2>${type} — ${loc}</h2><div class="row"><span>Cost</span><strong>${money(cost)}</strong></div></div>`; }
function checkout(){ const total = cart.reduce((s,p)=>s+(p.price - (p.price * (p.discount ? p.discount/100 : 0))),0); showModal(`<h2>Booking Created ✓</h2><p>Total: <b>${money(total)}</b></p><button class="btn" onclick="closeModal();cart=[];saveCart();showPage('home')">Finish</button>`); }
function showModal(html){ document.getElementById("modalContent").innerHTML = html; document.getElementById("modal").classList.add("show"); }
function closeModal(){ document.getElementById("modal").classList.remove("show"); }
function toggleChat() { document.getElementById('chatWindow').classList.toggle('show'); }
function sendChat() { const input = document.getElementById('chatInput'); const body = document.querySelector('.chat-body'); if(!input.value.trim()) return; body.innerHTML += `<div class="chat-msg user">${input.value}</div>`; input.value = ''; setTimeout(() => { body.innerHTML += `<div class="chat-msg bot">I can help you! Click "AI Trip" to generate an itinerary.</div>`; body.scrollTop = body.scrollHeight; }, 1000); }

document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("date")) document.getElementById("date").value = new Date().toISOString().slice(0,10);
  saveCart(); renderHome(); renderMarket();
});
