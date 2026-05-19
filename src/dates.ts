const TZ = 'Europe/Amsterdam';

interface AmsterdamParts {
  year: number;
  month: number;
  day: number;
  weekday: number;
}

function getAmsterdamParts(now: Date): AmsterdamParts {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
  const parts = fmt.formatToParts(now);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const weekdayMap: Record<string, number> = {
    Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7,
  };
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    weekday: weekdayMap[map.weekday] ?? 1,
  };
}

export function mostRecentMonday(now: Date = new Date()): string {
  const parts = getAmsterdamParts(now);
  const utcMidnight = Date.UTC(parts.year, parts.month - 1, parts.day);
  const offset = parts.weekday - 1;
  const mondayMs = utcMidnight - offset * 86_400_000;
  const d = new Date(mondayMs);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

export function formatDutchDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${DUTCH_MONTHS[m - 1]} ${y}`;
}
