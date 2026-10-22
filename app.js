/* =========================================================
   HOBBIGO V76.8
   AI JOURNEY & EXPERIENCE MARKETPLACE
========================================================= */


/* =========================================================
   PRODUCT DATABASE
   Struktur:
   id, name, category, location, price, image,
   lat, lng, provider, rating, duration, capacity,
   source, description
========================================================= */

const products = [

  /* =========================
     HOTELS
  ========================= */

  [
    "P01",
    "Bali Beach Resort",
    "Hotels",
    "Bali",
    850000,
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    -8.7486,
    115.1672,
    "HobbiGo Hotel Partner",
    4.6,
    "1 Night",
    2,
    "PARTNER",
    "Beach resort dekat area Bali Selatan."
  ],

  [
    "P02",
    "Ubud Jungle Resort",
    "Hotels",
    "Ubud",
    1250000,
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800&q=80",
    -8.5069,
    115.2625,
    "Ubud Local Partner",
    4.8,
    "1 Night",
    2,
    "PARTNER",
    "Jungle resort dengan suasana alam."
  ],

  [
    "P03",
    "Seminyak Comfort Hotel",
    "Hotels",
    "Seminyak",
    950000,
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80",
    -8.6913,
    115.1686,
    "HobbiGo Hotel Partner",
    4.5,
    "1 Night",
    2,
    "PARTNER",
    "Hotel comfort untuk traveler."
  ],


  /* =========================
     VILLA
  ========================= */

  [
    "P04",
    "Canggu Private Villa",
    "Villa",
    "Canggu",
    1800000,
    "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=800&q=80",
    -8.6478,
    115.1385,
    "Canggu Villa Partner",
    4.7,
    "1 Night",
    4,
    "PARTNER",
    "Private villa untuk family atau group."
  ],


  /* =========================
     HOME RENTAL
  ========================= */

  [
    "P05",
    "Bali Family Home",
    "Home Rental",
    "Denpasar",
    1100000,
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    -8.6705,
    115.2126,
    "Bali Home Partner",
    4.5,
    "1 Night",
    6,
    "PARTNER",
    "Private home untuk keluarga."
  ],


  /* =========================
     FLIGHTS
  ========================= */

  [
    "P07",
    "Flight Jakarta → Bali",
    "Flights",
    "Indonesia",
    950000,
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    -8.7486,
    115.1672,
    "Airline Partner",
    4.5,
    "1 Flight",
    1,
    "API",
    "Penerbangan CGK → DPS."
  ],

  [
    "P08",
    "Flight Jakarta → Singapore",
    "Flights",
    "Singapore",
    1200000,
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    1.3644,
    103.9915,
    "Airline Partner",
    4.6,
    "1 Flight",
    1,
    "API",
    "Penerbangan CGK → SIN."
  ],


  /* =========================
     VEHICLE
  ========================= */

  [
    "P09",
    "Toyota Alphard Rental",
    "Cars",
    "Bali",
    2500000,
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    -8.6738,
    115.2126,
    "HobbiGo Vehicle Partner",
    4.7,
    "1 Day",
    6,
    "PARTNER",
    "Luxury vehicle dengan driver."
  ],

  [
    "P10",
    "Toyota Innova Rental",
    "Cars",
    "Bali",
    850000,
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    -8.6705,
    115.2126,
    "Bali Transport Partner",
    4.6,
    "1 Day",
    7,
    "PARTNER",
    "MPV untuk family dan group."
  ],


  /* =========================
     TOUR
  ========================= */

  [
    "P11",
    "Uluwatu Sunset Tour",
    "Tour",
    "Uluwatu",
    650000,
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    -8.8291,
    115.0849,
    "Bali Tour Partner",
    4.8,
    "6 Hours",
    10,
    "PARTNER",
    "Tour Uluwatu dan sunset experience."
  ],


  /* =========================
     ATTRACTION
  ========================= */

  [
    "P12",
    "Uluwatu Temple",
    "Attraction",
    "Uluwatu",
    150000,
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    -8.8291,
    115.0849,
    "Local Attraction",
    4.8,
    "3 Hours",
    100,
    "PARTNER",
    "Salah satu landmark Bali."
  ],


  /* =========================
     ACTIVITIES
  ========================= */

  [
    "P13",
    "Morning Yoga Ubud",
    "Activity",
    "Ubud",
    250000,
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    -8.5069,
    115.2625,
    "Yoga Partner",
    4.9,
    "2 Hours",
    15,
    "PARTNER",
    "Morning yoga dan meditation."
  ],

  [
    "P14",
    "Sunset Yoga Canggu",
    "Activity",
    "Canggu",
    300000,
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    -8.6478,
    115.1385,
    "Yoga Canggu",
    4.8,
    "2 Hours",
    20,
    "PARTNER",
    "Sunset yoga experience."
  ],

  [
    "P15",
    "Bali Diving Experience",
    "Activity",
    "Nusa Dua",
    850000,
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    -8.8005,
    115.2312,
    "Diving Partner",
    4.9,
    "4 Hours",
    12,
    "PARTNER",
    "Diving experience untuk traveler."
  ],


  /* =========================
     RESTAURANT
  ========================= */

  [
    "P20",
    "Jimbaran Seafood Dinner",
    "Restaurant",
    "Jimbaran",
    550000,
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    -8.7846,
    115.1627,
    "Jimbaran Culinary Partner",
    4.7,
    "2 Hours",
    4,
    "PARTNER",
    "Seafood dinner experience."
  ],

  [
    "P21",
    "Ubud Local Culinary",
    "Restaurant",
    "Ubud",
    250000,
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
    -8.5069,
    115.2625,
    "Ubud Culinary Partner",
    4.8,
    "2 Hours",
    4,
    "PARTNER",
    "Local Balinese culinary experience."
  ],


  /* =========================
     BOAT
  ========================= */

  [
    "P22",
    "Nusa Penida Boat Transfer",
    "Boat",
    "Sanur",
    450000,
    "https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=800&q=80",
    -8.7096,
    115.2625,
    "Boat Partner",
    4.6,
    "45 Minutes",
    30,
    "PARTNER",
    "Fast boat menuju Nusa Penida."
  ],


  /* =========================
     MEETING POINT
  ========================= */

  [
    "P23",
    "Bali Corporate Meeting Point",
    "Meeting Point",
    "Nusa Dua",
    3500000,
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    -8.8005,
    115.2312,
    "Event Partner",
    4.6,
    "1 Day",
    50,
    "PARTNER",
    "Meeting dan corporate event venue."
  ],


  /* =========================
     HOBBY
  ========================= */

  [
    "P24",
    "Bali Cooking Class",
    "Hobby",
    "Ubud",
    450000,
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    -8.5069,
    115.2625,
    "Cooking Partner",
    4.9,
    "3 Hours",
    12,
    "PARTNER",
    "Balinese cooking experience."
  ]

];


/* =========================================================
   MARKETPLACE CATEGORIES
========================================================= */

const cats = [

  "All",
  "Hotels",
  "Villa",
  "Home Rental",
  "Flights",
  "Cars",
  "Tour",
  "Attraction",
  "Activity",
  "Hobby",
  "Restaurant",
  "Boat",
  "Meeting Point"

];

let activeCat = "All";


/* =========================================================
   LOCAL STORAGE
========================================================= */

let cart =
  JSON.parse(
    localStorage.getItem("hbg_cart") || "[]"
  );

let bookings =
  JSON.parse(
    localStorage.getItem("hbg_bookings") || "[]"
  );


/* =========================================================
   GLOBAL STATE
========================================================= */

let mapInstance = null;

let routeLayer = null;

let customerType = "Personal";

let planningMode = "AI Plan";

let packageStyle = "Comfort";

let currentTrip = null;


/* =========================================================
   HELPERS
========================================================= */

function money(n){

  return "Rp " +
    Number(n || 0).toLocaleString("id-ID");

}


function save(){

  localStorage.setItem(
    "hbg_cart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "hbg_bookings",
    JSON.stringify(bookings)
  );

}


function go(id){

  const el =
    document.getElementById(id);

  if(el){

    el.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  }

}


function toast(text){

  const t =
    document.getElementById("toast");

  if(!t) return;

  t.textContent = text;

  t.style.display = "block";

  clearTimeout(window.hbgToastTimer);

  window.hbgToastTimer =
    setTimeout(()=>{

      t.style.display = "none";

    },2200);

}


function getProduct(id){

  return products.find(
    p => p[0] === id
  );

}


function productPrice(id){

  const p = getProduct(id);

  return p ? Number(p[4]) : 0;

}


function cartSubtotal(){

  return cart.reduce(
    (sum,item)=>
      sum + productPrice(item.id) * item.qty,
    0
  );

}


function cartCount(){

  return cart.reduce(
    (sum,item)=>sum + item.qty,
    0
  );

}


/* =========================================================
   CUSTOMER TYPE
========================================================= */

function selectCustomerType(button,type){

  customerType = type;

  document
    .querySelectorAll("#customerTypeChips .chip")
    .forEach(
      x => x.classList.remove("active")
    );

  button.classList.add("active");

  const input =
    document.getElementById("customerType");

  if(input)
    input.value = type;

  toast(
    "Traveler type: " + type
  );

}


/* =========================================================
   PLANNING MODE
========================================================= */

function selectPlanningMode(button,mode){

  planningMode = mode;

  document
    .querySelectorAll("#planner .chips .chip")
    .forEach(
      x => x.classList.remove("active")
    );

  button.classList.add("active");

  const input =
    document.getElementById("planningMode");

  if(input)
    input.value = mode;

  toast(
    "Planning mode: " + mode
  );

}


/* =========================================================
   PACKAGE STYLE
========================================================= */

function selectPackageStyle(button,style){

  packageStyle = style;

  document
    .querySelectorAll("#package .chips .chip")
    .forEach(
      x => x.classList.remove("active")
    );

  button.classList.add("active");

  const input =
    document.getElementById("packageStyle");

  if(input)
    input.value = style;

  toast(
    "Package style: " + style
  );

}


/* =========================================================
   SEARCH TABS
========================================================= */

function switchSearchTab(btn,type){

  document
    .querySelectorAll("#search-hub .tab")
    .forEach(
      t => t.classList.remove("active")
    );

  btn.classList.add("active");

  const hotel =
    document.getElementById("form-hotel");

  const flight =
    document.getElementById("form-flight");

  if(hotel)
    hotel.style.display =
      type === "hotel"
        ? "block"
        : "none";

  if(flight)
    flight.style.display =
      type === "flight"
        ? "block"
        : "none";

  const results =
    document.getElementById("search-results");

  if(results)
    results.style.display = "none";

}


/* =========================================================
   SEARCH ENGINE
========================================================= */

function executeNewSearch(type){

  const resDiv =
    document.getElementById("search-results");

  const listDiv =
    document.getElementById("res-list");

  const title =
    document.getElementById("res-title");

  if(!resDiv || !listDiv)
    return;

  let arr = [];

  if(type === "hotel"){

    const destination =
      (
        document.getElementById(
          "hotelDestination"
        )?.value || ""
      ).toLowerCase();

    arr =
      products.filter(p =>
        p[2] === "Hotels" &&
        (
          !destination ||
          p[3].toLowerCase().includes(destination) ||
          p[1].toLowerCase().includes(destination)
        )
      );

    title.innerText =
      "Hotel Results";

  }

  else{

    arr =
      products.filter(
        p => p[2] === "Flights"
      );

    title.innerText =
      "Flight Results";

  }


  resDiv.style.display = "block";

  listDiv.innerHTML =
    arr.length
      ? arr.map(renderProductCard).join("")
      : `
        <div class="emptyState">
          <h3>No results found</h3>
          <p>
            Coba destination atau kategori lainnya.
          </p>
        </div>
      `;

}


/* =========================================================
   MARKETPLACE CHIPS
========================================================= */

function renderChips(){

  const el =
    document.getElementById("chips");

  if(!el) return;

  el.innerHTML =
    cats.map(c => `

      <button
        class="chip ${activeCat===c ? "active" : ""}"
        onclick="setCat('${c}')"
      >
        ${categoryIcon(c)}
        ${c}
      </button>

    `).join("");

}


function categoryIcon(category){

  const icons = {

    "All":"🌐",
    "Hotels":"🏨",
    "Villa":"🏡",
    "Home Rental":"🏠",
    "Flights":"✈️",
    "Cars":"🚗",
    "Tour":"🗺️",
    "Attraction":"🎯",
    "Activity":"🎯",
    "Hobby":"🎨",
    "Restaurant":"🍜",
    "Boat":"🚤",
    "Meeting Point":"🏢"

  };

  return icons[category] || "•";

}


function setCat(c){

  activeCat = c;

  renderChips();

  renderProducts();

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function renderProductCard(p){

  return `

    <div class="card">

      <div
        class="cardImage"
        style="
          background-image:url('${p[5]}')
        "
      >

        <span class="tag">
          ${p[2]}
        </span>

      </div>


      <div class="cardBody">

        <h3>
          ${p[1]}
        </h3>

        <p class="muted">
          <i class="fa-solid fa-location-dot"></i>
          ${p[3]}
        </p>

        <p class="muted">
          ⭐ ${p[9] || "-"}
          &nbsp; • &nbsp;
          ${p[10] || ""}
        </p>

        <div class="price">
          ${money(p[4])}
        </div>

        <small class="muted">
          Provider: ${p[8] || "HobbiGo"}
        </small>

        <div class="cardActions">

          <button
            class="small"
            onclick="add('${p[0]}')"
          >
            + Add
          </button>

          <button
            class="small"
            onclick="viewProduct('${p[0]}')"
          >
            Details
          </button>

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(){

  const el =
    document.getElementById("products");

  if(!el) return;

  const q =
    (
      document.getElementById(
        "marketSearch"
      )?.value || ""
    ).toLowerCase();

  let arr =
    products.filter(p => {

      const categoryMatch =
        activeCat === "All" ||
        p[2] === activeCat;

      const searchMatch =
        p.join(" ")
          .toLowerCase()
          .includes(q);

      return categoryMatch &&
        searchMatch;

    });


  const sort =
    document.getElementById(
      "sort"
    )?.value || "default";


  if(sort === "low"){

    arr.sort(
      (a,b) => Number(a[4]) - Number(b[4])
    );

  }

  if(sort === "high"){

    arr.sort(
      (a,b) => Number(b[4]) - Number(a[4])
    );

  }


  el.innerHTML =
    arr.length
      ? arr.map(renderProductCard).join("")
      : `
        <div class="emptyState">
          <h3>No product found</h3>
          <p>
            Coba ubah pencarian atau kategori.
          </p>
        </div>
      `;


  updateCart();

}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function viewProduct(id){

  const p = getProduct(id);

  if(!p) return;

  openModal(`

    <button
      class="close"
      onclick="closeModal()"
    >
      ×
    </button>

    <img
      src="${p[5]}"
      style="
        width:100%;
        max-height:300px;
        object-fit:cover;
        border-radius:15px;
      "
    >

    <h2>
      ${p[1]}
    </h2>

    <p class="muted">
      ${p[2]} • ${p[3]}
    </p>

    <div class="resultGrid">

      <div class="resultStat">
        <span>Price</span>
        <b>${money(p[4])}</b>
      </div>

      <div class="resultStat">
        <span>Rating</span>
        <b>⭐ ${p[9]}</b>
      </div>

      <div class="resultStat">
        <span>Duration</span>
        <b>${p[10]}</b>
      </div>

      <div class="resultStat">
        <span>Capacity</span>
        <b>${p[11]}</b>
      </div>

    </div>

    <div class="notice">

      <b>Provider</b>

      <p>
        ${p[8]}
      </p>

      <b>Source</b>

      <p>
        ${p[12]}
      </p>

      <p>
        ${p[13]}
      </p>

    </div>

    <button
      class="primary"
      onclick="
        add('${p[0]}');
        closeModal();
      "
    >
      <i class="fa-solid fa-cart-plus"></i>
      Add to My Cart
    </button>

  `);

}


/* =========================================================
   CART
========================================================= */

function add(id){

  const item =
    cart.find(x => x.id === id);

  if(item){

    item.qty++;

  }else{

    cart.push({
      id:id,
      qty:1
    });

  }

  save();

  updateCart();

  toast("Added to My Cart");

}


function removeCartItem(id){

  cart =
    cart.filter(
      x => x.id !== id
    );

  save();

  updateCart();

  openCart();

}


function changeQty(id,delta){

  const item =
    cart.find(
      x => x.id === id
    );

  if(!item) return;

  item.qty += delta;

  if(item.qty <= 0){

    cart =
      cart.filter(
        x => x.id !== id
      );

  }

  save();

  updateCart();

  openCart();

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart(){

  const count =
    cartCount();

  const subtotal =
    cartSubtotal();

  const final =
    subtotal * 1.05;


  const cartCountEl =
    document.getElementById(
      "cartCount"
    );

  if(cartCountEl)
    cartCountEl.textContent = count;


  const pkgItems =
    document.getElementById(
      "pkgItems"
    );

  if(pkgItems)
    pkgItems.textContent = count;


  const pkgTotal =
    document.getElementById(
      "pkgTotal"
    );

  if(pkgTotal)
    pkgTotal.textContent =
      money(subtotal);


  const pkgFinal =
    document.getElementById(
      "pkgFinal"
    );

  if(pkgFinal)
    pkgFinal.textContent =
      money(final);


  const adminCart =
    document.getElementById(
      "adminCart"
    );

  if(adminCart)
    adminCart.textContent =
      count;

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart(){

  const list =
    cart.map(item => {

      const p =
        getProduct(item.id);

      if(!p) return "";

      return `

        <div class="summaryItem">

          <span>

            <b>
              ${p[1]}
            </b>

            <br>

            <small class="muted">
              ${p[2]} • ${p[3]}
            </small>

            <br>

            <button
              class="small"
              onclick="changeQty('${item.id}',-1)"
            >
              −
            </button>

            <strong>
              ${item.qty}
            </strong>

            <button
              class="small"
              onclick="changeQty('${item.id}',1)"
            >
              +
            </button>

            <button
              class="small"
              onclick="removeCartItem('${item.id}')"
            >
              Remove
            </button>

          </span>

          <span>
            ${money(p[4] * item.qty)}
          </span>

        </div>

      `;

    }).join("");


  const subtotal =
    cartSubtotal();

  const total =
    subtotal * 1.05;


  openModal(`

    <button
      class="close"
      onclick="closeModal()"
    >
      ×
    </button>

    <h2>
      🛒 My Cart
    </h2>

    ${
      list ||
      `
      <div class="emptyState">
        <h3>Your cart is empty</h3>
        <p>
          Tambahkan hotel, flight,
          activity atau produk lainnya.
        </p>
      </div>
      `
    }


    ${
      cart.length
      ? `

        <div class="summary">

          <div class="summaryItem">

            <b>
              Subtotal
            </b>

            <b class="price">
              ${money(subtotal)}
            </b>

          </div>

          <div class="summaryItem">

            <span>
              Service Demo 5%
            </span>

            <span>
              ${money(subtotal * .05)}
            </span>

          </div>

          <div class="summaryItem">

            <b>
              Estimated Final
            </b>

            <b class="price">
              ${money(total)}
            </b>

          </div>

        </div>

        <button
          class="primary full-width"
          onclick="startCheckout()"
        >
          Checkout & Pay →
        </button>

      `
      : ""
    }

  `);

}


/* =========================================================
   AI TRIP PLANNER
========================================================= */

function generateTrip(){

  const destination =
    document.getElementById(
      "dest"
    )?.value || "Bali";

  const people =
    Number(
      document.getElementById(
        "people"
      )?.value || 1
    );

  const duration =
    Number(
      document.getElementById(
        "duration"
      )?.value || 3
    );

  const style =
    document.getElementById(
      "tripStyle"
    )?.value || packageStyle;

  const interest =
    document.getElementById(
      "interest"
    )?.value || "Beach";


  currentTrip = {

    destination,
    people,
    duration,
    style,
    interest,
    customerType,
    planningMode

  };


  const recommended =
    buildAIRecommendations(
      destination,
      interest,
      style,
      people,
      duration
    );


  const estimated =
    recommended.reduce(
      (sum,p) =>
        sum + Number(p[4]),
      0
    );


  const tripResult =
    document.getElementById(
      "tripResult"
    );


  if(tripResult){

    tripResult.innerHTML = `

      <div class="result">

        <h3>
          ✨ AI Recommended Trip:
          ${destination}
        </h3>

        <p class="muted">

          ${customerType}
          •
          ${planningMode}
          •
          ${duration} Days
          •
          ${style}
          •
          ${interest}

        </p>


        <div class="resultGrid">

          <div class="resultStat">

            <span>
              Travelers
            </span>

            <b>
              ${people}
            </b>

          </div>


          <div class="resultStat">

            <span>
              Duration
            </span>

            <b>
              ${duration} Days
            </b>

          </div>


          <div class="resultStat">

            <span>
              Interest
            </span>

            <b>
              ${interest}
            </b>

          </div>


          <div class="resultStat">

            <span>
              Estimated
            </span>

            <b>
              ${money(estimated * people)}
            </b>

          </div>

        </div>


        <h4>
          Recommended Experience
        </h4>

        <div>

          ${
            recommended
              .map(
                p => `
                  <div class="summaryItem">

                    <span>
                      ${p[1]}
                      <small class="muted">
                        (${p[2]})
                      </small>
                    </span>

                    <b>
                      ${money(p[4])}
                    </b>

                  </div>
                `
              )
              .join("")
          }

        </div>


        <button
          class="primary"
          onclick="aiAdd()"
        >
          Add AI Package to Cart
        </button>


        <button
          class="secondary"
          onclick="buildSmartRoute()"
          style="margin-left:8px;"
        >
          <i class="fa-solid fa-route"></i>
          Build Smart Route
        </button>

      </div>

    `;

  }


  document.getElementById(
    "map"
  ).style.display = "block";


  buildSmartRoute();


  toast(
    "AI Trip generated"
  );

}


/* =========================================================
   AI RECOMMENDATION ENGINE
========================================================= */

function buildAIRecommendations(
  destination,
  interest,
  style,
  people,
  duration
){

  let result = [];


  /* HOTEL */

  let hotels =
    products.filter(
      p =>
        p[2] === "Hotels" ||
        p[2] === "Villa" ||
        p[2] === "Home Rental"
    );


  if(style === "Exclusive"){

    hotels =
      hotels.sort(
        (a,b) =>
          Number(b[4]) -
          Number(a[4])
      );

  }else{

    hotels =
      hotels.sort(
        (a,b) =>
          Number(a[4]) -
          Number(b[4])
      );

  }


  if(hotels.length)
    result.push(hotels[0]);


  /* ACTIVITY */

  let activities =
    products.filter(
      p =>
        p[2] === "Activity" ||
        p[2] === "Hobby"
    );


  if(interest === "Yoga"){

    activities =
      activities.filter(
        p =>
          p[1]
            .toLowerCase()
            .includes("yoga")
      );

  }

  if(interest === "Culinary"){

    activities =
      products.filter(
        p =>
          p[2] === "Restaurant"
      );

  }

  if(interest === "Adventure"){

    activities =
      activities.filter(
        p =>
          p[1]
            .toLowerCase()
            .includes("diving")
      );

  }


  if(activities.length)
    result.push(activities[0]);


  /* ATTRACTION */

  const attraction =
    products.find(
      p =>
        p[2] === "Attraction"
    );

  if(attraction)
    result.push(attraction);


  /* RESTAURANT */

  const restaurant =
    products.find(
      p =>
        p[2] === "Restaurant"
    );

  if(restaurant)
    result.push(restaurant);


  return result;

}


/* =========================================================
   ADD AI PACKAGE
========================================================= */

function aiAdd(){

  if(!currentTrip){

    generateTrip();

    return;

  }


  const recommendations =
    buildAIRecommendations(
      currentTrip.destination,
      currentTrip.interest,
      currentTrip.style,
      currentTrip.people,
      currentTrip.duration
    );


  recommendations.forEach(
    p => {

      if(
        !cart.find(
          x => x.id === p[0]
        )
      ){

        cart.push({
          id:p[0],
          qty:1
        });

      }

    }
  );


  save();

  updateCart();

  go("package");

  toast(
    "AI package added to cart"
  );

}


/* =========================================================
   SMART ROUTE
========================================================= */

async function buildSmartRoute(){

  const destination =
    document.getElementById(
      "dest"
    )?.value || "Bali";


  const routeProducts =
    getRouteProducts();


  if(!routeProducts.length){

    toast(
      "Belum ada titik route."
    );

    return;

  }


  const map =
    document.getElementById(
      "map"
    );


  if(!map)
    return;


  map.style.display =
    "block";


  if(mapInstance){

    mapInstance.remove();

    mapInstance = null;

  }


  mapInstance =
    L.map(
      "map"
    ).setView(
      [
        -8.7486,
        115.1672
      ],
      11
    );


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom:19,
      attribution:
        '&copy; OpenStreetMap contributors'
    }
  ).addTo(
    mapInstance
  );


  const coordinates =
    routeProducts.map(
      p => [
        Number(p[6]),
        Number(p[7])
      ]
    );


  routeProducts.forEach(
    (p,index) => {

      L.marker(
        [
          Number(p[6]),
          Number(p[7])
        ]
      )
      .addTo(mapInstance)
      .bindPopup(`
        <b>
          ${index + 1}. ${p[1]}
        </b>
        <br>
        ${p[2]}
        <br>
        ${p[3]}
      `);

    }
  );


  try{

    const coordString =
      coordinates
        .map(
          c => `${c[1]},${c[0]}`
        )
        .join(";");


    const url =
      `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson&steps=true`;


    const response =
      await fetch(url);


    if(!response.ok)
      throw new Error(
        "Routing unavailable"
      );


    const data =
      await response.json();


    if(
      data.routes &&
      data.routes.length
    ){

      const route =
        data.routes[0];


      if(routeLayer)
        routeLayer.remove();


      routeLayer =
        L.geoJSON(
          route.geometry,
          {
            style:{
              color:"#087f5b",
              weight:6,
              opacity:.85
            }
          }
        ).addTo(
          mapInstance
        );


      mapInstance.fitBounds(
        routeLayer.getBounds(),
        {
          padding:[30,30]
        }
      );


      const distanceKm =
        route.distance / 1000;


      const minutes =
        Math.round(
          route.duration / 60
        );


      updateRouteSummary(
        distanceKm,
        minutes,
        routeProducts.length,
        "LIVE ROUTE"
      );


    }else{

      fallbackRoute(
        coordinates,
        routeProducts
      );

    }

  }catch(error){

    console.warn(
      "OSRM unavailable:",
      error
    );


    fallbackRoute(
      coordinates,
      routeProducts
    );

  }

}


/* =========================================================
   ROUTE PRODUCTS
========================================================= */

function getRouteProducts(){

  let selected =
    cart
      .map(
        item =>
          getProduct(item.id)
      )
      .filter(Boolean);


  if(
    selected.length >= 2
  ){

    return selected;

  }


  if(currentTrip){

    const rec =
      buildAIRecommendations(
        currentTrip.destination,
        currentTrip.interest,
        currentTrip.style,
        currentTrip.people,
        currentTrip.duration
      );

    return rec;

  }


  return [

    getProduct("P07"),
    getProduct("P01"),
    getProduct("P20")

  ].filter(Boolean);

}


/* =========================================================
   FALLBACK ROUTE
========================================================= */

function fallbackRoute(
  coordinates,
  routeProducts
){

  if(routeLayer)
    routeLayer.remove();


  routeLayer =
    L.polyline(
      coordinates,
      {
        color:"#087f5b",
        weight:5,
        dashArray:"10,10"
      }
    ).addTo(
      mapInstance
    );


  if(coordinates.length){

    mapInstance.fitBounds(
      routeLayer.getBounds(),
      {
        padding:[30,30]
      }
    );

  }


  let totalDistance = 0;


  for(
    let i=1;
    i<coordinates.length;
    i++
  ){

    totalDistance +=
      haversine(
        coordinates[i-1][0],
        coordinates[i-1][1],
        coordinates[i][0],
        coordinates[i][1]
      );

  }


  const estimatedMinutes =
    Math.round(
      totalDistance / 35 * 60
    );


  updateRouteSummary(
    totalDistance,
    estimatedMinutes,
    routeProducts.length,
    "ESTIMATED ROUTE"
  );

}


/* =========================================================
   HAVERSINE
========================================================= */

function haversine(
  lat1,
  lon1,
  lat2,
  lon2
){

  const R =
    6371;

  const dLat =
    (lat2-lat1)
    * Math.PI / 180;

  const dLon =
    (lon2-lon1)
    * Math.PI / 180;


  const a =
    Math.sin(dLat/2) *
    Math.sin(dLat/2) +

    Math.cos(
      lat1 * Math.PI / 180
    ) *

    Math.cos(
      lat2 * Math.PI / 180
    ) *

    Math.sin(dLon/2) *
    Math.sin(dLon/2);


  return R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1-a)
    );

}


/* =========================================================
   ROUTE SUMMARY
========================================================= */

function updateRouteSummary(
  distanceKm,
  minutes,
  stops,
  status
){

  const distanceText =
    distanceKm < 1
      ? distanceKm.toFixed(2) + " km"
      : distanceKm.toFixed(1) + " km";


  const timeText =
    minutes < 60
      ? minutes + " min"
      : Math.floor(minutes/60) +
        "h " +
        (minutes%60) +
        "m";


  const distanceEl =
    document.getElementById(
      "journeyDistance"
    );

  const timeEl =
    document.getElementById(
      "journeyTime"
    );

  const stopsEl =
    document.getElementById(
      "journeyStops"
    );

  const statusEl =
    document.getElementById(
      "routeStatus"
    );


  if(distanceEl)
    distanceEl.textContent =
      distanceText;

  if(timeEl)
    timeEl.textContent =
      timeText;

  if(stopsEl)
    stopsEl.textContent =
      stops;

  if(statusEl)
    statusEl.textContent =
      status;


  const summary =
    document.getElementById(
      "routeSummary"
    );


  if(summary){

    summary.innerHTML = `

      <div class="routeInfo">

        <div class="routeBox">

          <small>
            Distance
          </small>

          <strong>
            ${distanceText}
          </strong>

        </div>

        <div class="routeBox">

          <small>
            Travel Time
          </small>

          <strong>
            ${timeText}
          </strong>

        </div>

        <div class="routeBox">

          <small>
            Stops
          </small>

          <strong>
            ${stops}
          </strong>

        </div>

      </div>

      <div
        class="notice"
        style="margin-top:12px;"
      >

        <b>
          Smart Route Status:
        </b>

        ${status}

      </div>

    `;

  }

}


/* =========================================================
   BUDGET ENGINE
========================================================= */

function checkBudget(){

  const budget =
    Number(
      document.getElementById(
        "budgetInput"
      )?.value || 0
    );


  const status =
    document.getElementById(
      "budgetStatus"
    );


  if(!status)
    return;


  if(!budget){

    status.textContent =
      "Masukkan target budget.";

    return;

  }


  const total =
    cartSubtotal() * 1.05;


  if(total <= budget){

    status.innerHTML =
      `
      ✅ Within budget
      <br>
      ${money(
        budget-total
      )}
      remaining
      `;

  }else{

    status.innerHTML =
      `
      ⚠️ Over budget
      <br>
      ${money(
        total-budget
      )}
      above target
      `;

  }

}


/* =========================================================
   AI RE-OPTIMIZATION
========================================================= */

function aiOptimize(){

  const budget =
    Number(
      document.getElementById(
        "budgetInput"
      )?.value || 0
    );


  if(!budget){

    toast(
      "Masukkan target budget terlebih dahulu."
    );

    return;

  }


  let total =
    cartSubtotal() * 1.05;


  if(total <= budget){

    checkBudget();

    toast(
      "Package sudah sesuai budget."
    );

    return;

  }


  /* Remove expensive optional items first */

  const sorted =
    [...cart]
      .sort(
        (a,b) =>
          productPrice(b.id) -
          productPrice(a.id)
      );


  for(
    const item of sorted
  ){

    if(total <= budget)
      break;


    const index =
      cart.findIndex(
        x => x.id === item.id
      );


    if(index >= 0){

      cart.splice(
        index,
        1
      );

    }


    total =
      cartSubtotal() * 1.05;

  }


  save();

  updateCart();

  checkBudget();

  toast(
    "AI package berhasil dioptimalkan."
  );

}


/* =========================================================
   CHECKOUT
========================================================= */

function startCheckout(){

  if(!cart.length){

    toast(
      "Cart masih kosong."
    );

    return;

  }


  const subtotal =
    cartSubtotal();


  const total =
    subtotal * 1.05;


  const trxId =
    "HBG-" +
    Date.now()
      .toString()
      .slice(-8);


  const qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAY-${trxId}-${total}`;


  openModal(`

    <button
      class="close"
      onclick="closeModal()"
    >
      ×
    </button>

    <h2>
      💳 Pembayaran HobbiGo
    </h2>

    <p class="muted">
      Demo payment gateway.
      Integrasi payment provider dilakukan
      pada tahap production.
    </p>

    <div style="
      text-align:center;
      margin:20px 0;
    ">

      <img
        src="${qrUrl}"
        style="
          border-radius:10px;
          border:2px solid #087f5b;
          width:200px;
        "
      >

    </div>


    <div class="summary">

      <div class="summaryItem">

        <b>
          ID Transaksi
        </b>

        <span>
          ${trxId}
        </span>

      </div>

      <div class="summaryItem">

        <b>
          Total
        </b>

        <b class="price">
          ${money(total)}
        </b>

      </div>

    </div>


    <button
      class="primary full-width"
      onclick="
        simulatePayment(
          '${trxId}',
          ${total}
        )
      "
    >
      ✅ Simulasi Pembayaran Sukses
    </button>

  `);

}


/* =========================================================
   PAYMENT
========================================================= */

function simulatePayment(
  trxId,
  total
){

  const qrVerify =
    `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=VERIFIED-${trxId}`;


  const items =
    cart.map(
      i => {

        const p =
          getProduct(i.id);

        if(!p)
          return "";

        return `

          <div class="receipt-row">

            <span>
              ${p[1]}
              × ${i.qty}
            </span>

            <span>
              ${money(
                p[4] * i.qty
              )}
            </span>

          </div>

        `;

      }
    ).join("");


  bookings.unshift({

    no:trxId,

    total:total,

    date:
      new Date()
        .toLocaleDateString(
          "id-ID"
        ),

    status:"PAID",

    customerType,

    planningMode,

    packageStyle,

    items:
      [...cart]

  });


  save();


  cart = [];

  save();

  updateCart();

  renderAccount();


  openModal(`

    <div
      id="print-area"
      style="
        background:#fff;
        color:#000;
        padding:20px;
        border-radius:10px;
      "
    >

      <div
        style="
          text-align:center;
          border-bottom:2px dashed #ccc;
          padding-bottom:10px;
          margin-bottom:10px;
        "
      >

        <h2
          style="
            color:#087f5b;
            margin:0;
          "
        >
          HobbiGo E-Ticket
        </h2>

        <small>
          Bukti Pembayaran Demo
        </small>

      </div>


      <div class="receipt-row">

        <b>
          ID Transaksi
        </b>

        <span>
          ${trxId}
        </span>

      </div>


      <div class="receipt-row">

        <b>
          Tanggal
        </b>

        <span>
          ${new Date().toLocaleString(
            "id-ID"
          )}
        </span>

      </div>


      <div class="receipt-row">

        <b>
          Traveler Type
        </b>

        <span>
          ${customerType}
        </span>

      </div>


      <div class="receipt-row">

        <b>
          Status
        </b>

        <span
          style="
            color:green;
            font-weight:bold;
          "
        >
          LUNAS
        </span>

      </div>


      <hr
        style="
          border-top:1px solid #ccc;
          margin:10px 0;
        "
      >


      ${items}


      <hr
        style="
          border-top:1px solid #ccc;
          margin:10px 0;
        "
      >


      <div
        class="receipt-row"
        style="
          font-size:18px;
          font-weight:bold;
        "
      >

        <b>
          Total
        </b>

        <span>
          ${money(total)}
        </span>

      </div>


      <div
        style="
          text-align:center;
          margin-top:20px;
        "
      >

        <img
          src="${qrVerify}"
          style="width:120px;"
        >

        <p
          style="
            font-size:10px;
            color:#666;
          "
        >
          Tunjukkan E-Ticket ini saat check-in.
        </p>

      </div>

    </div>


    <button
      class="primary full-width"
      style="margin-top:15px;"
      onclick="printTicket()"
    >
      <i class="fa-solid fa-print"></i>
      Cetak Faktur
    </button>


    <button
      class="secondary full-width"
      style="margin-top:10px;"
      onclick="
        closeModal();
        go('account');
      "
    >
      Lihat My Trips
    </button>

  `);


  toast(
    "Payment berhasil — E-Ticket dibuat."
  );

}


/* =========================================================
   PRINT TICKET
========================================================= */

function printTicket(){

  const printArea =
    document.getElementById(
      "print-area"
    );

  if(!printArea)
    return;


  const printContent =
    printArea.innerHTML;


  const originalContent =
    document.body.innerHTML;


  document.body.innerHTML =
    printContent;


  window.print();


  document.body.innerHTML =
    originalContent;


  location.reload();

}


/* =========================================================
   MODAL
========================================================= */

function openModal(html){

  const modal =
    document.getElementById(
      "modal"
    );

  const box =
    document.getElementById(
      "modalBox"
    );


  if(!modal || !box)
    return;


  box.innerHTML =
    html;


  modal.classList.add(
    "show"
  );

}


function closeModal(){

  const modal =
    document.getElementById(
      "modal"
    );

  if(modal)
    modal.classList.remove(
      "show"
    );

}


/* =========================================================
   ACCOUNT / MY TRIPS
========================================================= */

function renderAccount(){

  const el =
    document.getElementById(
      "accountContent"
    );

  if(!el)
    return;


  if(!bookings.length){

    el.innerHTML = `

      <div class="emptyState">

        <h3>
          No trips yet.
        </h3>

        <p>
          Booking perjalanan Anda
          akan muncul di sini.
        </p>

      </div>

    `;

    return;

  }


  el.innerHTML =
    bookings.map(
      b => `

        <div class="tripCard">

          <div class="tripCardHeader">

            <div>

              <b>
                ${b.no}
              </b>

              <br>

              <small class="muted">
                ${b.date}
              </small>

            </div>

            <span class="tripStatus">
              ${b.status || "CONFIRMED"}
            </span>

          </div>


          <div
            class="summary"
            style="margin-bottom:0;"
          >

            <div class="summaryItem">

              <span>
                Traveler Type
              </span>

              <b>
                ${b.customerType || "-"}
              </b>

            </div>

            <div class="summaryItem">

              <span>
                Package
              </span>

              <b>
                ${b.packageStyle || "-"}
              </b>

            </div>

            <div class="summaryItem">

              <span>
                Total
              </span>

              <b class="price">
                ${money(b.total)}
              </b>

            </div>

          </div>

        </div>

      `
    ).join("");

}


/* =========================================================
   LIVE JOURNEY
========================================================= */

function openLiveJourney(){

  openModal(`

    <button
      class="close"
      onclick="closeModal()"
    >
      ×
    </button>

    <h2>
      📍 Live Journey
    </h2>

    <p class="muted">
      Modul Live Journey HobbiGo.
    </p>

    <div class="notice">

      <b>
        Journey Status
      </b>

      <p>
        Ready
      </p>

    </div>


    <div class="routeInfo">

      <div class="routeBox">
        <small>Destination</small>
        <strong>
          ${
            currentTrip?.destination ||
            "Your Trip"
          }
        </strong>
      </div>

      <div class="routeBox">
        <small>Route</small>
        <strong>
          Smart Route
        </strong>
      </div>

      <div class="routeBox">
        <small>Status</small>
        <strong>
          READY
        </strong>
      </div>

    </div>

    <p class="muted">
      Integrasi GPS/live location dan
      real-time journey tracking akan
      masuk pada tahap Live Journey.
    </p>

  `);

}


/* =========================================================
   AI JOURNEY VIDEO
========================================================= */

function openJourneyVideo(){

  openModal(`

    <button
      class="close"
      onclick="closeModal()"
    >
      ×
    </button>

    <h2>
      🎬 AI Journey Video
    </h2>

    <p class="muted">
      Konsep generative travel video HobbiGo.
    </p>


    <div class="notice">

      Destination
      <br>↓<br>

      Itinerary
      <br>↓<br>

      Scene
      <br>↓<br>

      Narration
      <br>↓<br>

      Cost
      <br>↓<br>

      AI Journey Video

    </div>


    <button
      class="primary"
      onclick="
        toast('AI Journey Video module siap dikembangkan.');
      "
    >
      Generate Concept
    </button>

  `);

}


/* =========================================================
   SHARE JOURNEY
========================================================= */

function shareJourney(){

  const shareData = {

    title:
      "My HobbiGo Journey",

    text:
      "My journey planned with HobbiGo."

  };


  if(
    navigator.share
  ){

    navigator
      .share(
        shareData
      )
      .catch(
        ()=>{}
      );

  }else{

    toast(
      "Share Journey siap diintegrasikan."
    );

  }

}


/* =========================================================
   ADMIN
========================================================= */

function adminFeature(category){

  toast(
    category +
    " Partner Management siap dikembangkan."
  );

}


function updateAdmin(){

  const productEl =
    document.getElementById(
      "adminProducts"
    );

  const cartEl =
    document.getElementById(
      "adminCart"
    );

  const bookingEl =
    document.getElementById(
      "adminBookings"
    );


  if(productEl)
    productEl.textContent =
      products.length;

  if(cartEl)
    cartEl.textContent =
      cartCount();

  if(bookingEl)
    bookingEl.textContent =
      bookings.length;

}


/* =========================================================
   HERO SEARCH
========================================================= */

function heroSearchGo(){

  const value =
    document.getElementById(
      "heroSearch"
    )?.value.trim();


  if(value){

    const dest =
      document.getElementById(
        "dest"
      );

    if(dest)
      dest.value =
        value;

  }


  go("planner");

}


/* =========================================================
   CLOSE MODAL WHEN CLICK OUTSIDE
========================================================= */

document.addEventListener(
  "click",
  function(e){

    const modal =
      document.getElementById(
        "modal"
      );

    if(
      modal &&
      e.target === modal
    ){

      closeModal();

    }

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

function initHobbiGo(){

  /* Date */

  const today =
    new Date()
      .toISOString()
      .slice(0,10);


  const date =
    document.getElementById(
      "date"
    );

  const flightDate =
    document.getElementById(
      "flightDate"
    );

  const checkin =
    document.getElementById(
      "hotelCheckin"
    );


  if(date && !date.value)
    date.value =
      today;

  if(
    flightDate &&
    !flightDate.value
  )
    flightDate.value =
      today;

  if(
    checkin &&
    !checkin.value
  )
    checkin.value =
      today;


  /* Marketplace */

  renderChips();

  renderProducts();


  /* Cart */

  updateCart();


  /* Account */

  renderAccount();


  /* Admin */

  updateAdmin();


  /* Budget */

  const budgetInput =
    document.getElementById(
      "budgetInput"
    );

  if(budgetInput){

    budgetInput.addEventListener(
      "input",
      checkBudget
    );

  }


  /* Default route status */

  const routeStatus =
    document.getElementById(
      "routeStatus"
    );

  if(routeStatus)
    routeStatus.textContent =
      "Ready";


  console.log(
    "HobbiGo V76.8 initialized."
  );

}


/* =========================================================
   START
========================================================= */

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    initHobbiGo
  );

}else{

  initHobbiGo();

}
