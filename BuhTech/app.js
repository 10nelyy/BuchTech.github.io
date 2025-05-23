// Анимация при скролле
document.addEventListener('DOMContentLoaded', function() {
  // 1. Плавное появление элементов при скролле
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .tariff-card, .benefit-card, .service-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Инициализация
  const animatedElements = document.querySelectorAll('.card, .tariff-card, .benefit-card, .service-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Инициализация при загрузке

  // 2. Плавный скролл к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Анимация кнопок при наведении
  const buttons = document.querySelectorAll('.main-button, .tariff-button, .promo-button, .form-submit');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });

  // 4. Параллакс эффект для фоновых элементов
  const bgElements = document.querySelectorAll('.bg-circle');
  if (bgElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      bgElements.forEach((el, index) => {
        const speed = 0.1 + (index * 0.05);
        el.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
  }

  // 5. Анимация формы при фокусе
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateX(10px)';
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateX(0)';
    });
  });
});


// Слайдер отзывов
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slider-track');
  const cards = document.querySelectorAll('.review-card');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  let cardWidth = cards[0].getBoundingClientRect().width + 30; // Используем getBoundingClientRect для точного измерения
  let currentIndex = 0;
  
  // Создаем точки навигации
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  // Функция для перехода к конкретному слайду
  function goToSlide(index) {
    // Проверяем границы
    if (index < 0) {
      index = cards.length - 1;
    } else if (index >= cards.length) {
      index = 0;
    }
    
    currentIndex = index;
    const newPosition = -index * cardWidth;
    track.style.transform = `translateX(${newPosition}px)`;
    
    // Обновляем активную точку
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Кнопка "Назад"
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  
  // Кнопка "Вперед"
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  // Адаптация при изменении размера окна
  window.addEventListener('resize', () => {
    cardWidth = cards[0].getBoundingClientRect().width + 30;
    goToSlide(currentIndex);
  });
  
  // Автопрокрутка
  let autoSlideInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);
  
  // Остановка автопрокрутки при наведении
  const slider = document.querySelector('.reviews-slider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  });
  
  // Инициализация ширины карточек
  updateCardWidth();
  
  function updateCardWidth() {
    const containerWidth = document.querySelector('.reviews-container').offsetWidth;
    if (window.innerWidth <= 768) {
      // На мобильных - одна карточка
      cardWidth = containerWidth;
    } else {
      // На десктопе - треть контейнера (3 карточки)
      cardWidth = containerWidth / 3;
    }
    goToSlide(currentIndex);
  }
});

// Плавное появление фона хедера при скролле
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.header-wrap');
  const headerHeight = document.querySelector('.header').offsetHeight;
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > headerHeight) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  // Инициализация при загрузке (на случай если страница уже прокручена)
  if (window.scrollY > headerHeight) {
      header.classList.add('scrolled');
  }
});

// Получаем элементы
const loginBtn = document.querySelector('.auth-button:not(.register-button)');
const registerBtn = document.querySelector('.register-button');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeBtns = document.querySelectorAll('.close');

// Открытие модальных окон
loginBtn.addEventListener('click', () => loginModal.classList.toggle("active"));
registerBtn.addEventListener('click', () => registerModal.classList.toggle("active"));

// Закрытие модальных окон
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
  });
});

// Закрытие при клике вне окна
window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.classList.remove("active");
  if (e.target === registerModal) registerModal.classList.remove("active");
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  const loginInput = document.getElementById('loginEmail').value;
  // Если введён email, проверяем на наличие @
  if (loginInput.includes('@') && !loginInput.match(/^\+?[0-9\s\-\(\)]+$/)) {
    if (!loginInput.includes('@')) {
      alert('Пожалуйста, введите корректный email-адрес (должен содержать символ @)');
      e.preventDefault();
      return false;
    }
  }
  // Если введён телефон, дополнительных проверок нет (можно добавить при необходимости)
});
