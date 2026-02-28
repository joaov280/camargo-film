// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   LIGHTBOX (tela cheia)
========================= */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

function openLightbox(src){
  lbImg.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
  document.body.style.overflow = "";
}

lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

/* =========================
   CATEGORIAS DO PORTFÓLIO
========================= */
const CAT = {
  sport:   { title: "Esportes", folder: "img/sport", prefix: "sport", count: 5 },
  ensaios: { title: "Ensaios",  folder: "img/ensaios", prefix: "ensaio", count: 7 },
};

const catModal = document.getElementById("catModal");
const catGallery = document.getElementById("catGallery");
const catTitle = document.getElementById("catTitle");
const catClose = document.getElementById("catClose");

function openCategory(key){
  const cfg = CAT[key];
  if (!cfg) return;

  catTitle.textContent = cfg.title;
  catGallery.innerHTML = "";

  for (let i = 1; i <= cfg.count; i++){
    const src = `${cfg.folder}/${cfg.prefix}${i}.jpg`;

    const btn = document.createElement("button");
    btn.className = "ig-item";
    btn.setAttribute("type", "button");
    btn.dataset.full = src;

    const img = document.createElement("img");
    img.src = src;
    img.alt = `${cfg.title} ${i}`;

    btn.appendChild(img);

    btn.addEventListener("click", () => openLightbox(src));
    catGallery.appendChild(btn);
  }

  catModal.classList.add("open");
  catModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCategory(){
  catModal.classList.remove("open");
  catModal.setAttribute("aria-hidden", "true");
  catGallery.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open]").forEach((btn) => {
  btn.addEventListener("click", () => openCategory(btn.dataset.open));
});

catClose.addEventListener("click", closeCategory);

// clicar fora fecha (na área escura)
catModal.addEventListener("click", (e) => {
  if (e.target === catModal) closeCategory();
});

// teclado
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("open") && e.key === "Escape") closeLightbox();
  if (catModal.classList.contains("open") && e.key === "Escape") closeCategory();
});
// ===== Reveal ao rolar =====
const revealEls = document.querySelectorAll(".section, .card, .cat-card, .about, .contact-item");

revealEls.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("on");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));