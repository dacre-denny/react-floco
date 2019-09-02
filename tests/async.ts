export const deferred = <T>() => {
  let resolve, reject;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    promiseFunction: () => promise,
    resolve: async (value: T) => {
      if (resolve) {
        resolve(value);
        resolve = undefined;
      }
    },
    reject: async (err: Error) => {
      if (reject) {
        reject(err);
        reject = undefined;
      }
    }
  };
};

export const tick = async () => await new Promise(r => setTimeout(r, 1));
