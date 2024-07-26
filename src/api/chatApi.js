export function getGreeting() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ text: "Привіт! Який у вас запит?", type: "bot", timestamp: new Date() });
    }, 1000);
  });
}

export function getOptions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { key: "whatDayToday", text: "Який сьогодні день?", type: "user" },
        { key: "whatTimeNow", text: "Яка зараз година?", type: "user" },
        { key: "daysUntilNewYear", text: "Скільки днів до Нового Року?", type: "user" },
        { key: "customQuestion", text: "Своє питання", type: "user" }
      ]);
    }, 1000);
  });
}

export function getResponse(key) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = {
        whatDayToday: { text: `Сьогодні ${new Date().toLocaleDateString('uk-UA', { weekday: 'long' })}.`, type: "bot", timestamp: new Date() },
        whatTimeNow: { text: `Зараз ${new Date().toLocaleTimeString('uk-UA')}.`, type: "bot", timestamp: new Date() },
        daysUntilNewYear: { text: `До Нового Року залишилось ${Math.ceil((new Date(`January 1, ${new Date().getFullYear() + 1}`) - new Date()) / (1000 * 60 * 60 * 24))} днів.`, type: "bot", timestamp: new Date() }
      };
      resolve(responses[key]);
    }, 1000);
  });
}

export function sendMessage(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ text: "Дякуємо за ваше питання!", type: "bot", timestamp: new Date() });
    }, 2000);
  });
}
