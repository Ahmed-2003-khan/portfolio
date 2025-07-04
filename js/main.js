document.addEventListener('DOMContentLoaded', () => {
  // Loading Screen Functionality
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingLetter = document.querySelector('.loading-letter');
  
  // Add pulsing animation after all letters appear
  setTimeout(() => {
    loadingLetter.classList.add('animate-pulse');
  }, 1500); // Start pulsing after all letters have appeared
  
  // Hide loading screen after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      // Remove loading screen from DOM after animation
      setTimeout(() => {
        loadingScreen.remove();
      }, 800);
    }, 3000); // Show loading for 3 seconds to see the full animation
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to dark mode
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.toggle('light-mode', savedTheme === 'light');
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
  });

  // Smooth scrolling with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const targetPosition = target.offsetTop - 80; // Account for sticky header
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced reveal animation with intersection observer
  const revealOptions = {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
    rootMargin: '0px 0px -100px 0px'
  };

  const revealOnIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealOnIntersect, revealOptions);
  
  // Observe all animation classes
  const animatedElements = document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right, .scale-in');
  animatedElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Enhanced typewriter effect with cursor
  const typewriter = (element, text, speed = 80) => {
    let i = 0;
    element.innerHTML = '<span class="cursor">|</span>';
    
    function typing() {
      if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typing, speed);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.innerHTML = text;
        }, 1000);
      }
    }
    typing();
  };

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    typewriter(heroTitle, "Hi, I'm Ahmed — Data Science & AI Enthusiast");
  }

  // Enhanced skills bar animation with CSS custom properties
  const skillBars = document.querySelectorAll('.skill-bar');
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const value = bar.getAttribute('data-skill');
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
      
      if (isVisible && !bar.classList.contains('animated')) {
        bar.classList.add('animated');
        bar.style.setProperty('--skill-percentage', value + '%');
        
        // Trigger the CSS animation
        setTimeout(() => {
          bar.classList.add('active');
        }, 200);
      }
    });
  };

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const animateTimeline = () => {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 150 && rect.bottom > 0;
      
      if (isVisible && !item.classList.contains('active')) {
        item.classList.add('active');
      }
    });
  };

  // Throttled scroll event for better performance
  let ticking = false;
  const updateOnScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        animateSkills();
        animateTimeline();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', updateOnScroll);
  
  // Initial call and also call on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      animateSkills();
      animateTimeline();
    }, 500);
  });
  animateSkills();
  animateTimeline();

  // Enhanced contact form with better validation and feedback
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.querySelector('span').textContent;
        button.querySelector('span').textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        // Reset form
        setTimeout(() => {
          this.reset();
          button.querySelector('span').textContent = originalText;
          button.style.background = '';
        }, 3000);
      }
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if field is empty
    if (!value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else {
      // Email validation
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }
      
      // Name validation
      if (field.name === 'name') {
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters long';
        }
      }
      
      // Message validation
      if (field.name === 'message') {
        if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters long';
        }
      }
    }

    if (!isValid) {
      field.classList.add('error');
      field.style.borderColor = '#ff4757';
      field.style.boxShadow = '0 0 0 3px rgba(255, 71, 87, 0.1)';
    } else {
      field.style.borderColor = '#3bb6ff';
      field.style.boxShadow = '0 0 0 3px rgba(59, 182, 255, 0.1)';
    }

    return isValid;
  }

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add loading animation to page
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Smooth header background on scroll
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(13, 13, 43, 0.85)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'blur(25px)';
      } else {
        header.style.background = 'rgba(13, 13, 43, 0.7)';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(20px)';
      }
    };
    
    // Initial call
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
  }

  // Add hover effects to project cards
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    project.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add error styles
  const style = document.createElement('style');
  style.textContent = `
    .error {
      border-color: #ff4757 !important;
      box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1) !important;
    }
    
    body.loaded .reveal {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Project Details Modal Functionality
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.querySelector('.project-modal-close');

  projects.forEach(project => {
    project.addEventListener('click', () => {
      const title = project.getAttribute('data-title');
      const img = project.getAttribute('data-img');
      const desc = project.getAttribute('data-desc');
      modalTitle.textContent = title;
      modalImg.src = img;
      modalImg.alt = title;
      modalDesc.textContent = desc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});
