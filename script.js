const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const lightbox = document.querySelector(".image-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const zoomableImages = document.querySelectorAll(
  ".teacher-grid .member-photo img, .performer-grid .member-photo img, .ad-slot img"
);

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

zoomableImages.forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const registrationForm = document.querySelector("#registration-form");
registrationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!registrationForm.reportValidity()) return;
  const data = new FormData(registrationForm);
  const body = [
    "K&U Acting & Musical Program Registration",
    "Term: September 2026 – May 2027",
    "Both phases: $800",
    "",
    "Student name: " + data.get("student"),
    "Student age: " + data.get("age"),
    "Parent / guardian: " + data.get("guardian"),
    "Email: " + data.get("email"),
    "Phone: " + data.get("phone"),
    "Notes: " + (data.get("notes") || ""),
  ].join("\r\n");
  const subject = "K&U Course Registration";
  window.location.href = "mailto:kugenerationhub@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  document.querySelector("#registration-status").textContent =
    "Please send the prepared email in your email app. If it does not open, email your details to kugenerationhub@gmail.com.";
});