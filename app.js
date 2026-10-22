/* =========================================================
   HOBBIGO V77
   AI JOURNEY & EXPERIENCE MARKETPLACE
   APP.JS - FULL
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
   ========================================================= */

const HBG = {
  customerType: "personal",
  planningMode: "ai",
  packageStyle: "comfort",
  travelTab: "flights",
  marketplaceCategory: "All",
  paymentMethod: "Demo Payment",
  currentProduct: null,
  currentBooking: null,
  selectedCorporatePackage: null,
  map: null,
  routeLayer: null,

  cart: JSON.parse(localStorage.getItem("hbg_cart") || "[]"),
  bookings: JSON.parse(localStorage.getItem("hbg_bookings") || "[]"),

  products: [
    {
      id:"HTL001",
      category:"Hotels",
      name:"Ocean View Resort Bali",
      location:"Nusa Dua, Bali",
      price:1250000,
      unit:"night",
      rating:4.8,
      icon:"🏨",
      description:"Premium beachfront resort dengan fasilitas lengkap.",
      tags:["Beach","Family","Luxury"]
    },
    {
      id:"HTL002",
      category:"Hotels",
      name:"Ubud Green Hotel",
      location:"Ubud, Bali",
      price:850000,
      unit:"night",
      rating:4.6,
      icon:"🏨",
      description:"Hotel nyaman di kawasan Ubud.",
      tags:["Nature","Culture","Relax"]
    },
    {
      id:"VIL001",
      category:"Villa",
      name:"Jungle Private Villa",
      location:"Ubud, Bali",
      price:1850000,
      unit:"night",
      rating:4.9,
      icon:"🏡",
      description:"Private villa dengan kolam renang dan view hutan.",
      tags:["Private","Pool","Couple"]
    },
    {
      id:"HOM001",
      category:"Home Rental",
      name:"Family Holiday House",
      location:"Canggu, Bali",
      price:1400000,
      unit:"night",
      rating:4.7,
      icon:"🏠",
      description:"Rumah liburan untuk keluarga dan group.",
      tags:["Family","Group","Kitchen"]
    },
    {
      id:"FLT001",
      category:"Flights",
      name:"Jakarta → Bali Economy",
      location:"CGK → DPS",
      price:950000,
      unit:"person",
      rating:4.5,
      icon:"✈️",
      description:"Tiket penerbangan ekonomi.",
      tags:["Flight","Economy"]
    },
    {
      id:"FLT002",
      category:"Flights",
      name:"Jakarta → Bali Business",
      location:"CGK → DPS",
      price:2800000,
      unit:"person",
      rating:4.8,
      icon:"✈️",
      description:"Penerbangan business class.",
      tags:["Flight","Business"]
    },
    {
      id:"TRN001",
      category:"Transport",
      name:"Airport Private Transfer",
      location:"Bali Airport → Hotel",
      price:250000,
      unit:"trip",
      rating:4.8,
      icon:"🚐",
      description:"Private airport transfer.",
      tags:["Airport","Private"]
    },
    {
      id:"CAR001",
      category:"Car Rental",
      name:"Toyota Innova Rental",
      location:"Bali",
      price:650000,
      unit:"day",
      rating:4.7,
      icon:"🚙",
      description:"Rental kendaraan harian.",
      tags:["Car","Family","Driver"]
    },
    {
      id:"BOA001",
      category:"Boat",
      name:"Nusa Penida Boat Trip",
      location:"Sanur → Nusa Penida",
      price:450000,
      unit:"person",
      rating:4.8,
      icon:"🚤",
      description:"Fast boat menuju Nusa Penida.",
      tags:["Boat","Island","Sea"]
    },
    {
      id:"TOU001",
      category:"Tour",
      name:"Bali Heritage Tour",
      location:"Ubud → Kintamani",
      price:650000,
      unit:"person",
      rating:4.9,
      icon:"🗺️",
      description:"Tour budaya dan alam Bali.",
      tags:["Culture","Nature"]
    },
    {
      id:"ATT001",
      category:"Attraction",
      name:"Water Temple Experience",
      location:"Bali",
      price:120000,
      unit:"person",
      rating:4.7,
      icon:"🏯",
      description:"Pengalaman wisata pura air.",
      tags:["Culture","Photo"]
    },
    {
      id:"ACT001",
      category:"Activity",
      name:"Bali Rafting Adventure",
      location:"Ayung River",
      price:550000,
      unit:"person",
      rating:4.8,
      icon:"🛶",
      description:"Aktivitas rafting untuk adventure traveler.",
      tags:["Adventure","Outdoor"]
    },
    {
      id:"HOB001",
      category:"Hobby",
      name:"Bali Photography Experience",
      location:"Ubud",
      price:750000,
      unit:"session",
      rating:4.9,
      icon:"📸",
      description:"Photography experience bersama local guide.",
      tags:["Photography","Hobby"]
    },
    {
      id:"RES001",
      category:"Restaurant",
      name:"Sunset Seafood Dinner",
      location:"Jimbaran, Bali",
      price:350000,
      unit:"person",
      rating:4.7,
      icon:"🍽️",
      description:"Dinner seafood dengan sunset view.",
      tags:["Culinary","Sunset"]
    },
    {
      id:"RES002",
      category:"Restaurant",
      name:"Balinese Royal Dinner",
      location:"Ubud, Bali",
      price:475000,
      unit:"person",
      rating:4.8,
      icon:"🍛",
      description:"Pengalaman makan malam khas Bali.",
      tags:["Food","Culture"]
    },
    {
      id:"MEE001",
      category:"Meeting Venue",
      name:"Bali Executive Meeting Center",
      location:"Nusa Dua, Bali",
      price:8500000,
      unit:"day",
      rating:4.8,
      icon:"🏢",
      description:"Meeting venue untuk corporate event.",
      tags:["Corporate","Meeting","AV"]
    },
    {
      id:"MEE002",
      category:"Meeting Venue",
      name:"Ubud Retreat Venue",
      location:"Ubud, Bali",
      price:6500000,
      unit:"day",
      rating:4.7,
      icon:"🌴",
      description:"Venue retreat dan team building.",
      tags:["Retreat","Nature","Team"]
    },
    {
      id:"AGT001",
      category:"Agent",
      name:"Bali Destination Management",
      location:"Bali",
      price:0,
      unit:"service",
      rating:4.8,
      icon:"🤝",
      description:"Local destination management partner.",
      tags:["DMC","Corporate"]
    }
  ]
};

/* =========================================================
   HELPERS
   ========================================================= */

function $(id){
  return document.getElementById(id);
}

function qs(selector){
  return document.querySelector(selector);
}

function qsa(selector){
  return [...document.querySelectorAll(selector)];
}

function escapeHTML(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function formatIDR(value){
  return new Intl.NumberFormat("id-ID",{
    style:"currency",
    currency:"IDR",
    maximumFractionDigits:0
  }).format(Number(value)||0);
}

function saveState(){
  localStorage.setItem("hbg_cart",JSON.stringify(HBG.cart));
  localStorage.setItem("hbg_bookings",JSON.stringify(HBG.bookings));
}

function showToast(message,type="success"){
  let container=$("toastContainer");

  if(!container){
    container=document.createElement("div");
    container.id="toastContainer";
    container.className="toast-container";
    document.body.appendChild(container);
  }

  const toast=document.createElement("div");
  toast.className=`toast ${type}`;
  toast.textContent=message;

  container.appendChild(toast);

  setTimeout(()=>{
    toast.remove();
  },3200);
}

function go(id){
  const el=$(id);

  if(el){
    el.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });
  }

  qsa(".nav button").forEach(btn=>{
    btn.classList.remove("active");
  });
}

function toggleLanguage(){
  const current=document.documentElement.lang || "en";

  document.documentElement.lang=current==="en"?"id":"en";

  showToast(
    current==="en"
      ? "Language switched to Indonesian"
      : "Bahasa diubah ke English"
  );
}

function setActive(elements,active){
  elements.forEach(el=>el.classList.remove("active"));

  if(active){
    active.classList.add("active");
  }
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu(){
  const nav=qs(".nav");

  if(!nav) return;

  const isOpen=nav.style.display==="flex";

  if(isOpen){
    nav.style.display="";
  }else{
    nav.style.display="flex";
    nav.style.position="absolute";
    nav.style.top="62px";
    nav.style.left="0";
    nav.style.right="0";
    nav.style.padding="12px";
    nav.style.flexDirection="column";
    nav.style.background="#07111f";
    nav.style.borderBottom="1px solid #203a57";
  }
}

/* =========================================================
   HERO SEARCH
   ========================================================= */

function heroSearchGo(){

  const destination=$("heroDestination")?.value || "";
  const date=$("heroDate")?.value || "";
  const travelers=Number($("heroTravelers")?.value || 1);

  if(!destination){
    showToast("Masukkan tujuan perjalanan terlebih dahulu","error");
    go("planner");
    return;
  }

  if($("tripDestination")){
    $("tripDestination").value=destination;
  }

  if($("tripStartDate") && date){
    $("tripStartDate").value=date;
  }

  if($("tripTravelers")){
    $("tripTravelers").value=travelers;
  }

  go("planner");

  showToast(`AI Planner siap untuk ${destination}`);

  setTimeout(()=>{
    generateTrip();
  },400);
}

/* =========================================================
   CUSTOMER TYPE
   ========================================================= */

function selectCustomerType(type,element){

  HBG.customerType=type;

  const buttons=qsa(".customer-type-btn,.customer-option,[data-customer-type]");

  if(element){
    setActive(buttons,element);
  }

  showToast(
    `Mode customer: ${type.charAt(0).toUpperCase()+type.slice(1)}`
  );
}

/* =========================================================
   TRAVEL TABS
   ========================================================= */

function setTravelTab(tab,element){

  HBG.travelTab=tab;

  const buttons=qsa(".travel-tab,[data-travel-tab]");

  if(element){
    setActive(buttons,element);
  }

  qsa(".travel-form").forEach(form=>{
    form.classList.add("hidden");
  });

  const target=$(`travel-${tab}`);

  if(target){
    target.classList.remove("hidden");
  }
}

/* =========================================================
   FLIGHT SEARCH
   ========================================================= */

function searchFlights(){

  const from=$("flightFrom")?.value || "Jakarta";
  const to=$("flightTo")?.value || "Bali";
  const departure=$("flightDeparture")?.value || "";
  const passengers=Number($("flightPassengers")?.value || 1);

  const flights=HBG.products.filter(p=>p.category==="Flights");

  renderSearchResults(
    flights,
    `${from} → ${to}`,
    departure,
    passengers
  );
}

function searchHotels(){

  const destination=$("hotelDestination")?.value || "Bali";
  const checkin=$("hotelCheckin")?.value || "";
  const checkout=$("hotelCheckout")?.value || "";
  const guests=Number($("hotelGuests")?.value || 1);

  const hotels=HBG.products.filter(p=>
    p.category==="Hotels" ||
    p.category==="Villa" ||
    p.category==="Home Rental"
  );

  renderSearchResults(
    hotels,
    destination,
    `${checkin} → ${checkout}`,
    guests
  );
}

function renderSearchResults(products,title,detail,count){

  const target=$("travelSearchResults");

  if(!target){
    renderMarketplace(products);
    go("marketplace");
    showToast(`Menampilkan hasil untuk ${title}`);
    return;
  }

  target.innerHTML=`
    <div class="card panel">
      <div class="result-header">
        <div>
          <span class="badge">SEARCH RESULT</span>
          <h3>${escapeHTML(title)}</h3>
          <p class="section-subtitle">
            ${escapeHTML(detail || "")}
            · ${count} traveler
          </p>
        </div>
        <button class="btn btn-secondary btn-sm"
          onclick="go('marketplace')">
          Open Marketplace
        </button>
      </div>

      <div class="product-grid">
        ${products.map(productCardHTML).join("")}
      </div>
    </div>
  `;

  target.classList.remove("hidden");
}

/* =========================================================
   AI PLANNER
   ========================================================= */

function selectPlanningMode(mode,element){

  HBG.planningMode=mode;

  const buttons=qsa(".planning-mode-btn,[data-planning-mode]");

  if(element){
    setActive(buttons,element);
  }

  showToast(`Planning mode: ${mode.toUpperCase()}`);
}

function getPlannerData(){

  return {
    destination:$("tripDestination")?.value || "Bali",
    startDate:$("tripStartDate")?.value || "",
    travelers:Number($("tripTravelers")?.value || 2),
    duration:Number($("tripDuration")?.value || 4),
    style:$("tripStyle")?.value || "Comfort",
    interest:$("tripInterest")?.value || "Nature",
    budget:Number($("tripBudget")?.value || 10000000)
  };
}

function generateTrip(){

  const data=getPlannerData();

  const days=Math.max(1,data.duration);

  const hotel=HBG.products.find(p=>p.category==="Hotels");
  const transfer=HBG.products.find(p=>p.category==="Transport");
  const tour=HBG.products.find(p=>p.category==="Tour");
  const restaurant=HBG.products.find(p=>p.category==="Restaurant");

  const hotelCost=(hotel?.price||0)*Math.max(1,days-1);
  const transferCost=(transfer?.price||0)*2;
  const tourCost=(tour?.price||0)*data.travelers;
  const foodCost=(restaurant?.price||0)*data.travelers*2;

  let total=hotelCost+transferCost+tourCost+foodCost;

  total=Math.round(total);

  const result=$("aiTripResult");

  if(!result){
    showToast(`AI Trip generated: ${formatIDR(total)}`);
    buildSmartRoute();
    return;
  }

  result.innerHTML=`
    <div class="result-header">
      <div>
        <span class="badge">AI GENERATED TRIP</span>
        <h3>${escapeHTML(data.destination)}</h3>
        <p class="section-subtitle">
          ${days} hari · ${data.travelers} traveler ·
          ${escapeHTML(data.style)} ·
          ${escapeHTML(data.interest)}
        </p>
      </div>

      <div class="price">${formatIDR(total)}</div>
    </div>

    <div class="route-metrics">
      <div class="metric">
        <small>Duration</small>
        <strong>${days} Days</strong>
      </div>

      <div class="metric">
        <small>Travelers</small>
        <strong>${data.travelers}</strong>
      </div>

      <div class="metric">
        <small>Style</small>
        <strong>${escapeHTML(data.style)}</strong>
      </div>

      <div class="metric">
        <small>Budget</small>
        <strong>${formatIDR(data.budget)}</strong>
      </div>
    </div>

    <div class="itinerary">

      ${createItineraryItem(
        "08:00",
        "Airport / Hotel Transfer",
        "Arrival and private transfer"
      )}

      ${createItineraryItem(
        "10:30",
        "Destination Experience",
        `${data.interest} experience`
      )}

      ${createItineraryItem(
        "13:00",
        "Local Culinary",
        "Recommended restaurant based on route"
      )}

      ${createItineraryItem(
        "15:30",
        "Main Attraction",
        "AI-selected attraction"
      )}

      ${createItineraryItem(
        "19:00",
        "Dinner & Relax",
        "Evening culinary experience"
      )}

    </div>

    <div class="travel-actions">
      <button class="btn btn-secondary"
        onclick="buildSmartRoute()">
        🗺️ Smart Route
      </button>

      <button class="btn btn-purple"
        onclick="aiOptimize()">
        ✨ AI Re-optimize
      </button>

      <button class="btn btn-primary"
        onclick="addAITripToCart()">
        Add Trip Package
      </button>
    </div>

    <div id="routeMap" class="map-box"></div>
  `;

  result.classList.remove("hidden");

  setTimeout(()=>{
    initMap();
  },150);

  showToast("AI Trip berhasil dibuat");
}

function createItineraryItem(time,title,description){

  return `
    <div class="itinerary-item">
      <div class="itinerary-time">${time}</div>

      <div class="itinerary-info">
        <h4>${escapeHTML(title)}</h4>
        <p>${escapeHTML(description)}</p>
      </div>

      <span class="badge">AI</span>
    </div>
  `;
}

function buildSmartRoute(){

  const result=$("aiTripResult");

  if(result){
    const map=$("routeMap");

    if(map){
      map.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }

    initMap();
  }

  showToast("Smart Route dioptimalkan");
}

function aiOptimize(){

  const budget=Number($("tripBudget")?.value || 10000000);

  const totalElement=qs(".ai-result .price");

  if(totalElement){

    const current=parseInt(
      totalElement.textContent.replace(/[^\d]/g,"")
    ) || 0;

    const optimized=Math.min(
      current,
      Math.round(budget*0.9)
    );

    totalElement.textContent=formatIDR(optimized);
  }

  showToast(
    "AI melakukan re-optimasi berdasarkan budget"
  );
}

function addAITripToCart(){

  const data=getPlannerData();

  const price=calculateAITripPrice(data);

  const item={
    id:"AI-"+Date.now(),
    category:"AI Trip Package",
    name:`AI Trip ${data.destination}`,
    location:data.destination,
    price:price,
    quantity:1,
    icon:"🤖",
    metadata:data
  };

  HBG.cart.push(item);

  saveState();
  updateCartUI();

  showToast("AI Trip Package masuk ke cart");
}

function calculateAITripPrice(data){

  const hotel=HBG.products.find(p=>p.category==="Hotels");
  const transfer=HBG.products.find(p=>p.category==="Transport");
  const tour=HBG.products.find(p=>p.category==="Tour");
  const restaurant=HBG.products.find(p=>p.category==="Restaurant");

  return Math.round(
    ((hotel?.price||0)*Math.max(1,data.duration-1)) +
    ((transfer?.price||0)*2) +
    ((tour?.price||0)*data.travelers) +
    ((restaurant?.price||0)*data.travelers*2)
  );
}

/* =========================================================
   MAP
   ========================================================= */

function initMap(){

  if(typeof L==="undefined"){
    return;
  }

  const mapElement=$("routeMap");

  if(!mapElement){
    return;
  }

  if(HBG.map){
    try{
      HBG.map.remove();
    }catch(e){}
  }

  HBG.map=L.map(mapElement).setView(
    [-8.4095,115.1889],
    10
  );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:"© OpenStreetMap contributors"
    }
  ).addTo(HBG.map);

  const points=[
    [-8.4095,115.1889],
    [-8.5069,115.2625],
    [-8.3405,115.0920],
    [-8.7183,115.1686]
  ];

  points.forEach((point,index)=>{
    L.marker(point)
      .addTo(HBG.map)
      .bindPopup(`HobbiGo Stop ${index+1}`);
  });

  HBG.routeLayer=L.polyline(
    points,
    {
      weight:5
    }
  ).addTo(HBG.map);

  HBG.map.fitBounds(
    HBG.routeLayer.getBounds(),
    {padding:[25,25]}
  );
}

/* =========================================================
   MARKETPLACE
   ========================================================= */

function filterMarketplace(category,element){

  HBG.marketplaceCategory=category;

  if(element){
    setActive(
      qsa(".marketplace-chip,.chip"),
      element
    );
  }

  renderMarketplace();
}

function getMarketplaceSearch(){

  return (
    $("marketplaceSearch")?.value ||
    $("marketSearch")?.value ||
    ""
  ).toLowerCase().trim();
}

function renderMarketplace(customProducts=null){

  let products=customProducts || [...HBG.products];

  const search=getMarketplaceSearch();

  if(!customProducts && HBG.marketplaceCategory!=="All"){
    products=products.filter(
      p=>p.category===HBG.marketplaceCategory
    );
  }

  if(search){
    products=products.filter(p=>
      `${p.name} ${p.location} ${p.category} ${p.description} ${p.tags.join(" ")}`
      .toLowerCase()
      .includes(search)
    );
  }

  const sort=$("marketplaceSort")?.value || "recommended";

  if(sort==="low"){
    products.sort((a,b)=>a.price-b.price);
  }

  if(sort==="high"){
    products.sort((a,b)=>b.price-a.price);
  }

  if(sort==="rating"){
    products.sort((a,b)=>b.rating-a.rating);
  }

  const grid=$("marketplaceGrid");

  if(!grid){
    return;
  }

  if(!products.length){
    grid.innerHTML=`
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🔎</div>
        <strong>Produk tidak ditemukan</strong>
        <p>Coba kategori atau kata kunci lain.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML=products.map(productCardHTML).join("");
}

function productCardHTML(product){

  return `
    <div class="product-card">

      <div class="product-image">
        ${product.image
          ? `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">`
          : escapeHTML(product.icon || "🌍")
        }
      </div>

      <div class="product-body">

        <div class="product-category">
          ${escapeHTML(product.category)}
        </div>

        <div class="product-title">
          ${escapeHTML(product.name)}
        </div>

        <div class="product-location">
          📍 ${escapeHTML(product.location)}
        </div>

        <div class="product-price">
          ${product.price>0
            ? formatIDR(product.price)
            : "Contact Partner"
          }
          ${product.unit && product.price>0
            ? `<small style="color:#7890a8"> / ${escapeHTML(product.unit)}</small>`
            : ""
          }
        </div>

        <div class="product-footer">

          <span style="color:#fbbf24;font-size:12px">
            ★ ${product.rating}
          </span>

          <button class="btn btn-primary btn-sm"
            onclick="openProductModal('${product.id}')">
            View
          </button>

        </div>

      </div>
    </div>
  `;
}

function openProductModal(id){

  const product=HBG.products.find(p=>p.id===id);

  if(!product) return;

  HBG.currentProduct=product;

  const modal=$("productModal");

  if(!modal){

    addDynamicProductModal();

  }

  $("productModalTitle").textContent=product.name;

  $("productModalBody").innerHTML=`
    <div class="product-image" style="height:220px;border-radius:14px;margin-bottom:18px">
      ${product.image
        ? `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">`
        : escapeHTML(product.icon || "🌍")
      }
    </div>

    <span class="badge">
      ${escapeHTML(product.category)}
    </span>

    <h2 style="margin:12px 0 5px">
      ${escapeHTML(product.name)}
    </h2>

    <p class="text-muted">
      📍 ${escapeHTML(product.location)}
    </p>

    <p style="margin-top:15px;color:#b6c8d9">
      ${escapeHTML(product.description)}
    </p>

    <div class="route-metrics">

      <div class="metric">
        <small>Rating</small>
        <strong>★ ${product.rating}</strong>
      </div>

      <div class="metric">
        <small>Price</small>
        <strong>
          ${product.price>0
            ? formatIDR(product.price)
            : "Contact"
          }
        </strong>
      </div>

      <div class="metric">
        <small>Unit</small>
        <strong>${escapeHTML(product.unit || "-")}</strong>
      </div>

      <div class="metric">
        <small>Booking</small>
        <strong>Instant</strong>
      </div>

    </div>

    <div class="option-row mt-20">
      ${product.tags.map(tag=>
        `<span class="badge">${escapeHTML(tag)}</span>`
      ).join("")}
    </div>
  `;

  $("productModal").classList.add("show");
}

function closeProductModal(){

  $("productModal")?.classList.remove("show");
}

function addProductToCart(){

  if(!HBG.currentProduct){
    return;
  }

  addToCart(HBG.currentProduct);

  closeProductModal();
}

function addToCart(product){

  const existing=HBG.cart.find(
    item=>item.id===product.id
  );

  if(existing){
    existing.quantity=(existing.quantity||1)+1;
  }else{
    HBG.cart.push({
      ...product,
      quantity:1
    });
  }

  saveState();
  updateCartUI();

  showToast(`${product.name} ditambahkan ke cart`);
}

/* =========================================================
   CART
   ========================================================= */

function openCart(){

  const drawer=$("cartDrawer");

  if(drawer){
    drawer.classList.add("show");
  }

  renderCart();
}

function closeCart(){

  $("cartDrawer")?.classList.remove("show");
}

function updateCartUI(){

  const count=HBG.cart.reduce(
    (sum,item)=>sum+(item.quantity||1),
    0
  );

  qsa(".cart-count").forEach(el=>{
    el.textContent=count;
  });

  renderCart();
}

function renderCart(){

  const body=$("cartItems");

  if(!body){
    return;
  }

  if(!HBG.cart.length){

    body.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <strong>Cart masih kosong</strong>
        <p>Tambahkan hotel, flight, tour atau package.</p>
      </div>
    `;

  }else{

    body.innerHTML=HBG.cart.map((item,index)=>`

      <div class="cart-item">

        <div class="cart-item-icon">
          ${escapeHTML(item.icon || "🌍")}
        </div>

        <div>
          <strong>${escapeHTML(item.name)}</strong>
          <div class="text-muted" style="font-size:11px">
            ${item.quantity||1} ×
            ${formatIDR(item.price)}
          </div>
        </div>

        <button class="btn btn-danger btn-sm"
          onclick="removeFromCart(${index})">
          ×
        </button>

      </div>

    `).join("");
  }

  const subtotal=cartSubtotal();
  const fee=Math.round(subtotal*0.05);
  const total=subtotal+fee;

  if($("cartSubtotal")){
    $("cartSubtotal").textContent=formatIDR(subtotal);
  }

  if($("cartFee")){
    $("cartFee").textContent=formatIDR(fee);
  }

  if($("cartTotal")){
    $("cartTotal").textContent=formatIDR(total);
  }
}

function cartSubtotal(){

  return HBG.cart.reduce(
    (sum,item)=>
      sum+(Number(item.price)||0)*(item.quantity||1),
    0
  );
}

function removeFromCart(index){

  HBG.cart.splice(index,1);

  saveState();
  updateCartUI();

  showToast("Item dihapus dari cart");
}

function clearCart(){

  HBG.cart=[];

  saveState();
  updateCartUI();

  showToast("Cart dikosongkan");
}

function checkoutCart(){

  if(!HBG.cart.length){
    showToast("Cart masih kosong","error");
    return;
  }

  openBookingModal();
}

/* =========================================================
   PACKAGE STYLE
   ========================================================= */

function selectPackageStyle(style,element){

  HBG.packageStyle=style;

  if(element){
    setActive(
      qsa(".package-style"),
      element
    );
  }

  updatePackageSummary();

  showToast(`Package style: ${style}`);
}

function updatePackageSummary(){

  const subtotal=cartSubtotal();

  const multiplier={
    "best-price":.92,
    "economy":.96,
    "comfort":1,
    "exclusive":1.25
  }[HBG.packageStyle] || 1;

  const adjusted=Math.round(subtotal*multiplier);
  const fee=Math.round(adjusted*.05);
  const total=adjusted+fee;

  if($("packageSubtotal")){
    $("packageSubtotal").textContent=formatIDR(adjusted);
  }

  if($("packageFee")){
    $("packageFee").textContent=formatIDR(fee);
  }

  if($("packageTotal")){
    $("packageTotal").textContent=formatIDR(total);
  }

  return total;
}

/* =========================================================
   BOOKING
   ========================================================= */

function openBookingModal(){

  const modal=$("bookingModal");

  if(!modal){
    addDynamicBookingModal();
  }

  renderBookingSummary();

  $("bookingModal").classList.add("show");
}

function closeBookingModal(){

  $("bookingModal")?.classList.remove("show");
}

function renderBookingSummary(){

  const target=$("bookingSummary");

  if(!target){
    return;
  }

  const subtotal=cartSubtotal();
  const fee=Math.round(subtotal*.05);
  const total=subtotal+fee;

  target.innerHTML=`

    <div class="summary-row">
      <span>Items</span>
      <strong>${HBG.cart.length}</strong>
    </div>

    <div class="summary-row">
      <span>Subtotal</span>
      <strong>${formatIDR(subtotal)}</strong>
    </div>

    <div class="summary-row">
      <span>Service Fee</span>
      <strong>${formatIDR(fee)}</strong>
    </div>

    <div class="summary-row total">
      <span>Total</span>
      <span>${formatIDR(total)}</span>
    </div>

  `;
}

function selectPayment(method,element){

  HBG.paymentMethod=method;

  if(element){
    setActive(
      qsa(".payment-option"),
      element
    );
  }

  showToast(`Payment method: ${method}`);
}

function completeBooking(){

  if(!HBG.cart.length){
    showToast("Cart masih kosong","error");
    return;
  }

  const name=$("customerName")?.value?.trim();
  const email=$("customerEmail")?.value?.trim();
  const phone=$("customerPhone")?.value?.trim();

  if(!name || !email || !phone){

    showToast(
      "Lengkapi nama, email dan nomor telepon",
      "error"
    );

    return;
  }

  const terms=$("bookingTerms");

  if(terms && !terms.checked){

    showToast(
      "Setujui syarat dan ketentuan terlebih dahulu",
      "error"
    );

    return;
  }

  const subtotal=cartSubtotal();
  const fee=Math.round(subtotal*.05);

  const booking={
    id:"HBG-"+Date.now(),
    date:new Date().toISOString(),
    customer:{
      name,
      email,
      phone
    },
    payment:HBG.paymentMethod,
    status:"CONFIRMED",
    items:[...HBG.cart],
    subtotal,
    fee,
    total:subtotal+fee
  };

  HBG.bookings.unshift(booking);

  HBG.currentBooking=booking;

  HBG.cart=[];

  saveState();

  updateCartUI();

  closeBookingModal();

  showSuccessModal(booking);

  renderBookings();

  showToast("Booking berhasil dibuat");
}

function showSuccessModal(booking){

  const modal=$("successModal");

  if(!modal){
    addDynamicSuccessModal();
  }

  $("successBookingId").textContent=booking.id;

  $("successBookingTotal").textContent=
    formatIDR(booking.total);

  $("successModal").classList.add("show");
}

function closeSuccessModal(){

  $("successModal")?.classList.remove("show");
}

function printVoucher(){

  if(!HBG.currentBooking){
    return;
  }

  const booking=HBG.currentBooking;

  const win=window.open(
    "",
    "_blank",
    "width=800,height=900"
  );

  if(!win){
    showToast("Browser memblokir popup","error");
    return;
  }

  win.document.write(`
    <html>
      <head>
        <title>HobbiGo Voucher ${booking.id}</title>
        <style>
          body{
            font-family:Arial;
            padding:40px;
          }
          h1{color:#16a085}
          .box{
            border:1px solid #ddd;
            padding:20px;
            border-radius:12px;
          }
        </style>
      </head>
      <body>
        <h1>HOBBIGO</h1>
        <h2>Booking Confirmation</h2>

        <div class="box">

          <p><b>Booking ID:</b> ${escapeHTML(booking.id)}</p>
          <p><b>Customer:</b> ${escapeHTML(booking.customer.name)}</p>
          <p><b>Email:</b> ${escapeHTML(booking.customer.email)}</p>
          <p><b>Payment:</b> ${escapeHTML(booking.payment)}</p>
          <p><b>Total:</b> ${formatIDR(booking.total)}</p>

          <hr>

          ${booking.items.map(item=>`
            <p>
              ${escapeHTML(item.name)}
              × ${item.quantity||1}
            </p>
          `).join("")}

        </div>

        <script>
          window.onload=function(){
            window.print();
          }
        <\/script>
      </body>
    </html>
  `);

  win.document.close();
}

/* =========================================================
   MY TRIP
   ========================================================= */

function showTripTab(tab,element){

  if(element){
    setActive(
      qsa(".trip-tab"),
      element
    );
  }

  qsa(".trip-content").forEach(el=>{
    el.classList.add("hidden");
  });

  const target=$(`trip-${tab}`);

  if(target){
    target.classList.remove("hidden");
  }

  if(tab==="bookings"){
    renderBookings();
  }

  if(tab==="live"){
    openLiveJourney();
  }
}

function renderBookings(){

  const target=$("tripBookings");

  if(!target){
    return;
  }

  if(!HBG.bookings.length){

    target.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">🎫</div>
        <strong>Belum ada booking</strong>
        <p>Booking perjalanan akan muncul di sini.</p>
      </div>
    `;

    return;
  }

  target.innerHTML=HBG.bookings.map(booking=>`

    <div class="booking-card">

      <div class="booking-card-head">

        <div>
          <span class="badge">BOOKING</span>
          <h3>${escapeHTML(booking.id)}</h3>
        </div>

        <span class="status success">
          ${escapeHTML(booking.status)}
        </span>

      </div>

      <p class="text-muted">
        ${escapeHTML(booking.customer.name)}
      </p>

      <div class="summary-row">
        <span>Items</span>
        <strong>${booking.items.length}</strong>
      </div>

      <div class="summary-row total">
        <span>Total</span>
        <span>${formatIDR(booking.total)}</span>
      </div>

      <div class="travel-actions">

        <button class="btn btn-secondary btn-sm"
          onclick="viewBooking('${booking.id}')">
          View Booking
        </button>

        <button class="btn btn-primary btn-sm"
          onclick="openLiveJourney()">
          Live Journey
        </button>

      </div>

    </div>

  `).join("");
}

function viewBooking(id){

  const booking=HBG.bookings.find(
    b=>b.id===id
  );

  if(!booking){
    return;
  }

  HBG.currentBooking=booking;

  showSuccessModal(booking);
}

/* =========================================================
   LIVE JOURNEY
   ========================================================= */

function openLiveJourney(){

  const target=$("liveJourneyContent");

  if(target){

    target.innerHTML=`

      <div class="live-dashboard">

        <div class="live-card">

          <div class="live-status">
            <span class="live-dot"></span>
            LIVE JOURNEY
          </div>

          <div class="next-stop">
            Ubud Experience
          </div>

          <div class="eta">
            ETA 10:35 · AI Route Active
          </div>

          <div class="travel-actions">
            <button class="btn btn-primary btn-sm"
              onclick="buildSmartRoute()">
              🗺️ View Route
            </button>

            <button class="btn btn-secondary btn-sm"
              onclick="aiOptimize()">
              ✨ Re-optimize
            </button>
          </div>

        </div>

        <div class="live-card">

          <div class="live-status">
            <span class="live-dot"></span>
            NEXT EXPERIENCE
          </div>

          <div class="next-stop">
            Local Culinary
          </div>

          <div class="eta">
            Dinner recommendation based on route.
          </div>

          <div class="travel-actions">
            <button class="btn btn-purple btn-sm"
              onclick="go('experience')">
              Open Experience
            </button>
          </div>

        </div>

      </div>

    `;

    target.classList.remove("hidden");
  }

  showToast("Live Journey aktif");
}

function addJourneyMedia(){

  showToast(
    "Media capture siap. Integrasi kamera/cloud storage dapat ditambahkan."
  );
}

/* =========================================================
   JOURNEY VIDEO
   ========================================================= */

function generateJourneyVideo(){

  const target=$("videoPreview");

  if(target){

    target.innerHTML=`

      <div>

        <div class="play-button">▶</div>

        <h3>AI Journey Video Preview</h3>

        <p class="text-muted">
          Storyboard perjalanan berhasil dibuat.
          Video generation API dapat dihubungkan pada tahap berikutnya.
        </p>

        <div class="travel-actions"
          style="justify-content:center">

          <button class="btn btn-primary"
            onclick="shareJourney('link')">
            Share Preview
          </button>

        </div>

      </div>

    `;

  }

  showToast("AI Journey Video storyboard berhasil dibuat");
}

function shareJourney(platform){

  const url=window.location.href;

  if(platform==="link"){

    if(navigator.clipboard){

      navigator.clipboard.writeText(url)
        .then(()=>{
          showToast("Journey link berhasil disalin");
        })
        .catch(()=>{
          showToast("Link siap dibagikan");
        });

    }else{
      showToast("Link Journey siap dibagikan");
    }

    return;
  }

  if(platform==="tiktok"){
    showToast("TikTok sharing API siap diintegrasikan");
    return;
  }

  if(platform==="youtube"){
    showToast("YouTube sharing API siap diintegrasikan");
    return;
  }

  if(platform==="facebook"){
    showToast("Facebook sharing API siap diintegrasikan");
  }
}

/* =========================================================
   CORPORATE / MICE
   ========================================================= */

function getCorporateData(){

  return {
    eventType:$("eventType")?.value || "Meeting",
    city:$("eventCity")?.value || "Bali",
    date:$("eventDate")?.value || "",
    duration:Number($("eventDuration")?.value || 2),
    participants:Number($("eventParticipants")?.value || 20),
    budget:Number($("eventBudget")?.value || 50000000),
    venue:$("eventVenue")?.value || "Hotel",
    layout:$("eventLayout")?.value || "Theater",
    food:$("eventFood")?.value || "Indonesian",
    coffee:$("eventCoffee")?.value || "2x Coffee Break",
    accommodation:$("eventAccommodation")?.value || "No Accommodation",
    transport:$("eventTransport")?.value || "Self Arranged",
    activity:$("eventActivity")?.checked || false,
    av:$("eventAV")?.checked || false,
    parking:$("eventParking")?.checked || false,
    wifi:$("eventWifi")?.checked || false
  };
}

function generateCorporateEvent(){

  const data=getCorporateData();

  const participants=Math.max(
    1,
    data.participants
  );

  const duration=Math.max(
    1,
    data.duration
  );

  let venueCost=8500000*duration;
  let foodCost=350000*participants*duration;
  let coffeeCost=100000*participants*duration;
  let transportCost=0;

  if(
    data.transport!=="Self Arranged" &&
    data.transport!==""
  ){
    transportCost=5000000;
  }

  let activityCost=data.activity
    ? 350000*participants
    : 0;

  let avCost=data.av
    ? 2500000*duration
    : 0;

  let accommodationCost=0;

  if(data.accommodation!=="No Accommodation"){
    accommodationCost=700000*participants;
  }

  let base=
    venueCost+
    foodCost+
    coffeeCost+
    transportCost+
    activityCost+
    avCost+
    accommodationCost;

  const best=Math.round(base*.9);
  const comfort=Math.round(base);
  const premium=Math.round(base*1.3);

  HBG.selectedCorporatePackage={
    data,
    best,
    comfort,
    premium
  };

  const target=$("corporatePackages");

  if(target){

    target.innerHTML=`

      ${corporatePackageHTML(
        "Best Value",
        best,
        data,
        "best"
      )}

      ${corporatePackageHTML(
        "Comfort",
        comfort,
        data,
        "comfort",
        true
      )}

      ${corporatePackageHTML(
        "Premium",
        premium,
        data,
        "premium"
      )}

    `;

    target.classList.remove("hidden");
  }

  showToast("Corporate package berhasil dibuat");
}

function corporatePackageHTML(
  title,
  price,
  data,
  key,
  featured=false
){

  return `
    <div class="corp-package ${featured?"featured":""}">

      ${featured
        ? `<span class="badge">AI RECOMMENDED</span>`
        : ""
      }

      <h3>${title}</h3>

      <p class="text-muted">
        ${escapeHTML(data.eventType)}
        · ${data.participants} pax
      </p>

      <div class="corp-price">
        ${formatIDR(price)}
      </div>

      <ul class="package-list">

        <li>${escapeHTML(data.venue)}</li>
        <li>${escapeHTML(data.layout)}</li>
        <li>${escapeHTML(data.food)}</li>
        <li>${escapeHTML(data.coffee)}</li>
        <li>${escapeHTML(data.accommodation)}</li>
        <li>${escapeHTML(data.transport)}</li>

        ${data.activity
          ? "<li>Team Building / Activity</li>"
          : ""
        }

        ${data.av
          ? "<li>AV Equipment</li>"
          : ""
        }

        ${data.parking
          ? "<li>Parking</li>"
          : ""
        }

        ${data.wifi
          ? "<li>Wi-Fi</li>"
          : ""
        }

      </ul>

      <button class="btn btn-primary full"
        onclick="addEventToCart('${key}')">
        Add Event Package
      </button>

    </div>
  `;
}

function optimizeCorporateEvent(){

  const budget=Number(
    $("eventBudget")?.value || 0
  );

  if(!HBG.selectedCorporatePackage){
    generateCorporateEvent();
  }

  const pkg=HBG.selectedCorporatePackage;

  let recommended="comfort";
  let price=pkg.comfort;

  if(budget>0){

    if(pkg.best<=budget){
      recommended="best";
      price=pkg.best;
    }else if(pkg.comfort<=budget){
      recommended="comfort";
      price=pkg.comfort;
    }else if(pkg.premium<=budget){
      recommended="premium";
      price=pkg.premium;
    }else{
      recommended="best";
      price=pkg.best;
    }
  }

  showToast(
    `AI memilih ${recommended} · ${formatIDR(price)}`
  );
}

function addEventToCart(style="comfort"){

  if(!HBG.selectedCorporatePackage){
    generateCorporateEvent();
  }

  const pkg=HBG.selectedCorporatePackage;

  const price=
    style==="best"
      ? pkg.best
      : style==="premium"
        ? pkg.premium
        : pkg.comfort;

  const item={
    id:"EVENT-"+Date.now(),
    category:"Corporate Event",
    name:`${pkg.data.eventType} · ${pkg.data.city}`,
    location:pkg.data.city,
    price,
    quantity:1,
    icon:"🏢",
    metadata:{
      ...pkg.data,
      package:style
    }
  };

  HBG.cart.push(item);

  saveState();
  updateCartUI();

  showToast("Corporate Event Package masuk ke cart");
}

/* =========================================================
   ADMIN
   ========================================================= */

function adminFeature(feature){

  const messages={
    products:"Product management module siap dikembangkan.",
    partners:"Partner onboarding & contract module siap.",
    bookings:"Booking management module siap.",
    api:"API integration layer siap untuk provider eksternal.",
    marketplace:"Marketplace inventory management siap."
  };

  showToast(
    messages[feature] ||
    "Admin feature siap dikembangkan."
  );
}

/* =========================================================
   DYNAMIC MODALS
   ========================================================= */

function addDynamicProductModal(){

  if($("productModal")){
    return;
  }

  const modal=document.createElement("div");

  modal.id="productModal";
  modal.className="modal-overlay";

  modal.innerHTML=`

    <div class="modal">

      <div class="modal-head">

        <h3 id="productModalTitle">
          Product Detail
        </h3>

        <button class="close-btn"
          onclick="closeProductModal()">
          ×
        </button>

      </div>

      <div class="modal-body"
        id="productModalBody">
      </div>

      <div class="modal-footer">

        <button class="btn btn-secondary"
          onclick="closeProductModal()">
          Close
        </button>

        <button class="btn btn-primary"
          onclick="addProductToCart()">
          Add to Cart
        </button>

      </div>

    </div>

  `;

  document.body.appendChild(modal);
}

function addDynamicBookingModal(){

  if($("bookingModal")){
    return;
  }

  const modal=document.createElement("div");

  modal.id="bookingModal";
  modal.className="modal-overlay";

  modal.innerHTML=`

    <div class="modal large">

      <div class="modal-head">

        <h3>Review & Booking</h3>

        <button class="close-btn"
          onclick="closeBookingModal()">
          ×
        </button>

      </div>

      <div class="modal-body">

        <div class="booking-layout">

          <div>

            <div class="form-grid">

              <div class="field">
                <label>Customer Name</label>
                <input id="customerName"
                  placeholder="Full name">
              </div>

              <div class="field">
                <label>Email</label>
                <input id="customerEmail"
                  type="email"
                  placeholder="email@example.com">
              </div>

              <div class="field">
                <label>Phone</label>
                <input id="customerPhone"
                  placeholder="+62">
              </div>

              <div class="field">
                <label>Company</label>
                <input id="customerCompany"
                  placeholder="Optional">
              </div>

            </div>

            <h3 class="mt-20">
              Payment
            </h3>

            <div class="payment-options">

              <button class="payment-option active"
                onclick="selectPayment('Demo Payment',this)">
                💳 Demo Payment
              </button>

              <button class="payment-option"
                onclick="selectPayment('Bank Transfer',this)">
                🏦 Bank Transfer
              </button>

              <button class="payment-option"
                onclick="selectPayment('Company Billing',this)">
                🧾 Company Billing
              </button>

            </div>

            <label class="checkbox-row">
              <input type="checkbox" id="bookingTerms">
              <span>
                Saya menyetujui syarat booking, cancellation,
                refund dan ketentuan HobbiGo.
              </span>
            </label>

          </div>

          <div class="summary-box">

            <h3>Order Summary</h3>

            <div id="bookingSummary"
              class="mt-15">
            </div>

          </div>

        </div>

      </div>

      <div class="modal-footer">

        <button class="btn btn-secondary"
          onclick="closeBookingModal()">
          Cancel
        </button>

        <button class="btn btn-primary"
          onclick="completeBooking()">
          Confirm & Book
        </button>

      </div>

    </div>

  `;

  document.body.appendChild(modal);
}

function addDynamicSuccessModal(){

  if($("successModal")){
    return;
  }

  const modal=document.createElement("div");

  modal.id="successModal";
  modal.className="modal-overlay";

  modal.innerHTML=`

    <div class="modal">

      <div class="modal-head">

        <h3>Booking Success</h3>

        <button class="close-btn"
          onclick="closeSuccessModal()">
          ×
        </button>

      </div>

      <div class="modal-body">

        <div class="success-box">

          <div class="success-icon">
            ✓
          </div>

          <h2>Booking Confirmed</h2>

          <p class="text-muted mt-10">
            Perjalanan Anda berhasil dibuat.
          </p>

          <div class="voucher">

            <div class="text-muted">
              Booking ID
            </div>

            <div class="voucher-code"
              id="successBookingId">
            </div>

            <div class="summary-row mt-15">

              <span>Total</span>

              <strong id="successBookingTotal">
              </strong>

            </div>

          </div>

        </div>

      </div>

      <div class="modal-footer">

        <button class="btn btn-secondary"
          onclick="printVoucher()">
          🖨️ Print Voucher
        </button>

        <button class="btn btn-primary"
          onclick="closeSuccessModal()">
          Done
        </button>

      </div>

    </div>

  `;

  document.body.appendChild(modal);
}

/* =========================================================
   PACKAGE BUILDER UI
   ========================================================= */

function renderPackageBuilder(){

  const target=$("selectedItems");

  if(!target){
    return;
  }

  if(!HBG.cart.length){

    target.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <strong>Belum ada komponen</strong>
        <p>Pilih produk dari Marketplace.</p>
      </div>
    `;

    return;
  }

  target.innerHTML=HBG.cart.map((item,index)=>`

    <div class="selected-item">

      <div class="selected-item-info">

        <div class="selected-item-icon">
          ${escapeHTML(item.icon||"🌍")}
        </div>

        <div>
          <strong>
            ${escapeHTML(item.name)}
          </strong>

          <div class="text-muted"
            style="font-size:11px">
            ${escapeHTML(item.category)}
          </div>
        </div>

      </div>

      <strong class="text-primary">
        ${formatIDR(item.price)}
      </strong>

      <button class="btn btn-danger btn-sm"
        onclick="removeFromCart(${index});renderPackageBuilder();">
        ×
      </button>

    </div>

  `).join("");

  updatePackageSummary();
}

/* =========================================================
   DOM EVENTS
   ========================================================= */

function bindEvents(){

  const search=
    $("marketplaceSearch") ||
    $("marketSearch");

  if(search){

    search.addEventListener("input",()=>{
      renderMarketplace();
    });

  }

  const sort=$("marketplaceSort");

  if(sort){

    sort.addEventListener("change",()=>{
      renderMarketplace();
    });

  }

  document.addEventListener("click",event=>{

    if(
      event.target.classList.contains("modal-overlay")
    ){
      event.target.classList.remove("show");
    }

  });
}

/* =========================================================
   DEFAULT DATE
   ========================================================= */

function setDefaultDates(){

  const today=new Date();

  const plusDays=(days)=>{
    const date=new Date(today);
    date.setDate(date.getDate()+days);

    return date.toISOString().split("T")[0];
  };

  const start=$("tripStartDate");

  if(start && !start.value){
    start.value=plusDays(7);
  }

  const heroDate=$("heroDate");

  if(heroDate && !heroDate.value){
    heroDate.value=plusDays(7);
  }

  const flightDeparture=$("flightDeparture");

  if(flightDeparture && !flightDeparture.value){
    flightDeparture.value=plusDays(7);
  }

  const hotelCheckin=$("hotelCheckin");

  if(hotelCheckin && !hotelCheckin.value){
    hotelCheckin.value=plusDays(7);
  }

  const hotelCheckout=$("hotelCheckout");

  if(hotelCheckout && !hotelCheckout.value){
    hotelCheckout.value=plusDays(10);
  }

  const eventDate=$("eventDate");

  if(eventDate && !eventDate.value){
    eventDate.value=plusDays(30);
  }
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

function initHobbiGo(){

  setDefaultDates();

  bindEvents();

  renderMarketplace();

  updateCartUI();

  renderBookings();

  renderPackageBuilder();

  addDynamicProductModal();
  addDynamicBookingModal();
  addDynamicSuccessModal();

  if($("successModal")){
    $("successModal").classList.remove("show");
  }

  if($("bookingModal")){
    $("bookingModal").classList.remove("show");
  }

  if($("productModal")){
    $("productModal").classList.remove("show");
  }

  showToast("HobbiGo V77 siap digunakan");
}

/* =========================================================
   GLOBAL WINDOW EXPORT
   ========================================================= */

window.go=go;
window.toggleLanguage=toggleLanguage;
window.openCart=openCart;
window.closeCart=closeCart;
window.toggleMobileMenu=toggleMobileMenu;
window.heroSearchGo=heroSearchGo;

window.selectCustomerType=selectCustomerType;
window.setTravelTab=setTravelTab;
window.searchFlights=searchFlights;
window.searchHotels=searchHotels;

window.selectPlanningMode=selectPlanningMode;
window.generateTrip=generateTrip;
window.buildSmartRoute=buildSmartRoute;
window.aiOptimize=aiOptimize;
window.addAITripToCart=addAITripToCart;

window.filterMarketplace=filterMarketplace;
window.renderMarketplace=renderMarketplace;
window.openProductModal=openProductModal;
window.closeProductModal=closeProductModal;
window.addProductToCart=addProductToCart;

window.removeFromCart=removeFromCart;
window.clearCart=clearCart;
window.checkoutCart=checkoutCart;

window.selectPackageStyle=selectPackageStyle;
window.updatePackageSummary=updatePackageSummary;

window.selectPayment=selectPayment;
window.completeBooking=completeBooking;
window.openBookingModal=openBookingModal;
window.closeBookingModal=closeBookingModal;
window.printVoucher=printVoucher;
window.closeSuccessModal=closeSuccessModal;

window.showTripTab=showTripTab;
window.openLiveJourney=openLiveJourney;
window.addJourneyMedia=addJourneyMedia;

window.generateJourneyVideo=generateJourneyVideo;
window.shareJourney=shareJourney;

window.generateCorporateEvent=generateCorporateEvent;
window.optimizeCorporateEvent=optimizeCorporateEvent;
window.addEventToCart=addEventToCart;

window.adminFeature=adminFeature;
window.renderPackageBuilder=renderPackageBuilder;

/* =========================================================
   START
   ========================================================= */

if(
  document.readyState==="loading"
){
  document.addEventListener(
    "DOMContentLoaded",
    initHobbiGo
  );
}else{
  initHobbiGo();
}
