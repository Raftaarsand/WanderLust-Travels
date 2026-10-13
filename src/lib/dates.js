const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Dates are stored as "YYYY-MM-DD" strings (the format <input type="date"> uses).
// We build them from local time so "today" matches the user's calendar.
export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayISO() {
  return toISODate(new Date());
}

function parseISODate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDisplayDate(isoDate) {
  return parseISODate(isoDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function nightsBetween(startISO, endISO) {
  return Math.round((parseISODate(endISO) - parseISODate(startISO)) / MS_PER_DAY);
}
