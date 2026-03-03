const clientLoginForm = document.getElementById('clientLoginForm');
const clientLoginMsg = document.getElementById('clientLoginMsg');

if (clientLoginForm) {
  clientLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(clientLoginForm);
    const clientId = String(form.get('clientId') || '').trim();
    const password = String(form.get('password') || '').trim();
    const reports = getData(APP_KEYS.reports, []);
    const report = reports.find(r => r.clientId === clientId && r.password === password);
    if (!report) {
      clientLoginMsg.textContent = 'Invalid client credentials.';
      clientLoginMsg.className = 'msg error';
      return;
    }
    localStorage.setItem(APP_KEYS.clientAuth, clientId);
    window.location.href = 'client-dashboard.html';
  });
}
