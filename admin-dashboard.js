if (localStorage.getItem(APP_KEYS.adminAuth) !== 'true') {
  window.location.href = 'admin-login.html';
}

const submissionRows = document.getElementById('submissionRows');
const reportForm = document.getElementById('reportForm');
const reportMsg = document.getElementById('reportMsg');
const adminLogout = document.getElementById('adminLogout');

function renderSubmissions() {
  if (!submissionRows) return;
  const submissions = getData(APP_KEYS.submissions, []);
  submissionRows.innerHTML = submissions.map(item => `
    <tr>
      <td>${item.name || ''}</td>
      <td>${item.email || ''}</td>
      <td>${item.service || ''}</td>
      <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      <td><span class="badge ${item.status === 'New' ? 'warn' : 'ok'}">${item.status || 'New'}</span></td>
    </tr>
  `).join('') || '<tr><td colspan="5">No submissions yet.</td></tr>';
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

if (reportForm) {
  reportForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(reportForm);
    const reports = getData(APP_KEYS.reports, []);
    const id = String(form.get('clientId')).trim();
    const file = form.get('reportFile');

    let reportFile = null;
    if (file && file.size > 0) {
      reportFile = {
        name: file.name,
        type: file.type || 'application/octet-stream',
        data: await toBase64(file)
      };
    }

    const next = {
      clientId: id,
      password: String(form.get('password')).trim(),
      name: String(form.get('name')).trim(),
      website: String(form.get('website')).trim(),
      notes: String(form.get('notes')).trim(),
      metrics: {
        leads: Number(form.get('leads')),
        roas: Number(form.get('roas')),
        ctr: Number(form.get('ctr')),
        spend: Number(form.get('spend'))
      },
      comments: (reports.find(r => r.clientId === id)?.comments) || [],
      reportFile: reportFile || (reports.find(r => r.clientId === id)?.reportFile) || null,
      updatedAt: new Date().toISOString()
    };

    const filtered = reports.filter(r => r.clientId !== id);
    filtered.unshift(next);
    setData(APP_KEYS.reports, filtered);
    reportMsg.textContent = `Report saved for ${next.clientId}.`;
    reportMsg.className = 'msg success';
    reportForm.reset();
  });
}

if (adminLogout) {
  adminLogout.addEventListener('click', () => {
    localStorage.removeItem(APP_KEYS.adminAuth);
    window.location.href = 'admin-login.html';
  });
}

renderSubmissions();
