type State = {
  state?: "resolve" | "reject";
  message?: string;
};
const wait = async (
  ms: number = 1000,
  options: State = {}
): Promise<void | string> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const state = options.state || "resolve";
      const message = options.message;
      if (state && state === "resolve") return resolve(message);
      const error = new Error(message);
      reject(error);
    }, ms)
  );
export default wait;
