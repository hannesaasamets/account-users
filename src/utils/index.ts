export const tick = (time: number) =>
  new Promise(resolve =>
    setTimeout(resolve, time));
