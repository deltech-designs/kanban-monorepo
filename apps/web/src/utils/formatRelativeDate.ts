// packages/shared/src/utils/formatRelativeDate.ts

export function formatRelativeDate(dateStr: string): string {
  if (!dateStr) return '';

  // Append T00:00:00 to prevent timezone offset shifting the date
  const date = new Date(dateStr + 'T00:00:00');

  if (isNaN(date.getTime())) return '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const t = target.getTime();

  if (t === today.getTime()) return 'Today';
  if (t === yesterday.getTime()) return 'Yesterday';
  if (t === tomorrow.getTime()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
