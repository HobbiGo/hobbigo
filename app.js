// =========================================
// LOGIKA PENCARIAN & DETAIL (EXPEDIA STYLE)
// =========================================

let rooms = 1;
let adults = 2;
let currentHotel = { name: "", price: 0 };

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
}

function setTab(btn, type) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
}

function toggleGuest() {
  const popup = document.getElementById("guestPopup");
  popup.classList.toggle("show");
}

function updateGuest(type, change) {
  if (type === 'room') {
    rooms = Math.max(1, rooms + change);
    document.getElementById("roomCount").innerText = rooms;
  } else {
    adults = Math.max(1, adults + change);
    document.getElementById("adultCount").innerText = adults;
  }
  document.getElementById("guestInput").value = `${adults} travellers, ${rooms} room`;
}

function executeSearch() {
  // Sembunyikan pop-up guest jika masih terbuka
  document.getElementById("guestPopup").classList.remove("show");
  
  // Tampilkan loading sebentar (Simulasi)
  const btn = document.querySelector(".btn-search");
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    showPage('results');
  }, 800);
}

function openDetail(name, price, img) {
  currentHotel = { name: name, price: price };
  document.getElementById("detailTitle").innerText = name;
  document.getElementById("detailPrice").innerText = formatRupiah(price);
  
  // Ganti gambar utama
  document.querySelector(".main-img").src = img;
  
  showPage('detail');
}

function addToCart() {
  alert(`Berhasil! ${currentHotel.name} telah ditambahkan ke keranjang.`);
  // Di sini kamu bisa menambahkan logika untuk menyimpan ke localStorage
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}
