const leadForm = document.getElementById('leadForm');
const formMsg = document.getElementById('formMsg');

if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(leadForm);
    const item = {
      id: crypto.randomUUID(),
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company'),
      website: form.get('website'),
      service: form.get('service'),
      message: form.get('message'),
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    const submissions = getData(APP_KEYS.submissions, []);
    submissions.unshift(item);
    setData(APP_KEYS.submissions, submissions);
    leadForm.reset();
    formMsg.textContent = 'Thanks! Your inquiry was received.';
    formMsg.className = 'msg success';
  });
}
