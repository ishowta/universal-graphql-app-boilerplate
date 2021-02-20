// Convert array of key-value tuple to record
export const record = <K extends number | string | symbol, V>(
  array: Array<[K, V]>
): Record<K, V> => {
  return array.reduce<Record<number | string | symbol, V>>(
    (rec, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      rec[key] = value;

      return rec;
    },
    {}
  );
};
