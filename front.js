// public/js/front.js
window.onload = async () => {
  const container = document.getElementById('videos');
  const resp = await fetch("/api/videos");
  const list = await resp.json();
  if (!list.length) {
    container.innerHTML = "<p>No videos yet.</p>";
    return;
  }
  list.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <p>${v.filename}</p>
      <video src="${v.link}" controls width="360"></video>
      <br><a href="${v.link}" target="_blank">⬇️ Download</a>
    `;
    container.appendChild(card);
  });
};
