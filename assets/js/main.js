document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ 
    duration: 800, 
    once: true, 
    offset: 50 
  });

  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const spans = btn.querySelectorAll("span");
  const mobileLinks = menu.querySelectorAll("a");

  const toggleMenu = () => {
    menu.classList.toggle("opacity-0");
    menu.classList.toggle("invisible");
    menu.classList.toggle("-translate-y-4");
    
    spans[0].classList.toggle("rotate-45");
    spans[0].classList.toggle("translate-x-[2px]");
    spans[0].classList.toggle("-translate-y-[2px]");
    
    spans[1].classList.toggle("opacity-0");
    spans[1].classList.toggle("translate-x-3");
    
    spans[2].classList.toggle("-rotate-45");
    spans[2].classList.toggle("translate-x-[2px]");
    spans[2].classList.toggle("translate-y-[2px]");
  };

  btn.addEventListener("click", toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (!menu.classList.contains("invisible")) {
        toggleMenu();
      }
    });
  });

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
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("text-mint", "font-bold");
          if (link.getAttribute("href") === `#${currentId}`) {
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

function openCertModal(imageSrc, pdfSrc) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const modalDownload = document.getElementById("certModalDownload");
  const modalContent = document.getElementById("certModalContent");
  
  modalImg.src = imageSrc;
  modalDownload.href = pdfSrc;
  
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    modalContent.classList.remove("scale-95");
    modalContent.classList.add("scale-100");
  }, 10);
}

function closeCertModal() {
  const modal = document.getElementById("certModal");
  const modalContent = document.getElementById("certModalContent");
  
  modal.classList.add("opacity-0");
  modalContent.classList.remove("scale-100");
  modalContent.classList.add("scale-95");
  
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("certModalImg").src = ""; 
  }, 300);
}

document.getElementById("certModal")?.addEventListener("click", function(e) {
  if (e.target === this) {
    closeCertModal();
  }
});