/** No-op stub; pino only loads this in optional dev tooling paths. */
module.exports = function pinoPretty() {
  return (line) => line;
};
