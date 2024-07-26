<template>
  <button @click="toggleChat" class="fixed right-5 bottom-5 p-3 bg-blue-500 text-white rounded-full shadow-lg">
    Чат
  </button>
</template>

<script setup>
const props = defineProps({
  toggleChat: Function
});
</script>
