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

// Модальные окна
document.addEventListener('DOMContentLoaded', function() {
  // Открытие модальных окон
  document.querySelectorAll('[data-modal-open]').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Закрытие модальных окон
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Закрытие при клике вне модального окна
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Переключение между модальными окнами
  document.querySelectorAll('.switch-modal').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const currentModal = this.closest('.modal');
      const targetModalId = this.getAttribute('data-modal');
      
      currentModal.classList.remove('active');
      document.getElementById(targetModalId).classList.add('active');
    });
  });

  // Валидация форм
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Здесь можно добавить логику входа
    alert('Вход выполнен!');
    this.closest('.modal').classList.remove('active');
    document.body.style.overflow = '';
  });

  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('regPassword').value;
    const repeatPassword = document.getElementById('regRepeatPassword').value;
    
    if (password !== repeatPassword) {
      this.classList.add('shake');
      alert('Пароли не совпадают!');
      setTimeout(() => this.classList.remove('shake'), 500);
      return;
    }
    
    // Здесь можно добавить логику регистрации
    alert('Регистрация успешна!');
    this.closest('.modal').classList.remove('active');
    document.body.style.overflow = '';
  });
});

  // Открытие модального окна
  document.getElementById('openModalBtn').onclick = function() {
    document.getElementById('requestModal').classList.add('active');
  };

  // Закрытие модального окна
  document.getElementById('closeModalBtn').onclick = function() {
    document.getElementById('requestModal').classList.remove('active');
  };

  // Закрытие по клику вне окна
  window.onclick = function(event) {
    const modal = document.getElementById('requestModal');
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  };
  

    // Корзина (front-end)
    let cart = [];

    // Добавление в корзину
    document.querySelectorAll('.add-to-cart-btn').forEach((btn, idx) => {
      btn.addEventListener('click', function() {
        const card = btn.closest('.tariff-card');
        const title = card.querySelector('.tariff-name').textContent.trim();
        const price = card.querySelector('.price-value').textContent.trim();
        // Проверка на дублирование тарифа в корзине
        if (!cart.find(item => item.title === title)) {
          cart.push({ title, price });
          updateCartCount();
        }
        showCartMessage(title + " добавлен в корзину!");
      });
    });
  
    // Обновление счетчика корзины
    function updateCartCount() {
      document.getElementById('cartCount').textContent = cart.length;
    }
  
    // Открытие корзины
    document.getElementById('cartBtn').onclick = function() {
      renderCart();
      document.getElementById('cartModal').classList.add('active');
    };
  
    // Закрытие корзины
    document.getElementById('closeCartModal').onclick = function() {
      document.getElementById('cartModal').classList.remove('active');
    };
  
    // Клик вне модального окна
    window.addEventListener('click', function(event) {
      const modal = document.getElementById('cartModal');
      if (event.target === modal) {
        modal.classList.remove('active');
      }
    });
  
    // Отображение содержимого корзины
    function renderCart() {
      const cartItems = document.getElementById('cartItems');
      if (cart.length === 0) {
        cartItems.innerHTML = "<p>Ваша корзина пуста.</p>";
        return;
      }
      cartItems.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <span>${item.title} — <b>${item.price}</b></span>
          <button class="remove-cart-item" data-idx="${i}">✕</button>
        </div>
      `).join('');
      // Добавить обработчики для удаления
      cartItems.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.onclick = function() {
          cart.splice(btn.dataset.idx, 1);
          updateCartCount();
          renderCart();
        };
      });
    }
  
    // Оформить заказ (заглушка)
    document.getElementById('checkoutBtn').onclick = function() {
      if (cart.length === 0) return;
      document.getElementById('cartItems').innerHTML = "<p>Спасибо за заказ! Мы свяжемся с вами для уточнения деталей.</p>";
      cart = [];
      updateCartCount();
    };
  
    // Сообщение при добавлении в корзину
    function showCartMessage(text) {
      let msg = document.createElement('div');
      msg.className = 'success-message active';
      msg.style.top = "70px";
      msg.textContent = text;
      document.body.appendChild(msg);
      setTimeout(() => { msg.remove(); }, 2000);
    }

    // Обработчики для кнопок "Заказать"
document.querySelectorAll('.tariff-button:not(.add-to-cart-btn)').forEach(btn => {
  btn.addEventListener('click', function() {
    // Ваш код для обработки заказа
  });
});

// Обработчики для кнопок "В корзину" (уже есть в вашем коде)
document.querySelectorAll('.add-to-cart-btn').forEach((btn, idx) => {
  btn.addEventListener('click', function() {
    const card = btn.closest('.tariff-card');
    const title = card.querySelector('.tariff-name').textContent.trim();
    const price = card.querySelector('.price-value').textContent.trim();
    if (!cart.find(item => item.title === title)) {
      cart.push({ title, price });
      updateCartCount();
    }
    showCartMessage(title + " добавлен в корзину!");
  });
});