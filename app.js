const shortenForm = document.getElementById('shorten-form');
const longUrlInput = document.getElementById('longUrl');
const resultDiv = document.getElementById('result');
const shortenedUrlInput = document.getElementById('shortenedUrl');
const copyBtn = document.getElementById('copy-btn');
const loader = document.querySelector('.loader');
const shortenBtn = document.querySelector('button[type="submit"]');

shortenForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const longUrl = longUrlInput.value.trim();
  if (longUrl) {
    await shortenUrl(longUrl);
  }
});

async function shortenUrl(longUrl) {
  loader.style.display = 'block';
  resultDiv.classList.remove('show');
  shortenBtn.disabled = true;

  try {
    const response = await fetch('https://api.tinyurl.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Yh6Sg5vj2fFcYICCZtl5e4ilWZDeeu234zijAZ4ewlSKI8PhNlhAb70AbelY'
      },
      body: JSON.stringify({ url: longUrl }),
    });
    const data = await response.json();
    if (response.ok) {
      shortenedUrlInput.value = data.data.tiny_url;
      resultDiv.classList.add('show');
    } else {
      alert(`Failed to shorten URL: ${data.errors[0]}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  } finally {
    loader.style.display = 'none';
    shortenBtn.disabled = false;
  }
}

copyBtn.addEventListener('click', () => {
  shortenedUrlInput.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.textContent = 'Copy';
  }, 2000);
});
