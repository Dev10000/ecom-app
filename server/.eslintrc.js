module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'no-console': 0,
    'no-plusplus': [2, {
      allowForLoopAfterthoughts: true
    }],
    'import/no-cycle': 0,
    'camelcase': 0,
    'no-underscore-dangle': 0,
    'linebreak-style': [2, "unix"],
  }
};