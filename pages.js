/* pages.js — підключається на services.html і contacts.html */

/* ── Відновлення сесії (з localStorage, як у script.js) ── */
(function restoreSession() {
  var stored = JSON.parse(localStorage.getItem('pragmaUser') || 'null');
  if (!stored || !stored.email) return;

  var authItem = document.getElementById('navAuthItem');
  var userItem = document.getElementById('navUserItem');
  var avatar   = document.getElementById('userAvatar');
  var nameLabel = document.getElementById('userNameLabel');

  if (authItem) authItem.style.display = 'none';
  if (userItem) userItem.style.display = 'list-item';

  if (avatar) {
    avatar.textContent =
      (stored.firstName ? stored.firstName[0].toUpperCase() : '?') +
      (stored.lastName  ? stored.lastName[0].toUpperCase()  : '');
  }
  if (nameLabel) {
    nameLabel.textContent = stored.firstName +
      (stored.lastName ? ' ' + stored.lastName : '');
  }
})();

/* ── Кнопка «Увійти» → редирект на index.html з якорем ── */
var navAuthBtn = document.getElementById('navAuthBtn');
if (navAuthBtn) {
  navAuthBtn.onclick = function () {
    window.location.href = 'index.html#auth';
  };
}

/* ── Кнопка «Вийти» ── */
var logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.onclick = function () {
    var authItem = document.getElementById('navAuthItem');
    var userItem = document.getElementById('navUserItem');
    if (authItem) authItem.style.display = 'list-item';
    if (userItem) userItem.style.display = 'none';
  };
}

/* ── Субменю на мобільних (touch) ── */
document.querySelectorAll('.has-sub > span').forEach(function (toggle) {
  toggle.addEventListener('click', function (e) {
    var li = toggle.closest('.has-sub');
    var isOpen = li.classList.contains('open');
    document.querySelectorAll('.has-sub.open').forEach(function (el) {
      el.classList.remove('open');
    });
    if (!isOpen) li.classList.add('open');
    e.stopPropagation();
  });
});

document.addEventListener('click', function () {
  document.querySelectorAll('.has-sub.open').forEach(function (el) {
    el.classList.remove('open');
  });
});