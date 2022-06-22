module.exports = {
  roots: ["__tests__"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
