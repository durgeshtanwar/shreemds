// Load Header and Footer Partials
async function loadPartials() {
  // Load Header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    try {
      const response = await fetch('/partials/header.html');
      if (response.ok) {
        headerContainer.innerHTML = await response.text();
        // Set active nav link
        setActiveNavLink();
        // Initialize navbar scroll effect
        initNavbarScroll();
        // Initialize hamburger menu
        initHamburgerMenu();
      }
    } catch (e) {
      console.log('Header not loaded:', e);
    }
  }

  // Load Footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    try {
      const response = await fetch('/partials/footer.html');
      if (response.ok) {
        footerContainer.innerHTML = await response.text();
      }
    } catch (e) {
      console.log('Footer not loaded:', e);
    }
  }
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
  });
  // Initial check
  if (window.scrollY > 50) {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.add('scrolled');
  }
}

// Initialize Hamburger Menu
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (!hamburger || !navLinks) return;
  
  // Create overlay element
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu on overlay click
  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Load partials when DOM is ready
document.addEventListener('DOMContentLoaded', loadPartials);
