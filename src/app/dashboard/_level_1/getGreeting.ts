export function getTimeOfDayGreeting(date: Date) {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

export function getRandomGreeting(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export const GREETINGS = {
  morning: [
    'Good morning,',
    'Rise and shine 🌞',
    'Welcome back,',
    'Have a great day ahead!'
  ],
  afternoon: [
    'Good afternoon ☀️',
    'Welcome back!',
    "Hope your day's swell!",
    'Great to see you,',
  ],
  evening: [
    'Good evening 🌥️',
    'Welcome back,',
    'Was your day productive?',
    'Nice to see you again!',
  ],
  night: [
    '🌙 Burning midnight oil?',
    'Good evening,',
    'Welcome back,',
    'Working late or early?',
  ],
};
