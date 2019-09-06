export const deferred = <T>() => {
  let resolve, reject;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    promiseFunction: () => promise,
    reject: async (err: Error) => {
      if (reject) {
        reject(err);
        reject = undefined;
        return tick();
      }
    },
    resolve: async (value: T) => {
      if (resolve) {
        resolve(value);
        resolve = undefined;
        return tick();
      }
    }
  };
};

export const tick = async (delay = 1) =>
  await new Promise(r => setTimeout(r, delay));
