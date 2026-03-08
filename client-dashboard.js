const clientId = localStorage.getItem(APP_KEYS.clientAuth);
if (!clientId) window.location.href = 'client-login.html';

const reports = getData(APP_KEYS.reports, []);
const report = reports.find(r => r.clientId === clientId);
if (!report) {
  localStorage.removeItem(APP_KEYS.clientAuth);
  window.location.href = 'client-login.html';
}

const clientTitle = document.getElementById('clientTitle');
const kpiLeads = document.getElementById('kpiLeads');
const kpiRoas = document.getElementById('kpiRoas');
const kpiCtr = document.getElementById('kpiCtr');
const kpiSpend = document.getElementById('kpiSpend');
const clientNotes = document.getElementById('clientNotes');
const updatedAt = document.getElementById('updatedAt');
const reportLinkWrap = document.getElementById('reportLinkWrap');
const commentsList = document.getElementById('commentsList');
const commentForm = document.getElementById('commentForm');
const commentMsg = document.getElementById('commentMsg');
const clientLogout = document.getElementById('clientLogout');

function render() {
  if (!report) return;
  clientTitle.textContent = `${report.name} Performance Results`;
  kpiLeads.textContent = report.metrics.leads;
  kpiRoas.textContent = report.metrics.roas;
  kpiCtr.textContent = `${report.metrics.ctr}%`;
  kpiSpend.textContent = `$${report.metrics.spend}`;
  clientNotes.textContent = report.notes || 'No notes yet.';
  updatedAt.textContent = new Date(report.updatedAt).toLocaleString();
  drawMetricsChart(document.getElementById('metricsChart'), report.metrics);

  if (report.reportFile) {
    reportLinkWrap.innerHTML = `<a class="btn btn-light" download="${report.reportFile.name}" href="${report.reportFile.data}">Download Report (${report.reportFile.name})</a>`;
  } else {
    reportLinkWrap.textContent = 'No PDF/DOC report uploaded yet.';
  }

  const comments = report.comments || [];
  commentsList.innerHTML = comments.map(c => `<div class="card" style="margin-bottom:.6rem;"><strong>${c.by}</strong><p style="margin:.3rem 0;">${c.text}</p><small>${new Date(c.at).toLocaleString()}</small></div>`).join('') || '<p>No comments yet.</p>';
}

if (commentForm) {
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(commentForm);
    const text = String(form.get('comment')).trim();
    if (!text) return;
    const all = getData(APP_KEYS.reports, []);
    const index = all.findIndex(r => r.clientId === clientId);
    if (index < 0) return;
    all[index].comments = all[index].comments || [];
    all[index].comments.unshift({ by: report.name || clientId, text, at: new Date().toISOString() });
    setData(APP_KEYS.reports, all);
    report.comments = all[index].comments;
    commentForm.reset();
    commentMsg.textContent = 'Comment submitted.';
    commentMsg.className = 'msg success';
    render();
  });
}

if (clientLogout) {
  clientLogout.addEventListener('click', () => {
    localStorage.removeItem(APP_KEYS.clientAuth);
    window.location.href = 'client-login.html';
  });
}

render();
