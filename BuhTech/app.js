// Анимация при скролле
document.addEventListener("DOMContentLoaded", function () {
  // 1. Плавное появление элементов при скролле
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".card, .tariff-card, .benefit-card, .service-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Инициализация
  const animatedElements = document.querySelectorAll(
    ".card, .tariff-card, .benefit-card, .service-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Инициализация при загрузке

  // 2. Плавный скролл к якорям
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // 3. Анимация кнопок при наведении
  const buttons = document.querySelectorAll(
    ".main-button, .tariff-button, .promo-button, .form-submit"
  );
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.05)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });
  });

  // 4. Параллакс эффект для фоновых элементов
  const bgElements = document.querySelectorAll(".bg-circle");
  if (bgElements.length > 0) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;
      bgElements.forEach((el, index) => {
        const speed = 0.1 + index * 0.05;
        el.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
  }

  // 5. Анимация формы при фокусе
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "translateX(10px)";
    });
    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "translateX(0)";
    });
  });
});

// Слайдер отзывов
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const cards = document.querySelectorAll(".review-card");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");

  let cardWidth = cards[0].getBoundingClientRect().width + 30; // Используем getBoundingClientRect для точного измерения
  let currentIndex = 0;

  // Создаем точки навигации
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");

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
      dot.classList.toggle("active", i === index);
    });
  }

  // Кнопка "Назад"
  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  // Кнопка "Вперед"
  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  // Адаптация при изменении размера окна
  window.addEventListener("resize", () => {
    cardWidth = cards[0].getBoundingClientRect().width + 30;
    goToSlide(currentIndex);
  });

  // Автопрокрутка
  let autoSlideInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 5000);

  // Остановка автопрокрутки при наведении
  const slider = document.querySelector(".reviews-slider");
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  });

  // Инициализация ширины карточек
  updateCardWidth();

  function updateCardWidth() {
    const containerWidth =
      document.querySelector(".reviews-container").offsetWidth;
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
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header-wrap");
  const headerHeight = document.querySelector(".header").offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > headerHeight) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Инициализация при загрузке (на случай если страница уже прокручена)
  if (window.scrollY > headerHeight) {
    header.classList.add("scrolled");
  }
});

// Модальные окна
document.addEventListener("DOMContentLoaded", function () {
  // Открытие модальных окон
  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal-open");
      const modal = document.getElementById(modalId);
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Закрытие модальных окон
  document.querySelectorAll(".close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      this.closest(".modal").classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Закрытие при клике вне модального окна
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Переключение между модальными окнами
  document.querySelectorAll(".switch-modal").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const currentModal = this.closest(".modal");
      const targetModalId = this.getAttribute("data-modal");

      currentModal.classList.remove("active");
      document.getElementById(targetModalId).classList.add("active");
    });
  });

  // Валидация форм
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Здесь можно добавить логику входа
    alert("Вход выполнен!");
    this.closest(".modal").classList.remove("active");
    document.body.style.overflow = "";
  });

  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const password = document.getElementById("regPassword").value;
      const repeatPassword = document.getElementById("regRepeatPassword").value;

      if (password !== repeatPassword) {
        this.classList.add("shake");
        alert("Пароли не совпадают!");
        setTimeout(() => this.classList.remove("shake"), 500);
        return;
      }

      // Здесь можно добавить логику регистрации
      alert("Регистрация успешна!");
      this.closest(".modal").classList.remove("active");
      document.body.style.overflow = "";
    });
});

// Открытие модального окна
document.getElementById("openModalBtn").onclick = function () {
  document.getElementById("requestModal").classList.add("active");
};

// Закрытие модального окна
document.getElementById("closeModalBtn").onclick = function () {
  document.getElementById("requestModal").classList.remove("active");
};

// Закрытие по клику вне окна
window.onclick = function (event) {
  const modal = document.getElementById("requestModal");
  if (event.target === modal) {
    modal.classList.remove("active");
  }
};

// --- Корзина ---
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const closeBtns = cartModal.querySelectorAll(".close");

  let cart = [];

  // Открытие корзины
  cartBtn.addEventListener("click", () => {
    cartModal.classList.add("active");
    updateCartDisplay();
  });

  // Закрытие корзины по крестику
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      cartModal.classList.remove("active");
    });
  });

  // Закрытие по фону
  window.addEventListener("click", (event) => {
    if (event.target === cartModal) {
      cartModal.classList.remove("active");
    }
  });

  // Добавление товара в корзину
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".tariff-card");
      const title =
        card.querySelector(".tariff-name")?.textContent.trim() || "Товар";
      const price =
        card.querySelector(".price-value")?.textContent.trim() || "—";

      // Проверяем, не добавлен ли уже
      const existing = cart.find((item) => item.title === title);
      if (!existing) {
        cart.push({ title, price });
        updateCartCount();
        updateCartDisplay();
      }
    });
  });

  // Обновление счетчика корзины
  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  // Отображение корзины
  function updateCartDisplay() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="cart-empty">Ваша корзина пуста.</p>`;
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.title}</div>
          <div class="cart-item-price">${item.price}</div>
        </div>
        <button class="cart-item-remove" data-index="${index}">&times;</button>
      </div>
    `
      )
      .join("");

    // Кнопки удаления товара
    const removeBtns = cartItemsContainer.querySelectorAll(".cart-item-remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
      });
    });
  }
});

// Оформить заказ (заглушка)
document.getElementById("checkoutBtn").onclick = function () {
  if (cart.length === 0) return;
  document.getElementById("cartItems").innerHTML =
    "<p>Спасибо за заказ! Мы свяжемся с вами для уточнения деталей.</p>";
  cart = [];
  updateCartCount();
};

// Сообщение при добавлении в корзину
function showCartMessage(text) {
  let msg = document.createElement("div");
  msg.className = "success-message active";
  msg.style.top = "70px";
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => {
    msg.remove();
  }, 2000);
}

// Обработчики для кнопок "Заказать"
document
  .querySelectorAll(".tariff-button:not(.add-to-cart-btn)")
  .forEach((btn) => {
    btn.addEventListener("click", function () {
      // Ваш код для обработки заказа
    });
  });

// Обработчики для кнопок "Подробнее" в карточках услуг
document.querySelectorAll(".details-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".service-card");
    card.classList.toggle("active");
    this.textContent = card.classList.contains("active")
      ? "Скрыть"
      : "Подробнее";
  });
});

// Обработчики для кнопок "Подробнее" в карточках услуг
document.querySelectorAll(".details-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".service-card");
    const description = card.querySelector(".service-description");

    // Переключаем отображение описания
    description.style.display =
      description.style.display === "none" ? "block" : "none";

    // Меняем текст кнопки
    this.textContent =
      description.style.display === "none" ? "Подробнее" : "Скрыть";
  });
});

// Обработчики для кнопок "Заказать" в карточках услуг
document.querySelectorAll(".order-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".service-card");
    const title = card.querySelector("h2").textContent;
    const price = card.querySelector(".price-badge").textContent;

    // Добавляем в корзину, если еще не добавлено
    if (!cart.find((item) => item.title === title)) {
      cart.push({ title, price });
      updateCartCount();
      showCartMessage(title + " добавлен в корзину!");
    }
  });
});

// Рейтинг в отзывах
document.querySelectorAll(".rating-stars").forEach((stars) => {
  const starsContainer = stars;
  starsContainer.innerHTML = "★★★★★";

  const starsElements = starsContainer.querySelectorAll("span") || [];

  starsElements.forEach((star, index) => {
    star.addEventListener("click", () => {
      starsElements.forEach((s, i) => {
        if (i <= index) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });
});

// Отправка формы отзыва
document
  .querySelector(".review-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const successMessage = document.createElement("div");
    successMessage.className = "success-message active";
    successMessage.textContent = "Ваш отзыв отправлен! Спасибо!";
    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
      this.reset();
      document.querySelector(".rating-stars").innerHTML = "★★★★★";
    }, 3000);
  });

// Инициализация карты в контактах
function initMap() {
  // Здесь должен быть код инициализации карты
  console.log("Карта инициализирована");
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function () {
  initMap();

  // Добавляем модальные окна на все страницы
  const modalHTML = `
  <div id="loginModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-header">
        <h2>Вход в систему</h2>
        <p>Введите свои данные для входа</p>
      </div>
      <form id="loginForm" class="modal-form">
        <div class="form-group">
          <label for="loginEmail">Email или телефон</label>
          <input type="text" id="loginEmail" placeholder="example@mail.com" required />
        </div>
        <div class="form-group">
          <label for="loginPassword">Пароль</label>
          <input type="password" id="loginPassword" placeholder="••••••••" required />
          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" id="rememberMe" />
              <span class="checkmark"></span>
              Запомнить меня
            </label>
            <a href="#" class="forgot-password">Забыли пароль?</a>
          </div>
        </div>
        <button type="submit" class="modal-btn">Войти</button>
        <div class="modal-footer">
          Ещё нет аккаунта?
          <a href="#" class="switch-modal" data-modal="registerModal">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  </div>

  <div id="registerModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-header">
        <h2>Регистрация</h2>
        <p>Создайте новый аккаунт</p>
      </div>
      <form id="registerForm" class="modal-form">
        <div class="form-group">
          <label for="regName">Имя</label>
          <input type="text" id="regName" placeholder="Ваше имя" required />
        </div>
        <div class="form-group">
          <label for="regEmail">Email</label>
          <input type="email" id="regEmail" placeholder="example@mail.com" />
        </div>
        <div class="form-group">
          <label for="regPhone">Телефон</label>
          <input type="tel" id="regPhone" placeholder="+7 (___) ___-__-__" required />
        </div>
        <div class="form-group">
          <label for="regPassword">Пароль</label>
          <input type="password" id="regPassword" placeholder="••••••••" required />
        </div>
        <div class="form-group">
          <label for="regRepeatPassword">Повторите пароль</label>
          <input type="password" id="regRepeatPassword" placeholder="••••••••" required />
        </div>
        <button type="submit" class="modal-btn">Зарегистрироваться</button>
      </form>
      <div class="modal-footer">
        Уже есть аккаунт?
        <a href="#" class="switch-modal" data-modal="loginModal">Войти</a>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
});

// Обработка входа пользователя
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  
  // Здесь должна быть реальная проверка данных
  // Для демонстрации просто сохраняем данные
  localStorage.setItem('userEmail', email);
  localStorage.setItem('isLoggedIn', 'true');
  
  // Перенаправляем на страницу профиля
  window.location.href = 'profile.html';
  
  // Закрываем модальное окно
  this.closest(".modal").classList.remove("active");
  document.body.style.overflow = "";
});

// Обработка регистрации пользователя
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const phone = document.getElementById("regPhone").value;
  const password = document.getElementById("regPassword").value;
  
  // Проверка совпадения паролей
  const repeatPassword = document.getElementById("regRepeatPassword").value;
  if (password !== repeatPassword) {
    this.classList.add("shake");
    alert("Пароли не совпадают!");
    setTimeout(() => this.classList.remove("shake"), 500);
    return;
  }
  
  // Сохраняем данные пользователя
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPhone', phone);
  localStorage.setItem('isLoggedIn', 'true');
  
  // Перенаправляем на страницу профиля
  window.location.href = 'profile.html';
  
  // Закрываем модальное окно
  this.closest(".modal").classList.remove("active");
  document.body.style.overflow = "";
});

// Проверка авторизации при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
  // Показываем/скрываем кнопки входа в зависимости от авторизации
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authButtons = document.querySelector('.auth-buttons');
  const userProfile = document.querySelector('.user-profile');
  
  if (authButtons && userProfile) {
    if (isLoggedIn) {
      authButtons.style.display = 'none';
      userProfile.style.display = 'flex';
      
      // Заполняем имя пользователя
      const userName = localStorage.getItem('userName') || 'Пользователь';
      document.getElementById('userName').textContent = userName;
    } else {
      authButtons.style.display = 'flex';
      userProfile.style.display = 'none';
    }
    
    // Заполняем данные пользователя
    const userName = localStorage.getItem('userName') || 'Пользователь';
    document.getElementById('userName').textContent = userName;
    document.getElementById('profileName').value = userName.split(' ')[0] || '';
    document.getElementById('profileSurname').value = userName.split(' ')[1] || '';
    document.getElementById('profileEmail').value = localStorage.getItem('userEmail') || '';
    document.getElementById('profilePhone').value = localStorage.getItem('userPhone') || '';
  }
  
  // Переключение между разделами профиля
  const profileMenuItems = document.querySelectorAll('.profile-menu-item');
  const profileSections = document.querySelectorAll('.profile-section');
  
  profileMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Удаляем активный класс у всех пунктов меню
      profileMenuItems.forEach(i => i.classList.remove('active'));
      
      // Добавляем активный класс текущему пункту
      this.classList.add('active');
      
      // Скрываем все разделы
      profileSections.forEach(section => section.classList.remove('active'));
      
      // Показываем выбранный раздел
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).classList.add('active');
    });
  });
  
  // Выход из профиля
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPhone');
      window.location.href = 'index.html';
    });
  }
  
  // Сохранение профиля
  const profileForm = document.querySelector('.profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Сохраняем изменения
      const name = document.getElementById('profileName').value;
      const surname = document.getElementById('profileSurname').value;
      const email = document.getElementById('profileEmail').value;
      const phone = document.getElementById('profilePhone').value;
      
      localStorage.setItem('userName', `${name} ${surname}`);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPhone', phone);
      
      // Обновляем имя в шапке
      document.getElementById('userName').textContent = `${name} ${surname}`;
      
      // Показываем уведомление
      showCartMessage('Изменения сохранены успешно!');
    });
  }
});
