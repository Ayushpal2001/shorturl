document.getElementById('urlForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const originalUrl = document.getElementById('originalUrl').value;
  const resultEl = document.getElementById('result');
  resultEl.innerHTML = '';

  const response = await fetch('/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl })
  });

  const data = await response.json();

  if (response.ok) {
    resultEl.innerHTML = `Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
  } else {
    resultEl.textContent = `Error: ${data.error}`;
  }
});
