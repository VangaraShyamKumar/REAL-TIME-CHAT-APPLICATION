const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

const displayMessage = (message, sender) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; 
};

const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  chatBox.innerHTML = '';
  messages.forEach(({ user, bot }) => {
    displayMessage(user, 'user');
    displayMessage(bot, 'bot');
  });
};

const addMessagesToStorage = (userMessage, botReply) => {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push({ user: userMessage, bot: botReply });
  localStorage.setItem('chatMessages', JSON.stringify(messages));
};

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (userMessage) {
    const botReply = userMessage; 
    displayMessage(userMessage, 'user');
    displayMessage(botReply, 'bot');
    addMessagesToStorage(userMessage, botReply);
    messageInput.value = '';
  }
});

loadMessages();