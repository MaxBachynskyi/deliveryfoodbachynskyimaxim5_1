const authButton = document.querySelector('.button-auth');
const logoutButton = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const userName = document.querySelector('.user-name');

const openAuthModal = () => {
  if (modalAuth) modalAuth.classList.add('is-open');
};

const closeAuthModal = () => {
  if (modalAuth) modalAuth.classList.remove('is-open');
};

function authorizedUser(username) {
  if (userName) {
    userName.textContent = username;
    userName.style.display = 'inline';
  }
  if (authButton) authButton.style.display = 'none';
  if (logoutButton) logoutButton.style.display = 'flex';
}

function notAuthorizedUser() {
  if (userName) userName.textContent = '';
  if (authButton) authButton.style.display = 'flex';
  if (logoutButton) logoutButton.style.display = 'none';
}

if (authButton) authButton.addEventListener('click', openAuthModal);
if (closeAuth) closeAuth.addEventListener('click', closeAuthModal);

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = loginInput?.value.trim();

    if (!login) {
      loginInput.classList.add('input-error');
      loginInput.focus();
      return;
    }

    loginInput.classList.remove('input-error');

    localStorage.setItem('user', login);
    authorizedUser(login);
    closeAuthModal();
    loginForm.reset();
  });
}

if (loginInput) {
  loginInput.addEventListener('input', () => {
    loginInput.classList.remove('input-error');
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    notAuthorizedUser();
  });
}

const savedUser = localStorage.getItem('user');

if (savedUser) {
  authorizedUser(savedUser);
} else {
  notAuthorizedUser();
}

