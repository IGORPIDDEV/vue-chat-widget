<template>
  <div>
    <ChatButton :toggleChat="toggleChat" />
    <ChatWindow 
      :visible="chatOpen"
      :toggleChat="toggleChat" 
      :messages="messages" 
      :userMessage="userMessage" 
      @update:userMessage="updateUserMessage"
      :sendUserMessage="sendUserMessage" 
      :isOptionSelected="isOptionSelected"
      :options="options"
      :selectOption="selectOption"
      :isTyping="isTyping"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ChatButton from './components/ChatButton.vue';
import ChatWindow from './components/ChatWindow.vue';
import { getGreeting, getOptions, getResponse, sendMessage } from './api/chatApi';

const chatOpen = ref(false);
const messages = reactive([]);
const userMessage = ref('');
const isOptionSelected = ref(false);
const options = ref([]);
const isTyping = ref(false);

async function fetchGreeting() {
  isTyping.value = true;
  const greeting = await getGreeting();
  isTyping.value = false;
  return greeting;
}

async function fetchOptions() {
  const opt = await getOptions();
  options.value = opt;
  isOptionSelected.value = true;
}

async function fetchResponse(key) {
  isTyping.value = true;
  const response = await getResponse(key);
  isTyping.value = false;
  isOptionSelected.value = false;
  return response;
}

async function sendUserMessage() {
  if (userMessage.value.trim()) {
    addMessage(userMessage.value, 'user');
    const messageContent = userMessage.value;
    userMessage.value = '';
    isTyping.value = true;
    const response = await sendMessage(messageContent);
    isTyping.value = false;
    addMessage(response.text, response.type, response.timestamp);
  }
}

async function toggleChat() {
  chatOpen.value = !chatOpen.value;
  if (chatOpen.value && !messages.length) {
    const greeting = await fetchGreeting();
    addMessage(greeting.text, greeting.type, greeting.timestamp);
    await fetchOptions();
  }
}

const optionHandlers = {
  'customQuestion': async () => {
    isOptionSelected.value = false;
  },
  'default': async (key) => {
    const response = await fetchResponse(key);
    addMessage(response.text, response.type, response.timestamp);
    isOptionSelected.value = false;
  }
};

async function selectOption(key) {
  const option = options.value.find(opt => opt.key === key);  
  addMessage(option.text, option.type);  
  const handler = optionHandlers[key] || optionHandlers['default'];
  await handler(key);
}

function addMessage(text, type, timestamp = new Date()) {
  messages.push({ id: Date.now(), text, type, timestamp });
}

function updateUserMessage(value) {
  userMessage.value = value;
}
</script>