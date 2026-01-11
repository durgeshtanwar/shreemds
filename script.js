document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* NAVBAR SCROLL EFFECT */
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 50) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  });

  /* HERO SLIDER LOGIC */
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  let currentSlide = 0;
  let isAnimating = false;

  // Create Dots
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => gotoSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll(".dot");

  function gotoSlide(index) {
    if (isAnimating || index === currentSlide) return;
    isAnimating = true;

    const next = slides[index];
    const current = slides[currentSlide];
    const nextContent = next.querySelector(".hero-content");
    const currentContent = current.querySelector(".hero-content");
    const nextImg = next.querySelector(".hero-img img");
    const currentImg = current.querySelector(".hero-img img");

    // Reset next slide styles for animation
    gsap.set(next, { zIndex: 2, autoAlpha: 1 });
    gsap.set(nextContent.children, { y: 50, opacity: 0 }); // Prepare content animation
    gsap.set(nextImg, { scale: 0.8, x: 50, opacity: 0 }); // Prepare img animation

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(current, { zIndex: 0, autoAlpha: 0 });
        current.classList.remove("active");
        next.classList.add("active");
        currentSlide = index;
        isAnimating = false;
        startAutoPlay(); // Restart timer
      }
    });

    // Animate Slide Transition
    tl.to(currentContent.children, { y: -30, opacity: 0, duration: 0.5, stagger: 0.1 }) // Fade out current text
      .to(currentImg, { x: -50, opacity: 0, duration: 0.5 }, "<") // Fade out current img
      .fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "<") // Crossfade bg (if needed, or just container)
      .to(nextContent.children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.4") // Fade in new text
      .to(nextImg, { scale: 1, x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8"); // Fade in new img
    
    // Update Dots
    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    gotoSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    gotoSlide(prevIndex);
  }

  nextBtn.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
  });

  // Auto Play
  let slideInterval;
  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  // Initial Animation
  const initialContent = slides[0].querySelector(".hero-content");
  const initialImg = slides[0].querySelector(".hero-img img");
  gsap.from(initialContent.children, { y: 50, opacity: 0, duration: 1, stagger: 0.2, delay: 0.5, ease: "power3.out" });
  gsap.fromTo(initialImg, { scale: 0.8, opacity: 0, x: 50 }, { scale: 1, opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" });

  startAutoPlay();

  /* BEST SELLERS */
  gsap.from(".best-sellers h2", {
    scrollTrigger: { trigger: ".best-sellers", start: "top 90%" },
    y: 30, opacity: 0, duration: 0.8
  });

  // Animate each card individually as it enters the viewport
  gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 95%", // Trigger almost immediately when it comes into view
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i % 4 * 0.1, // Subtle delay based on column index
      ease: "power2.out"
    });
  });

  /* FEATURE */
  gsap.from(".feature .img-container", {
    scrollTrigger: { trigger: ".feature", start: "top 80%" },
    x: -50, 
    opacity: 0, 
    duration: 1, 
    ease: "power2.out"
  });

  gsap.from(".feature-content", {
    scrollTrigger: { trigger: ".feature", start: "top 80%" },
    x: 50, 
    opacity: 0, 
    duration: 1, 
    ease: "power2.out"
  });

  /* COMBO */
  gsap.from(".combo h2", {
    scrollTrigger: { trigger: ".combo", start: "top 90%" },
    y: 30, opacity: 0, duration: 0.8
  });

  gsap.utils.toArray(".combo-packs img").forEach((img, i) => {
    gsap.from(img, {
      scrollTrigger: { 
        trigger: img, 
        start: "top 95%",
        toggleActions: "play none none none"
      },
      scale: 0.8, 
      opacity: 0, 
      duration: 0.6, 
      delay: i * 0.1,
      ease: "back.out(1.5)"
    });
  });

  /* CTA */
  gsap.from(".cta", {
    scrollTrigger: { trigger: ".cta", start: "top 90%" },
    opacity: 0,
    y: 30,
    duration: 1
  });
});
