interface Deferred<T> {
  promise: Promise<T>;
  promiseFunction: () => Promise<T>;
  reject: (err: Error) => Promise<void>;
  resolve: (value: T) => Promise<void>;
}

export const tick = async (delay = 1): Promise<void> =>
  await new Promise((r): unknown => setTimeout(r, delay));

export const deferred = <T>(): Deferred<T> => {
  let resolve, reject;

  const promise = new Promise<T>((res, rej): void => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    promiseFunction: (): Promise<T> => promise,
    reject: async (err: Error): Promise<void> => {
      if (reject) {
        reject(err);
        reject = undefined;
        return tick();
      }
    },
    resolve: async (value: T): Promise<void> => {
      if (resolve) {
        resolve(value);
        resolve = undefined;
        return tick();
      }
    }
  };
};
