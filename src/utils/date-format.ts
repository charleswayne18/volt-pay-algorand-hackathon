export function getHoursAndMinutes(date: Date) {
  const hours = date.getHours();
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  const formattedMinutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'pm' : 'am';
  return `${formattedHours}:${formattedMinutes} ${period}`;
}
