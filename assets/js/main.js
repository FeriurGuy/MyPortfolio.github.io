document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS Animation
  AOS.init({ 
    duration: 800, 
    once: true, 
    offset: 50 
  });

  // 2. Mobile Menu Toggle Logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu.querySelectorAll("a");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // 3. Active Navbar on Scroll Logic
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]:not([href="#contact"]), #mobile-menu ul li a[href^="#"]:not([href="#contact"])');
  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px -50% 0px", 
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ambil ID dari section yang lagi dilihat (misal: "about" atau "services")
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          // Hapus efek nyala dari semua link dulu
          link.classList.remove("text-mint", "font-bold");
          
          // Cocokin href di link dengan ID section yang lagi aktif
          if (link.getAttribute("href") === `#${currentId}`) {
            // Kalau cocok, kasih warna mint dan tebelin hurufnya
            link.classList.add("text-mint", "font-bold");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});

// --- Modal Sertifikat Logic ---

function openCertModal(imageSrc, pdfSrc) {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('certModalImg');
  const modalDownload = document.getElementById('certModalDownload');
  const modalContent = document.getElementById('certModalContent');
  
  // Set source gambar dan link download sesuai yang diklik
  modalImg.src = imageSrc;
  modalDownload.href = pdfSrc;
  
  // Tampilkan modal (hapus class hidden, ubah jadi flex)
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  
  // Kasih jeda sedikit buat trigger animasi transisi Tailwind
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
  }, 10);
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  const modalContent = document.getElementById('certModalContent');
  
  // Jalankan animasi keluar dulu
  modal.classList.add('opacity-0');
  modalContent.classList.remove('scale-100');
  modalContent.classList.add('scale-95');
  
  // Setelah animasi selesai (300ms), baru sembunyikan elemennya
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    // Bersihkan src gambar biar memori gak penuh
    document.getElementById('certModalImg').src = ""; 
  }, 300);
}

// Tutup modal kalau user nge-klik area gelap di luar gambar
document.getElementById('certModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeCertModal();
  }
});