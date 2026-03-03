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
  // Ambil semua link menu kecuali tombol "Let's Talk" (biar style tombol kontak ngga keganggu)
  const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]:not([href="#contact"]), #mobile-menu ul li a[href^="#"]:not([href="#contact"])');

  // Settingan sensor layar (mendeteksi section pas posisinya ada di tengah layar)
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

  // Pasang sensornya ke semua section
  sections.forEach(section => {
    observer.observe(section);
  });
});