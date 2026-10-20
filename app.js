const products=[
["P01","Bali Beach Resort","Hotels","Bali",850000,"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
["P02","Ubud Jungle Resort","Hotels","Bali",1250000,"https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800&q=80"],
["P03","Seminyak Luxury Hotel","Hotels","Bali",1750000,"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
["P04","Jakarta City Hotel","Hotels","Jakarta",650000,"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"],
["P05","Ubud Private Villa","Villas","Bali",2200000,"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"],
["P07","Flight Jakarta → Bali","Flights","Indonesia",950000,"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"],
["P08","Flight Jakarta → Singapore","Flights","Singapore",1350000,"https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80"],
["P09","Toyota Alphard Rental","Cars","Bali",2500000,"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"],
["P15","Bali Waterpark Ticket","Tickets","Bali",350000,"https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=800&q=80"],
["P20","Jimbaran Seafood Dinner","Restaurant","Bali",550000,"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"]
];

const cats=["All","Hotels","Villas","Flights","Cars","Tickets","Restaurant"];
let activeCat="All";
let cart=JSON.parse(localStorage.getItem("hbg_cart")||"[]");
let bookings=JSON.parse(localStorage.getItem("hbg_bookings")||"[]");
let bookingStep=1;
let customer={};
let mapInstance=null;

function money(n){return "Rp "+Number(n||0).toLocaleString("id-ID");}
function save(){localStorage.setItem("hbg_cart",JSON.stringify(cart));localStorage.setItem("hbg_bookings",JSON.stringify(bookings));}
function go(id){document.getElementById(id).scrollIntoView({behavior:"smooth"});}
function toast(text){const t=document.getElementById("toast");t.textContent=text;t.style.display="block";setTimeout(()=>{t.style.display="none";},2200);}

// === FUNGSI BARU: SWITCH TAB PENCARIAN ===
function switchSearchTab(btn, type) {
  document.querySelectorAll("#search-hub .tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("form-hotel").style.display = "none";
  document.getElementById("form-flight").style.display = "none";
  document.getElementById("form-"+type).style.display = "grid";
  document.getElementById("search-results").style.display = "none";
}

// === FUNGSI BARU: EKSEKUSI PENCARIAN ===
function executeNewSearch(type) {
  const resDiv = document.getElementById("search-results");
  const listDiv = document.getElementById("res-list");
  const title = document.getElementById("res-title");
  
  resDiv.style.display = "block";
  
  if (type === 'hotel') {
    title.innerText = "Menampilkan Hotel di Jakarta";
    listDiv.innerHTML = products.filter(p=>p[2]==="Hotels").map(p=>`
      <div class="card">
        <div class="cardImage" style="background-image:url('${p[5]}')"><span class="tag">${p[2]}</span></div>
        <div class="cardBody">
          <h3>${p[1]}</h3><div class="price">${money(p[4])}</div>
          <div class="cardActions"><button class="small" onclick="add('${p[0]}')">+ Add</button></div>
        </div>
      </div>
    `).join("");
  } else {
    title.innerText = "Menampilkan Penerbangan (CGK - DPS)";
    listDiv.innerHTML = products.filter(p=>p[2]==="Flights").map(p=>`
      <div class="card">
        <div class="cardImage" style="background-image:url('${p[5]}')"><span class="tag">${p[2]}</span></div>
        <div class="cardBody">
          <h3>${p[1]}</h3><div class="price">${money(p[4])}</div>
          <div class="cardActions"><button class="small" onclick="add('${p[0]}')">+ Add</button></div>
        </div>
      </div>
    `).join("");
  }
}

// === FUNGSI MARKETPLACE (V75) ===
function renderChips(){document.getElementById("chips").innerHTML=cats.map(c=>`<button class="chip ${activeCat===c?"active":""}" onclick="setCat('${c}')">${c}</button>`).join("");}
function setCat(c){activeCat=c;renderChips();renderProducts();}
function renderProducts(){
  let q=(document.getElementById("marketSearch").value||"").toLowerCase();
  let arr=products.filter(p=>(activeCat==="All"||p[2]===activeCat)&&p.join(" ").toLowerCase().includes(q));
  let sort=document.getElementById("sort").value;
  if(sort==="low")arr.sort((a,b)=>+a[4]-+b[4]);
  if(sort==="high")arr.sort((a,b)=>+b[4]-+a[4]);
  document.getElementById("products").innerHTML=arr.map(p=>`
    <div class="card">
      <div class="cardImage" style="background-image:url('${p[5]}')"><span class="tag">${p[2]}</span></div>
      <div class="cardBody"><h3>${p[1]}</h3><div class="price">${money(p[4])}</div>
      <div class="cardActions"><button class="small" onclick="add('${p[0]}')">+ Add</button></div></div>
    </div>
  `).join("")||"<p>No product found.</p>";
  updateCart();
}

// === FUNGSI AI & PETA (YANG BARU) ===
function generateTrip(){
  let d=document.getElementById("dest").value||"Bali";
  let p=+document.getElementById("people").value||1;
  let estimate=1800000*p;
  
  document.getElementById("tripResult").innerHTML=`
    <div class="result">
      <h3>✨ AI Recommended Trip: ${d}</h3>
      <p>Estimasi Budget: <b class="price">${money(estimate)}</b></p>
      <button class="primary" onclick="aiAdd()">Add AI Package to Cart</button>
    </div>
  `;
  
  // Tampilkan Peta
  document.getElementById("map").style.display = "block";
  setTimeout(()=>{
    if(mapInstance){mapInstance.remove();}
    mapInstance = L.map('map').setView([-8.7486, 115.1672], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    L.marker([-8.7486, 115.1672]).addTo(mapInstance).bindPopup("<b>Bandara</b>");
    L.marker([-8.8000, 115.1700]).addTo(mapInstance).bindPopup("<b>Pantai Kuta</b>");
    L.polyline([[-8.7486, 115.1672], [-8.8000, 115.1700]], {color: '#087f5b', weight: 5, dashArray: '10, 10'}).addTo(mapInstance);
  }, 100);
}

function aiAdd(){
  ["P01","P07","P20"].forEach(id=>{if(!cart.find(x=>x.id===id))cart.push({id:id,qty:1});});
  save();updateCart();toast("AI package added");
}

// === FUNGSI CART (V75) ===
function add(id){
  let item=cart.find(x=>x.id===id);
  if(item)item.qty++;else cart.push({id:id,qty:1});
  save();updateCart();toast("Added to My Cart");
}
function updateCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("pkgItems").textContent=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("pkgTotal").textContent=money(cart.reduce((s,i)=>s+(+products.find(x=>x[0]===i.id)[4]*i.qty),0));
  document.getElementById("pkgFinal").textContent=money(cart.reduce((s,i)=>s+(+products.find(x=>x[0]===i.id)[4]*i.qty),0)*1.05);
}
function openCart(){
  let list=cart.map(item=>{let p=products.find(x=>x[0]===item.id);return `<div class="summaryItem"><span><b>${p[1]}</b></span><span>${money(p[4]*item.qty)}</span></div>`;}).join("");
  openModal(`<button class="close" onclick="closeModal()">×</button><h2>🛒 My Cart</h2>${list||"<p>Empty</p>"}<button class="primary" onclick="closeModal()">Close</button>`);
}

// === FUNGSI MODAL & ACCOUNT (V75) ===
function openModal(html){document.getElementById("modalBox").innerHTML=html;document.getElementById("modal").classList.add("show");}
function closeModal(){document.getElementById("modal").classList.remove("show");}
function renderAccount(){document.getElementById("accountContent").innerHTML=bookings.length?bookings.map(b=>`<div class="card" style="padding:18px"><b>${b.no}</b> - ${money(b.total)}</div>`).join(""):`<div class="notice">No trips yet.</div>`;}

// === FUNGSI INITIALIZE ===
document.getElementById("date").value=new Date().toISOString().slice(0,10);
renderChips();
renderProducts();
renderAccount();
updateCart();
