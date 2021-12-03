const isoToObj = (s) => {
  const b = s.split(/[-TZ:]/i);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
};

const timeToGo = (s) => {
  // Utility to add leading zero
  const z = (n) => (n < 10 ? "0" : "") + n;

  // Convert string to date object
  const d = isoToObj(s);
  let diff = d - new Date();

  // Allow for previous times
  const sign = diff < 0 ? "-" : "";
  diff = Math.abs(diff);

  // Get time components
  const hours = (diff / 3.6e6) | 0;
  const mins = ((diff % 3.6e6) / 6e4) | 0;
  const secs = Math.round((diff % 6e4) / 1e3);

  // Return formatted string
  return sign + z(hours) + ":" + z(mins) + ":" + z(secs);
};

export default timeToGo;
