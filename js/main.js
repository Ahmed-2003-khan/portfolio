document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Typewriter effect
  const typewriter = (element, text, speed = 80) => {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }
    element.textContent = '';
    typing();
  };
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    typewriter(heroTitle, "Hi, I'm Ahmed — Data Science & AI Enthusiast");
  }

  // Skills bar animation
  const skillBars = document.querySelectorAll('.skill-bar');
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const value = bar.getAttribute('data-skill');
      bar.style.width = value + '%';
    });
  };
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  // Contact form validation
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const name = this.querySelector('[name="name"]');
      const email = this.querySelector('[name="email"]');
      const message = this.querySelector('[name="message"]');
      let valid = true;
      [name, email, message].forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('input-error');
          valid = false;
        } else {
          input.classList.remove('input-error');
        }
      });
      if (!valid) {
        e.preventDefault();
        alert('Please fill in all fields.');
      }
    });
  }
});
