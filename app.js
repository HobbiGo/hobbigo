const hotels = [
  { name: "The Grand Platinum Jakarta", loc: "Jakarta Pusat", price: 1628100, oldPrice: 2429000, rating: "9.4", reviews: "19", img: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "AYANA Midplaza JAKARTA", loc: "Jakarta Pusat", price: 1800208, oldPrice: 2222479, rating: "9.4", reviews: "452", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Fairmont Jakarta", loc: "Senayan, Jakarta", price: 3051000, oldPrice: 3390000, rating: "9.2", reviews: "356", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400" }
];

const flights = [
  { name: "Garuda Indonesia", loc: "CGK - DPS", price: 1850000, oldPrice: 2000000, rating: "4.8", reviews: "1.2K", time: "08:00 - 11:00", img: "https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Citilink", loc: "CGK - DPS", price: 950000, oldPrice: 1200000, rating: "4.5", reviews: "3.4K", time: "13:30 - 16:30", img: "https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Batik Air", loc: "CGK - DPS", price: 1100000, oldPrice: 1350000, rating: "4.6", reviews: "890", time: "18:00 - 21:00", img: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400" }
];

let currentSearchType = 'hotel';

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
}

function setTab(btn, type) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  
  document.getElementById("form-hotel").style.display = "none";
  document.getElementById("form-flight").style.display = "none";
  
  document.getElementById("form-" + type).style.display = "flex";
  currentSearchType = type;
}

function executeSearch(type) {
  const btn = document.querySelector(`#form-${type} .btn-search`);
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    renderResults(type);
    showPage('results');
  }, 800);
}

function renderResults(type) {
  const container = document.getElementById("resultsList");
  const title = document.getElementById("resultsTitle");
  const destLabel = document.getElementById("resDest");
  
  container.innerHTML = ""; 
  
  if (type === 'hotel') {
    title.innerText = "Jakarta: 3 properties found";
    destLabel.innerText = "Jakarta";
    
    hotels.forEach(h => {
      container.innerHTML += `
        <div class="hotel-card" onclick="openDetail('${h.name}', ${h.price}, '${h.img}')">
          <img src="${h.img}" alt="Hotel">
          <div class="hotel-info">
            <h3>${h.name}</h3>
            <p class="loc"><i class="fa-solid fa-location-dot"></i> ${h.loc}</p>
            <div class="rating-badge">${h.rating} <span>Exceptional (${h.reviews} reviews)</span></div>
            <div class="amenities"><i class="fa-solid fa-wifi"></i> <i class="fa-solid fa-person-swimming"></i> <i class="fa-solid fa-dumbbell"></i></div>
          </div>
          <div class="hotel-price">
            <span class="discount-badge">Diskon</span>
            <h3>${formatRupiah(h.price)}</h3>
            <p><s>${formatRupiah(h.oldPrice)}</s></p>
            <small>per night</small>
          </div>
        </div>
      `;
    });
  } else if (type === 'flight') {
    title.innerText = "Jakarta (CGK) ke Bali (DPS): 3 flights found";
    destLabel.innerText = "Bali (DPS)";
    
    flights.forEach(f => {
      container.innerHTML += `
        <div class="hotel-card" onclick="openDetail('${f.name}', ${f.price}, '${f.img}')">
          <img src="${f.img}" alt="Flight">
          <div class="hotel-info">
            <h3>${f.name}</h3>
            <p class="loc"><i class="fa-solid fa-plane"></i> ${f.loc}</p>
            <div class="flight-path">
              ${f.time.split(' - ')[0]} <i class="fa-solid fa-arrow-right"></i> ${f.time.split(' - ')[1]}
            </div>
            <div class="rating-badge">${f.rating} <span>(${f.reviews} reviews)</span></div>
          </div>
          <div class="hotel-price">
            <span class="discount-badge">Promo</span>
            <h3>${formatRupiah(f.price)}</h3>
            <p><s>${formatRupiah(f.oldPrice)}</s></p>
            <small>per pax</small>
          </div>
        </div>
      `;
    });
  }
}

function openDetail(name, price, img) {
  document.getElementById("detailTitle").innerText = name;
  document.getElementById("detailPrice").innerText = formatRupiah(price);
  document.getElementById("detailImg").src = img;
  showPage('detail');
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
}
