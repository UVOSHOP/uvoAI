
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const loading = document.getElementById("loading");

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerHTML = '<div class="bubble">' + text + '</div>';
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateResponse(userMessage) {
  loading.classList.remove("hidden");
  fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(userMessage)}&format=json&no_redirect=1&no_html=1`)
    .then(res => res.json())
    .then(data => {
      loading.classList.add("hidden");
      let result = data.AbstractText || "Maaf, saya tidak menemukan jawaban yang relevan.";
      appendMessage("ai", result);
    })
    .catch(() => {
      loading.classList.add("hidden");
      appendMessage("ai", "Terjadi kesalahan dalam mengambil data.");
    });
}

function handleUserMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage("user", msg);
  userInput.value = "";
  simulateResponse(msg);
}

sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleUserMessage();
  }
});
