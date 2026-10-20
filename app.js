// =========================================
// FILE JAVASCRIPT HOBIGO (VERSI INDONESIA)
// =========================================

const products = [
  {id:1, type:"Hotel", name:"Ayana Resort and Spa", place:"Jimbaran, Bali", price:3200000, img:"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"12.4K", featured:true, badge:"Best Seller", discount:15},
  {id:2, type:"Hotel", name:"Potato Head Suites", place:"Seminyak, Bali", price:2800000, img:"https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"8.2K", featured:true, badge:"Eco-Friendly", discount:0},
  {id:3, type:"Hotel", name:"W Bali - Seminyak", place:"Seminyak, Bali", price:4500000, img:"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"5.1K", featured:false, badge:"Luxury", discount:10},
  {id:4, type:"Hotel", name:"Padma Resort Ubud", place:"Ubud, Bali", price:2100000, img:"https://images.pexels.com/photos/241784/pexels-photo-241784.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"9.3K", featured:true, badge:"Sisa 2 Kamar", discount:0},
  {id:5, type:"Flight", name:"Garuda Indonesia (CGK-DPS)", place:"Jakarta - Bali", price:1850000, img:"https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"15K", featured:true, badge:"Full Service", discount:0},
  {id:6, type:"Flight", name:"Citilink (CGK-DPS)", place:"Jakarta - Bali", price:950000, img:"https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.5, reviews:"22K", featured:false, badge:"Low Cost", discount:20},
  {id:7, type:"Flight", name:"AirAsia (DPS-SIN)", place:"Bali - Singapore", price:1400000, img:"https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.4, reviews:"18K", featured:false, badge:"Direct Flight", discount:0},
  {id:8, type:"Transport", name:"Toyota Alphard (With Driver)", place:"Bali", price:1500000, img:"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"2.1K", featured:true, badge:"Premium", discount:0},
  {id:9, type:"Transport", name:"Toyota Avanza (7 Seater)", place:"Bali", price:450000, img:"https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.7, reviews:"5.4K", featured:false, badge:"Best Value", discount:0},
  {id:10, type:"Restaurant", name:"Jimbaran Bay Seafood", place:"Jimbaran, Bali", price:350000, img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"6.2K", featured:true, badge:"Romantic Dinner", discount:0},
  {id:11, type:"Attraction", name:"Uluwatu Temple Sunset", place:"Uluwatu, Bali", price:150000, img:"https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.9, reviews:"25K", featured:false, badge:"Must Visit", discount:0},
  {id:12, type:"Activity", name:"Nusa Penida Day Tour", place:"Sanur, Bali", price:850000, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400", rating:4.8, reviews:"11K", featured:true, badge:"Best Seller", discount:10}
];

let cart = [];
let transactions = [];
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
function saveTransactions() { localStorage.setItem("hobbigoTransactions", JSON.stringify(transactions)); }

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

function renderHome(){
  document.getElementById("homeProducts").innerHTML = products.slice(0, 4).map(p=>`
    <div class="card-prod" onclick="addProduct(${p.id})">
      <div class="prod-img" style="background-image:url('${p.img}')">
        ${p.featured ? '<span style="position:absolute;top:10px;left:10px;background:var(--gold);color:#000;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:800">★ FEATURED</span>' : ''}
      </div>
      <div class="prod-info">
        <h4>${p.name}</h4>
        <div class="prod-loc"><i class="fa-solid fa-location-dot"></i> ${p.place}</div>
        <div style="font-size:12px;color:var(--gold);margin-bottom:10px"><i class="fa-solid fa-star"></i> ${p.rating} (${p.reviews})</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="prod-price">${money(p.price - (p.price * (p.discount/100)))}</div>
          <button class="btn-book">Pesan</button>
        </div>
      </div>
    </div>
  `).join("");
}

function renderMarket(){
  const q = (document.getElementById("marketSearch").value||"").toLowerCase();
  const type = document.getElementById("marketType").value;
  
  document.getElementById("marketGrid").innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:50px;color:var(--gold)"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p>Mencari data...</p></div>';
  
  setTimeout(() => {
    const list = products.filter(p => (type==="All" || p.type===type) && (p.name+" "+p.place).toLowerCase().includes(q));
    
    document.getElementById("marketGrid").innerHTML = list.map(p=>`
      <div class="card-prod" onclick="addProduct(${p.id})">
        <div class="prod-img" style="background-image:url('${p.img}')">
          <span style="position:absolute;top:10px;left:10px;background:var(--bg-dark);color:var(--gold);padding:4px 10px;border-radius:20px;font-size:10px;font-weight:800;border:1px solid var(--gold)">${p.type}</span>
        </div>
        <div class="prod-info">
          <h4>${p.name}</h4>
          <div class="prod-loc"><i class="fa-solid fa-location-dot"></i> ${p.place}</div>
          <div style="font-size:12px;color:var(--gold);margin-bottom:10px"><i class="fa-solid fa-star"></i> ${p.rating} (${p.reviews})</div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div class="prod-price">${money(p.price - (p.price * (p.discount/100)))}</div>
            <button class="btn-book">Tambah</button>
          </div>
        </div>
      </div>
    `).join("") || '<div style="text-align:center;padding:40px;color:var(--text-muted);width:100%">Tidak ada produk yang cocok.</div>';
  }, 600);
}

function addProduct(id){
  const p = products.find(x=>x.id===id);
  if(cart.find(x=>x.id===id)) {
    showModal(`<h2 style="color:var(--gold)">Sudah Ada ✓</h2><p><b>${p.name}</b> sudah ada di keranjang Anda.</p><button class="btn btn-gold" onclick="closeModal();showPage('booking')">Lihat Keranjang</button>`);
    return;
  }
  cart.push({...p}); saveCart();
  showModal(`<h2 style="color:var(--gold)">Ditambahkan ✓</h2><p><b>${p.name}</b> berhasil ditambahkan.</p><button class="btn btn-gold" onclick="closeModal();showPage('booking')">Lihat Keranjang</button>`);
}

function showCart(){ showPage("booking"); }

function renderBooking(){
  const container = document.getElementById("bookingContent");
  if(!cart.length){
    container.innerHTML = `<div style="text-align:center;padding:40px;background:var(--bg-card);border-radius:16px;border:1px solid var(--border-color)"><h3 style="color:var(--text-muted)">Keranjang Kosong</h3><p style="color:var(--text-muted);margin-bottom:20px">Silakan pilih produk terlebih dahulu.</p><button class="btn btn-gold" style="width:auto" onclick="showPage('market')">Jelajahi Marketplace</button></div>`;
    return;
  }
  const total = cart.reduce((s,p)=>s+(p.price - (p.price * (p.discount ? p.discount/100 : 0))),0);
  container.innerHTML = `
    <div style="background:var(--bg-card);padding:30px;border-radius:20px;border:1px solid var(--border-color)">
      ${cart.map((p,i)=>{
        const finalPrice = p.price - (p.price * (p.discount ? p.discount/100 : 0));
        return `
        <div class="row">
          <div style="display:flex;gap:15px;align-items:center">
            <img src="${p.img}" style="width:60px;height:60px;border-radius:8px;object-fit:cover">
            <div><strong style="color:#fff">${p.name}</strong><br><span style="font-size:12px;color:var(--text-muted)">${p.type}</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:15px">
            <strong style="color:var(--gold)">${money(finalPrice)}</strong>
            <button class="btn-book" style="background:#ef4444;color:#fff;border:none" onclick="removeItem(${i})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
      }).join("")}
      <div class="row" style="border-top:1px solid var(--border-color);padding-top:20px;margin-top:10px">
        <strong style="font-size:18px;color:#fff">Total</strong>
        <strong style="font-size:24px;color:var(--gold)">${money(total)}</strong>
      </div>
      <button class="btn btn-green" style="margin-top:15px" onclick="checkout()">Lanjut ke Pembayaran</button>
    </div>
  `;
}

function removeItem(i){ cart.splice(i,1); saveCart(); renderBooking(); }

function checkout(){
  if(!cart.length) return;
  const total = cart.reduce((s,p)=>s+(p.price - (p.price * (p.discount ? p.discount/100 : 0))),0);
  const trxId = "HBG-" + Date.now().toString().slice(-8);
  
  const newTrx = { id: trxId, date: new Date().toLocaleString('id-ID'), items: [...cart], total: total, status: "Pending" };
  
  transactions.unshift(newTrx);
  saveTransactions();
  showPaymentModal(trxId);
}

function showPaymentModal(trxId) {
  const trx = transactions.find(t => t.id === trxId);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT-${trx.id}-TOTAL-${trx.total}`;
  
  showModal(`
    <div style="text-align:center">
      <h2 style="color:var(--gold);margin-bottom:5px">Selesaikan Pembayaran</h2>
      <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px">Scan QR Code ini dengan aplikasi e-wallet atau m-banking Anda.</p>
      <div style="margin:20px 0; padding:20px; background:#fff; border-radius:12px; display:inline-block">
        <img src="${qrUrl}" alt="QR Code" style="width:180px;height:180px;">
      </div>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">ID Transaksi: <b>${trx.id}</b></p>
      <div style="font-size:24px;font-weight:800;color:var(--gold);margin-bottom:20px">${money(trx.total)}</div>
      <button class="btn btn-green" onclick="simulatePayment('${trx.id}')"><i class="fa-solid fa-check-circle"></i> Simulasi Pembayaran Sukses</button>
    </div>
  `);
}

function simulatePayment(trxId) {
  const trx = transactions.find(t => t.id === trxId);
  trx.status = "Paid"; saveTransactions();
  cart = []; saveCart();
  showReceipt(trxId);
}

function showReceipt(trxId) {
  const trx = transactions.find(t => t.id === trxId);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-${trx.id}`;
  
  showModal(`
    <div class="receipt-card" id="printableReceipt" style="color:#000;background:#fff">
      <div style="text-align:center; border-bottom:2px dashed #ccc; padding-bottom:15px; margin-bottom:15px;">
        <h3 style="font-size:24px; color:#000; margin:0;">HobbiGo</h3>
        <p style="font-size:12px;color:#666">E-Receipt / Bukti Pembayaran</p>
        <span style="display:inline-block; background:#dcfce7; color:#166534; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:800; margin-top:10px;">✓ LUNAS</span>
      </div>
      
      <div class="receipt-row"><span>ID Transaksi</span><b>${trx.id}</b></div>
      <div class="receipt-row"><span>Tanggal</span><span>${trx.date}</span></div>
      <div class="receipt-row"><span>Metode</span><span>QRIS / E-Wallet</span></div>
      
      <div style="border-top:1px solid #ccc; margin:15px 0; padding-top:15px;">
        ${trx.items.map(i => {
          const fp = i.price - (i.price * (i.discount ? i.discount/100 : 0));
          return `<div class="receipt-row"><span>${i.name}</span><span>${money(fp)}</span></div>`;
        }).join('')}
      </div>
      
      <div class="receipt-total"><span>Total</span><span>${money(trx.total)}</span></div>
      
      <div style="text-align:center; margin-top:20px; padding:15px; background:#f8fafc; border-radius:12px;">
        <img src="${qrUrl}" alt="QR Code" style="width:120px;height:120px;">
        <p class="no-print" style="font-size:11px;color:#666;margin-top:5px;">Tunjukkan struk ini kepada mitra kami.</p>
      </div>
      
      <button class="btn btn-green" style="margin-top:15px; color:#000;" onclick="printReceipt()"><i class="fa-solid fa-print"></i> Cetak Struk</button>
      <button class="btn" style="margin-top:10px; background:#eee; color:#333; border:none;" onclick="closeModal();showPage('transactions')">Lihat Semua Transaksi</button>
    </div>
  `);
}

function printReceipt() { window.print(); }

function renderTransactions() {
  const container = document.getElementById("transactionsContent");
  if(!transactions.length){
    container.innerHTML = `<div style="text-align:center;padding:40px;background:var(--bg-card);border-radius:16px;border:1px solid var(--border-color)"><h3 style="color:var(--text-muted)">Belum ada transaksi</h3><button class="btn btn-gold" style="width:auto;margin-top:20px" onclick="showPage('home')">Mulai Pesan</button></div>`;
    return;
  }

  container.innerHTML = transactions.map(t => `
    <div style="background:var(--bg-card);padding:20px;border-radius:16px;border:1px solid var(--border-color);margin-bottom:15px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px">
      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:5px">${t.date} • ID: <b>${t.id}</b></div>
        <h4 style="font-size:16px;color:#fff">${t.items[0].name} ${t.items.length > 1 ? `+${t.items.length-1} lainnya` : ''}</h4>
        <div style="font-size:14px;color:var(--gold);font-weight:700;margin-top:5px">${money(t.total)}</div>
      </div>
      <div style="text-align:right">
        <span style="display:inline-block; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:800; ${t.status==='Paid'?'background:#166534;color:#dcfce7':'background:#b45309;color:#fef3c7'}">${t.status === 'Paid' ? 'LUNAS' : 'PENDING'}</span>
        <br>
        ${t.status === 'Paid' 
          ? `<button class="btn-book" style="margin-top:10px" onclick="showReceipt('${t.id}')">Lihat Struk</button>`
          : `<button class="btn-book" style="margin-top:10px; border-color:#10b981; color:#10b981" onclick="showPaymentModal('${t.id}')">Bayar</button>`
        }
      </div>
    </div>
  `).join("");
}

function generateTrip(){
  const dest = document.getElementById("dest").value || "Destinasi";
  const people = Math.max(1, Number(document.getElementById("people").value||1));
  const days = Number(document.getElementById("days").value);
  const style = document.getElementById("style").value;
  const total = (style==="Economy"?650000:style==="Exclusive"?1600000:950000) * people * days;

  document.getElementById("tripResult").innerHTML = `
    <div style="background:var(--bg-card);padding:30px;border-radius:20px;border:1px solid var(--border-color)">
      <span style="background:var(--gold);color:#000;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:800;display:inline-block;margin-bottom:15px">AI GENERATED</span>
      <h2 style="margin-bottom:5px;color:#fff">${dest} — ${days} Hari</h2>
      <p style="color:var(--text-muted);margin-bottom:20px">${people} wisatawan • ${style}</p>
      <div style="background:var(--bg-dark);padding:20px;border-radius:10px;margin-bottom:20px;text-align:center;border:1px solid var(--border-color)">
        <div style="font-size:12px;color:var(--text-muted)">Estimasi Biaya</div>
        <div style="font-size:28px;font-weight:800;color:var(--gold)">${money(total)}</div>
      </div>
      <button class="btn btn-gold" onclick="addAIPlanToCart(${total}, '${dest}')">+ Tambah Rencana ke Keranjang</button>
    </div>`;
}

function addAIPlanToCart(total, dest){
  cart.push({ id:Date.now(), type:"AI Package", name:`Paket AI (${dest})`, place:"Custom", price:total, img:"https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=200", discount:0 });
  saveCart();
  showModal(`<h2 style="color:var(--gold)">Rencana Ditambahkan ✓</h2><p>Itinerary AI Anda ke <b>${dest}</b> sudah masuk keranjang.</p><button class="btn btn-gold" onclick="closeModal();showPage('booking')">Lihat Keranjang</button>`);
}

function buildEvent(){
  const type = document.getElementById("eventType").value;
  const loc = document.getElementById("eventLocation").value;
  const n = Math.max(1, Number(document.getElementById("participants").value||1));
  const days = Number(document.getElementById("eventDays").value);
  const cost = n * 450000 * days;
  
  document.getElementById("eventResult").innerHTML = `
    <div style="background:var(--bg-card);padding:30px;border-radius:20px;border:1px solid var(--border-color)">
      <h2 style="margin-bottom:15px;color:#fff">${type} — ${loc}</h2>
      <div class="row"><span style="color:var(--text-muted)">Peserta</span><strong style="color:#fff">${n} pax</strong></div>
      <div class="row"><span style="color:var(--text-muted)">Estimasi Biaya</span><strong style="color:var(--gold);font-size:20px">${money(cost)}</strong></div>
      <button class="btn btn-green" style="margin-top:15px" onclick="showModal('<h2 style=color:var(--gold)>Permintaan Terkirim ✓</h2><p style=color:#fff>Tim kami akan segera menghubungi Anda.</p>')">Ajukan Paket</button>
    </div>`;
}

function showModal(html){ document.getElementById("modalContent").innerHTML = html; document.getElementById("modal").classList.add("show"); }
function closeModal(){ document.getElementById("modal").classList.remove("show"); }

function toggleChat() { document.getElementById('chatWindow').classList.toggle('show'); }
function sendChat() { 
  const input = document.getElementById('chatInput'); 
  const body = document.querySelector('.chat-body'); 
  if(!input.value.trim()) return; 
  body.innerHTML += `<div class="chat-msg user">${input.value}</div>`; 
  input.value = ''; 
  setTimeout(() => { 
    body.innerHTML += `<div class="chat-msg bot">Saya siap membantu! Silakan coba fitur AI Planner atau cek Marketplace kami.</div>`; 
    body.scrollTop = body.scrollHeight; 
  }, 1000); 
}

document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("date")) document.getElementById("date").value = new Date().toISOString().slice(0,10);
  saveCart();
  renderHome();
  renderMarket();
});
