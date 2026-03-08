const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginMsg = document.getElementById('adminLoginMsg');

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(adminLoginForm);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '').trim();
    if (email === 'admin@foxdigital.com' && password === 'admin123') {
      localStorage.setItem(APP_KEYS.adminAuth, 'true');
      window.location.href = 'admin-dashboard.html';
      return;
    }
    adminLoginMsg.textContent = 'Invalid credentials.';
    adminLoginMsg.className = 'msg error';
  });
}
