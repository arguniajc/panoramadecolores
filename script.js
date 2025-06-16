// Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Variables del slider
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Función para mostrar un slide específico
  function showSlide(index) {
    // Oculta todos los slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remover clase active de todos los indicadores
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Mostrar el slide actual
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
  }

  // Función para ir al slide siguiente
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Función para ir al slide anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Event listeners para los botones
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Event listeners para los indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Auto-avance del slider (opcional)
  let slideInterval = setInterval(nextSlide, 5000);

  // Pausar auto-avance cuando el mouse está sobre el slider
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  // Reanudar auto-avance cuando el mouse sale del slider
  sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const modernNav = document.querySelector('.modern-nav');

  menuToggle.addEventListener('click', function() {
    modernNav.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      modernNav.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
      
      // Actualizar clase active
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Cambiar clase active en el menú al hacer scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});