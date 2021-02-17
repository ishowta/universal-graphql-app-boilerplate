// Convert array of key-value tuple to record
export const record = <K extends string | number | symbol, V>(arr: [K, V][]) =>
  arr.reduce<Record<string | number | symbol, V>>((rec, [key, val]) => {
    // eslint-disable-next-line no-param-reassign
    rec[key] = val;
    return rec;
  }, {}) as Record<K, V>;