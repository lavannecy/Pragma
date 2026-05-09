/* ─── ВАЛІДАЦІЯ ─── */
function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function validPhone(p) {
  return /^\+380\d{9}$/.test(p);
}

/* ─── ЕЛЕМЕНТИ СТОРІНКИ ─── */
const heroBtn    = document.getElementById("heroBtn");
const contactBtn = document.getElementById("contactBtn");
const modal1     = document.getElementById("modal1");
const modal2     = document.getElementById("modal2");
const phone1     = document.getElementById("phone1");
const phone2     = document.getElementById("phone2");
const emailContact = document.getElementById("emailContact");
const nameContact  = document.getElementById("nameContact");
const send1      = document.getElementById("send1");
const send2      = document.getElementById("send2");


/* ─── МОДАЛЬНІ ВІКНА 1 і 2 ─── */
heroBtn.onclick    = () => modal1.classList.add("active");
contactBtn.onclick = () => modal2.classList.add("active");

// Закриття через ×
document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    document.getElementById(btn.dataset.close).classList.remove("active");
  };
});

// Закриття по кліку на тло
document.querySelectorAll(".modal").forEach(modal => {
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("active");
  };
});

// Форма 1 — тільки телефон
send1.onclick = () => {
  phone1.classList.remove("error");
  if (!validPhone(phone1.value)) {
    phone1.classList.add("error");
    alert("Введіть номер у форматі +380XXXXXXXXX");
    return;
  }
  modal1.classList.remove("active");
  phone1.value = "";
  alert("Ми зв'яжемося з вами!");
};

// Форма 2 — ПІБ + email + телефон
send2.onclick = () => {
  let ok = true;
  [nameContact, emailContact, phone2].forEach(el => el.classList.remove("error"));

  if (!nameContact.value.trim()) {
    nameContact.classList.add("error");
    ok = false;
  }
  if (!validEmail(emailContact.value)) {
    emailContact.classList.add("error");
    if (ok) alert("Невірний формат email");
    ok = false;
  }
  if (!validPhone(phone2.value)) {
    phone2.classList.add("error");
    if (ok) alert("Невірний номер телефону (+380XXXXXXXXX)");
    ok = false;
  }
  if (!ok) return;

  modal2.classList.remove("active");
  [nameContact, emailContact, phone2].forEach(el => { el.value = ""; });
  alert("Очікуйте листа!");
};

// Реального часу валідація
phone1.oninput = () => phone1.classList.toggle("error", !validPhone(phone1.value));
phone2.oninput = () => phone2.classList.toggle("error", !validPhone(phone2.value));
emailContact.oninput = () => emailContact.classList.toggle("error", !validEmail(emailContact.value));


const modalAuth      = document.getElementById("modalAuth");
const tabLogin       = document.getElementById("tabLogin");
const tabRegister    = document.getElementById("tabRegister");
const panelLogin     = document.getElementById("panelLogin");
const panelRegister  = document.getElementById("panelRegister");
const authSuccess    = document.getElementById("authSuccess");

const loginEmail     = document.getElementById("loginEmail");
const loginPassword  = document.getElementById("loginPassword");
const loginSubmit    = document.getElementById("loginSubmit");
const eyeLogin       = document.getElementById("eyeLogin");

const regFirstName   = document.getElementById("regFirstName");
const regLastName    = document.getElementById("regLastName");
const regEmail       = document.getElementById("regEmail");
const regPhone       = document.getElementById("regPhone");
const regPassword    = document.getElementById("regPassword");
const regConfirm     = document.getElementById("regConfirm");
const registerSubmit = document.getElementById("registerSubmit");
const eyeReg         = document.getElementById("eyeReg");
const strengthFill   = document.getElementById("strengthFill");
const strengthLabel  = document.getElementById("strengthLabel");

const navAuthBtn     = document.getElementById("navAuthBtn");
const navAuthItem    = document.getElementById("navAuthItem");
const navUserItem    = document.getElementById("navUserItem");
const userBadge      = document.getElementById("userBadge");
const userAvatar     = document.getElementById("userAvatar");
const userNameLabel  = document.getElementById("userNameLabel");
const logoutBtn      = document.getElementById("logoutBtn");

const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin    = document.getElementById("switchToLogin");
const forgotLink       = document.getElementById("forgotLink");
const calcCta          = document.getElementById("calcCta");

// Відкрити Auth Modal
navAuthBtn.onclick = () => {
  showPanel("login");
  modalAuth.classList.add("active");
};

calcCta.onclick = () => {
  showPanel("login");
  modalAuth.classList.add("active");
};

// Перемикання вкладок
tabLogin.onclick    = () => showPanel("login");
tabRegister.onclick = () => showPanel("register");
switchToRegister.onclick = () => showPanel("register");
switchToLogin.onclick    = () => showPanel("login");

function showPanel(which) {
  authSuccess.style.display = "none";

  if (which === "login") {
    panelLogin.classList.add("active");
    panelRegister.classList.remove("active");
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
  } else {
    panelRegister.classList.add("active");
    panelLogin.classList.remove("active");
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
  }
}

// Показати пароль / сховати
function toggleEye(inputEl, eyeEl) {
  const isPass = inputEl.type === "password";
  inputEl.type = isPass ? "text" : "password";
  eyeEl.textContent = isPass ? " " : "👁";
}
eyeLogin.onclick = () => toggleEye(loginPassword, eyeLogin);
eyeReg.onclick   = () => toggleEye(regPassword, eyeReg);

// Сила пароля
regPassword.oninput = () => {
  const val = regPassword.value;
  let score = 0;
  if (val.length >= 8)             score++;
  if (/[A-Z]/.test(val))           score++;
  if (/[0-9]/.test(val))           score++;
  if (/[^A-Za-z0-9]/.test(val))   score++;

  const levels = [
    { pct: 0,   color: "transparent", label: "Введіть пароль" },
    { pct: 25,  color: "#c0392b",     label: "Слабкий" },
    { pct: 50,  color: "#e67e22",     label: "Середній" },
    { pct: 75,  color: "#f1c40f",     label: "Добрий" },
    { pct: 100, color: "#27ae60",     label: "Надійний" },
  ];

  const lv = levels[score];
  strengthFill.style.width      = lv.pct + "%";
  strengthFill.style.background = lv.color;
  strengthLabel.textContent     = lv.label;
  strengthLabel.style.color     = lv.color;
};

// Забули пароль
forgotLink.onclick = () => {
  if (!loginEmail.value || !validEmail(loginEmail.value)) {
    loginEmail.focus();
    loginEmail.classList.add("error");
    setTimeout(() => loginEmail.classList.remove("error"), 1800);
    alert("Введіть email для відновлення пароля");
    return;
  }
  alert(`Інструкції надіслано на ${loginEmail.value}`);
};

/* ЛОГІН*/
loginSubmit.onclick = () => {
  let ok = true;
  [loginEmail, loginPassword].forEach(el => el.classList.remove("error"));

  if (!validEmail(loginEmail.value)) {
    loginEmail.classList.add("error");
    ok = false;
  }
  if (loginPassword.value.length < 6) {
    loginPassword.classList.add("error");
    ok = false;
  }
  if (!ok) { alert("Перевірте введені дані"); return; }

  // Перевіряємо збережений акаунт (localStorage для демо)
  const stored = JSON.parse(localStorage.getItem("pragmaUser") || "null");
  if (stored && stored.email === loginEmail.value && stored.password === loginPassword.value) {
    loginSuccess(stored.firstName, stored.lastName, stored.email);
  } else {
    // Демо-режим: будь-які коректні дані
    const namePart = loginEmail.value.split("@")[0];
    loginSuccess(namePart, "", loginEmail.value);
  }
};

/* РЕЄСТРАЦІЯ */
registerSubmit.onclick = () => {
  let ok = true;
  [regFirstName, regLastName, regEmail, regPhone, regPassword, regConfirm]
    .forEach(el => el.classList.remove("error"));

  if (!regFirstName.value.trim()) {
    regFirstName.classList.add("error"); ok = false;
  }
  if (!regLastName.value.trim()) {
    regLastName.classList.add("error"); ok = false;
  }
  if (!validEmail(regEmail.value)) {
    regEmail.classList.add("error"); ok = false;
  }
  if (!validPhone(regPhone.value)) {
    regPhone.classList.add("error"); ok = false;
  }
  if (regPassword.value.length < 8) {
    regPassword.classList.add("error"); ok = false;
  }
  if (regConfirm.value !== regPassword.value) {
    regConfirm.classList.add("error"); ok = false;
  }

  if (!ok) { alert("Будь ласка, заповніть усі поля коректно"); return; }

  // Зберігаємо у localStorage (демо)
  const userData = {
    firstName: regFirstName.value.trim(),
    lastName:  regLastName.value.trim(),
    email:     regEmail.value.trim(),
    phone:     regPhone.value.trim(),
    password:  regPassword.value,
  };
  localStorage.setItem("pragmaUser", JSON.stringify(userData));

  // Показуємо success state
  panelRegister.classList.remove("active");
  authSuccess.style.display = "block";
  document.getElementById("successTitle").textContent = `Вітаємо, ${userData.firstName}!`;
  document.getElementById("successMsg").textContent =
    "Акаунт успішно створено. Ласкаво просимо до Pragma.";

  setTimeout(() => {
    modalAuth.classList.remove("active");
    authSuccess.style.display = "none";
    loginSuccess(userData.firstName, userData.lastName, userData.email);
  }, 2200);
};

/* ВХІД: оновлення UI*/
function loginSuccess(firstName, lastName, email) {
  // Ховаємо кнопку "Увійти", показуємо badge
  navAuthItem.style.display = "none";
  navUserItem.style.display = "list-item";
  userBadge.style.display   = "flex";

  const initials = (firstName[0] || "?").toUpperCase() + (lastName[0] || "").toUpperCase();
  userAvatar.textContent  = initials || "P";
  userNameLabel.textContent = firstName + (lastName ? " " + lastName : "");

  modalAuth.classList.remove("active");
}

/* ВИХІД*/
logoutBtn.onclick = () => {
  navAuthItem.style.display = "list-item";
  navUserItem.style.display = "none";
  userBadge.style.display   = "none";
  // очищуємо форми
  [loginEmail, loginPassword].forEach(el => el.value = "");
};

// Перевірка — чи є збережений сеанс
(function checkSession() {
  const stored = JSON.parse(localStorage.getItem("pragmaUser") || "null");
  if (stored && stored.email) {
    loginSuccess(stored.firstName, stored.lastName, stored.email);
  }
})();



// Базові ціни за послугу ($/міс., стандартна інтенсивність)
const servicePrices = {
  strategy:   5000,
  operations: 4000,
  finance:    4500,
  digital:    5500,
  change:     3500,
  ma:         7000,
};

// Коефіцієнти розміру компанії
const sizeMultiplier = { small: 1.0, medium: 1.35, large: 1.8 };

// Коефіцієнти інтенсивності
const intensityMultiplier = { light: 0.5, standard: 1.0, full: 1.7 };

// Фіксована ціна додаткових опцій
const optionPrices = { reporting: 1500, training: 2500, support: 2000 };

// Назви для breakdown
const intensityNames = {
  light:    "легка інтенсивність",
  standard: "стандартна інтенсивність",
  full:     "повне залучення"
};

// Поточний стан калькулятора
let calcState = {
  service:   "strategy",
  size:      "small",
  duration:  3,
  intensity: "standard",
  options:   new Set(),
};

// Одиночний вибір чіпів (chip group з одним активним)
function setupSingleChips(groupId, key) {
  const group = document.getElementById(groupId);
  group.querySelectorAll(".chip").forEach(chip => {
    chip.onclick = () => {
      group.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      calcState[key] = chip.dataset.val;
      recalc();
    };
  });
}

// Множинний вибір чіпів (опції)
function setupMultiChips(groupId) {
  const group = document.getElementById(groupId);
  group.querySelectorAll(".chip").forEach(chip => {
    chip.onclick = () => {
      chip.classList.toggle("selected");
      const val = chip.dataset.val;
      if (calcState.options.has(val)) {
        calcState.options.delete(val);
      } else {
        calcState.options.add(val);
      }
      recalc();
    };
  });
}

setupSingleChips("chipService", "service");
setupSingleChips("chipSize",    "size");
setupMultiChips("chipOptions");

// Слайдер тривалості
const durationRange = document.getElementById("durationRange");
const durationLabel = document.getElementById("durationLabel");

durationRange.oninput = () => {
  const v = +durationRange.value;
  calcState.duration = v;
  const suffix = v === 1 ? "місяць" : (v < 5 ? "місяці" : "місяців");
  durationLabel.textContent = `${v} ${suffix}`;
  recalc();
};

// Вибір інтенсивності
const intensitySelect = document.getElementById("intensitySelect");
intensitySelect.onchange = () => {
  calcState.intensity = intensitySelect.value;
  recalc();
};

// Форматування числа з пробілами (15 000)
function fmt(n) {
  return Math.round(n).toLocaleString("uk-UA").replace(/,/g, "\u202F");
}

// Перерахунок
function recalc() {
  const base    = servicePrices[calcState.service] * calcState.duration;
  const withSize = base * sizeMultiplier[calcState.size];
  const withIntensity = withSize * intensityMultiplier[calcState.intensity];

  let optTotal = 0;
  calcState.options.forEach(opt => { optTotal += optionPrices[opt]; });

  const total = withIntensity + optTotal;

  // Розмір: надбавка
  const sizeAdd = withSize * intensityMultiplier[calcState.intensity] - base * intensityMultiplier[calcState.intensity];

  // Оновлення DOM з анімацією
  const priceEl = document.getElementById("priceValue");
  priceEl.parentElement.classList.remove("price-animate");
  void priceEl.parentElement.offsetWidth; // reflow
  priceEl.parentElement.classList.add("price-animate");
  priceEl.textContent = fmt(total);

  // Підпис під ціною
  const d = calcState.duration;
  const suffix = d === 1 ? "місяць" : (d < 5 ? "місяці" : "місяців");
  document.getElementById("resultPeriod").textContent =
    `за ${d} ${suffix} · ${intensityNames[calcState.intensity]}`;

  // Breakdown
  document.getElementById("bdBase").textContent    = `$${fmt(withIntensity)}`;
  const sizeDiff = withIntensity - base * intensityMultiplier[calcState.intensity];
  document.getElementById("bdSize").textContent    = sizeMultiplier[calcState.size] > 1
    ? `+$${fmt(withIntensity - base * intensityMultiplier[calcState.intensity] / sizeMultiplier[calcState.size])}`
    : "+$0";
  document.getElementById("bdOptions").textContent = optTotal > 0 ? `+$${fmt(optTotal)}` : "+$0";
}

recalc(); // ініціалізація


/* НАВІГАЦІЯ З ПІДМЕНЮ */
document.querySelectorAll(".has-sub").forEach(item => {
  const submenu = item.querySelector(".submenu");
  if (!submenu) return;

  item.addEventListener("mouseenter", () => {
    const siblings = item.parentElement.querySelectorAll(".has-sub > .submenu.open");
    siblings.forEach(s => { if (s !== submenu) s.classList.remove("open"); });
    submenu.style.display = "block";
    requestAnimationFrame(() => submenu.classList.add("open"));
  });

  item.addEventListener("mouseleave", () => {
    submenu.classList.remove("open");
    setTimeout(() => {
      if (!submenu.classList.contains("open")) submenu.style.display = "none";
    }, 240);
  });

  item.querySelector(":scope > span").addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = submenu.classList.contains("open");
    if (isOpen) {
      submenu.classList.remove("open");
      setTimeout(() => { submenu.style.display = "none"; }, 240);
    } else {
      submenu.style.display = "block";
      requestAnimationFrame(() => submenu.classList.add("open"));
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".submenu.open").forEach(s => {
    s.classList.remove("open");
    setTimeout(() => { s.style.display = "none"; }, 240);
  });
});


/* СЛАЙДЕР */
const sliderTrack = document.getElementById("sliderTrack");
const slides      = document.querySelectorAll(".slide");
const sliderPrev  = document.getElementById("sliderPrev");
const sliderNext  = document.getElementById("sliderNext");
const dotsWrap    = document.getElementById("sliderDots");
const sliderTitle = document.getElementById("sliderTitle");

const slideTitles = [
  "Досвід, що говорить сам за себе",
  "Індивідуальний підхід до кожного",
  "Результати, які можна виміряти",
  "Команда, якій можна довіряти"
];

let currentSlide = 0;
let autoTimer;

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.onclick = () => goTo(i);
  dotsWrap.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentSlide);
  });
}

function goTo(index) {
  currentSlide = (index + slides.length) % slides.length;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  sliderTitle.textContent = slideTitles[currentSlide];
  slides.forEach((s, i) => { s.style.opacity = i === currentSlide ? "1" : "0.45"; });
  updateDots();
}

sliderPrev.onclick = () => { resetAuto(); goTo(currentSlide - 1); };
sliderNext.onclick = () => { resetAuto(); goTo(currentSlide + 1); };

function startAuto() { autoTimer = setInterval(() => goTo(currentSlide + 1), 4500); }
function resetAuto() { clearInterval(autoTimer); startAuto(); }

startAuto();

let touchStartX = 0;
sliderTrack.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
sliderTrack.addEventListener("touchend", e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { resetAuto(); goTo(diff > 0 ? currentSlide + 1 : currentSlide - 1); }
});

slides.forEach((s, i) => {
  s.style.opacity = i === 0 ? "1" : "0.45";
  s.style.transition = "opacity .5s";
});


/* КНОПКА «ДІЗНАТИСЯ БІЛЬШЕ» */
const moreBtn    = document.getElementById("moreBtn");
const aboutExtra = document.getElementById("aboutExtra");

moreBtn.onclick = () => {
  const isHidden = aboutExtra.classList.contains("hidden");
  aboutExtra.classList.toggle("hidden");
  moreBtn.querySelector("span").textContent = isHidden ? "Згорнути ↑" : "Дізнатися більше";
};


/*  ПОСЛУГИ — hover-підказка */
const serviceHint = document.getElementById("serviceHint");
document.querySelectorAll(".service-list li").forEach(li => {
  const desc = li.dataset.desc;

  li.addEventListener("mouseenter", () => {
    serviceHint.textContent = desc;
    serviceHint.style.color = "#e8e4dc";
    serviceHint.style.letterSpacing = ".16em";
    const num = li.querySelector("span");
    num.style.color = "#e8e4dc";
    num.style.fontSize = "1.3rem";
  });

  li.addEventListener("mouseleave", () => {
    serviceHint.textContent = "Наведіть на послугу, щоб дізнатися більше";
    serviceHint.style.color = "";
    serviceHint.style.letterSpacing = "";
    const num = li.querySelector("span");
    num.style.color = "";
    num.style.fontSize = "";
  });
});


/* ПЛАВНА ПРОКРУТКА + АКТИВНИЙ ПУНКТ */
document.querySelectorAll("[data-scroll]").forEach(el => {
  el.onclick = () => {
    const target = document.getElementById(el.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };
});

const sections = document.querySelectorAll("section[id]");
const navItems  = document.querySelectorAll(".nav-list > li");

window.addEventListener("scroll", () => {
  let active = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) active = section.id;
  });
  navItems.forEach(item => {
    const link = item.querySelector("[data-scroll]");
    if (!link) return;
    item.classList.toggle("nav-active", link.dataset.scroll === active);
  });
});