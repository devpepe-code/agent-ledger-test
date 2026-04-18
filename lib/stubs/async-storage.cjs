/** In-memory stub so MetaMask SDK’s optional RN import resolves in the browser bundle. */
const store = new Map();
const api = {
  getItem: (key) => Promise.resolve(store.get(String(key)) ?? null),
  setItem: (key, value) => {
    store.set(String(key), String(value));
    return Promise.resolve();
  },
  removeItem: (key) => {
    store.delete(String(key));
    return Promise.resolve();
  },
};
module.exports = api;
module.exports.default = api;
