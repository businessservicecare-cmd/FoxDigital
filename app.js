const APP_KEYS = {
  submissions: 'foxdigital_submissions',
  reports: 'foxdigital_reports',
  adminAuth: 'foxdigital_admin_auth',
  clientAuth: 'foxdigital_client_auth'
};

const DEFAULT_CLIENTS = [
  {
    clientId: 'client-demo',
    password: 'client123',
    name: 'Demo Client',
    website: 'https://example.com',
    notes: 'Monthly optimization ongoing',
    metrics: { leads: 84, roas: 4.2, ctr: 5.4, spend: 2300 },
    comments: [],
    reportFile: null,
    updatedAt: new Date().toISOString()
  }
];

function getData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureDefaults() {
  const reports = getData(APP_KEYS.reports, null);
  if (!reports) setData(APP_KEYS.reports, DEFAULT_CLIENTS);
}

function setupNavToggle() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('show'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('show')));
}

function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
}

function setYear() {
  const node = document.getElementById('year');
  if (node) node.textContent = new Date().getFullYear();
}

function drawMetricsChart(canvas, metrics) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const entries = [
    ['Leads', Number(metrics.leads) || 0],
    ['ROAS', Number(metrics.roas) || 0],
    ['CTR', Number(metrics.ctr) || 0],
    ['Spend/100', (Number(metrics.spend) || 0) / 100]
  ];
  const max = Math.max(...entries.map(e => e[1]), 1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = 70;
  entries.forEach((entry, index) => {
    const x = 35 + index * 95;
    const h = (entry[1] / max) * 130;
    const y = 170 - h;
    ctx.fillStyle = '#ff6b35';
    ctx.fillRect(x, y, barWidth, h);
    ctx.fillStyle = '#10213d';
    ctx.font = '12px Inter';
    ctx.fillText(entry[0], x + 12, 190);
    ctx.fillText(String(entry[1]), x + 15, y - 6);
  });
}

ensureDefaults();
setupNavToggle();
setActiveNav();
setYear();
