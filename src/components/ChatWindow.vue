<template>
  <transition name="slide">
  <div v-if="visible" class="fixed right-5 bottom-20 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
    <div class="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
      <span>Чат</span>
      <button @click="toggleChat" class="text-white">&times;</button>
    </div>
    <div class="flex flex-1 flex-col p-3 overflow-y-auto">
      <div v-for="message in messages" :key="message.id" :class="messageClasses(message)">
        <div class="flex flex-col justify-between items-start">
          <span class="text-xs">{{ formatTimestamp(message.timestamp) }}</span>
          <span>{{ message.text }}</span>
        </div>
      </div>
    </div>
    <div v-if="isTyping" class="p-3 border-t border-gray-300 flex">
      <span class="typing-indicator">Оператор набирає текст...</span>
    </div>
    <div v-if="!isOptionSelected" class="p-3 border-t border-gray-300 flex">
      <input :value="userMessage" @input="$emit('update:userMessage', $event.target.value)" @keyup.enter="sendUserMessage" placeholder="Введіть своє питання" class="flex-1 p-2 border rounded-lg" />
      <button @click="sendUserMessage" class="ml-2 bg-blue-500 text-white p-2 rounded-lg">Відправити</button>
    </div>
    <div v-if="isOptionSelected" class="p-3 border-t border-gray-300 space-y-2">
      <button v-for="option in options" :key="option.key" @click="selectOption(option.key)" class="bg-gray-200 p-2 rounded-lg w-full text-left">
        {{ option.text }}
      </button>
    </div>
  </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  toggleChat: Function,
  messages: Array,
  userMessage: String,
  sendUserMessage: Function,
  isOptionSelected: Boolean,
  options: Array,
  selectOption: Function,
  isTyping: Boolean,
  visible: Boolean
});

function messageClasses(message) {
  return [
    'mb-2', 'p-2', 'rounded-lg', 'max-w-xs', 'break-words', 'w-[80%]', 'flex',
    message.type === 'user' ? 'self-end bg-blue-400 text-white' : 'self-start bg-gray-200'
  ];
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>