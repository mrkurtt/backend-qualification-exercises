export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  // Flatten all downtime periods from all sources
  const allPeriods: [Date, Date][] = [];
  for (const logs of args) {
    allPeriods.push(...logs);
  }

  // Sort periods by start time
  allPeriods.sort((a, b) => a[0].getTime() - b[0].getTime());

  // Merge overlapping periods
  const merged: [Date, Date][] = [];

  for (const current of allPeriods) {
    if (merged.length === 0) {
      // First period
      merged.push(current);
    } else {
      const last = merged[merged.length - 1];

      // Check if current period overlaps with the last merged period
      // Two periods overlap if current starts before or at the end of the last period
      if (current[0].getTime() <= last[1].getTime()) {
        // Merge: extend the end time to the maximum of both periods
        last[1] = new Date(Math.max(last[1].getTime(), current[1].getTime()));
      } else {
        // No overlap, add as new period
        merged.push(current);
      }
    }
  }

  return merged;
}
