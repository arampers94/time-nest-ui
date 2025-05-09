import { User, UserColorAvatar } from '../interfaces';

export function getUserColorAvatar(user: User): UserColorAvatar {
  const initials =
    user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase();
  // Tailwind-compatible background color classes
  const colors = [
    'bg-red-700',
    'bg-sky-700',
    'bg-green-700',
    'bg-yellow-700',
    'bg-indigo-700',
    'bg-pink-700',
    'bg-purple-700',
    'bg-teal-700',
    'bg-orange-700',
    'bg-lime-700',
    'bg-stone-700',
    'bg-emerald-700',
    'bg-slate-700',
    'bg-rose-700',
    'bg-cyan-700',
    'bg-violet-700',
  ];

  const color = colors[Math.abs(hashString(initials)) % colors.length];

  return { initials, color };
}

// Hash function to choose a color from a palette
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}
