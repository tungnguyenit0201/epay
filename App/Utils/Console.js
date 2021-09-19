export const ConsoleUtils = {
    log: (...args) => __DEV__ && console.log(...args),
    warn: (...args) => __DEV__ && console.warn(...args),
    error: (...args) => __DEV__ && console.error(...args),
    exception: (...args) => __DEV__ && console.exception(...args),
};
