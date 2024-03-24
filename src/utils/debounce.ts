export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) => {
  let timerId: number | NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
