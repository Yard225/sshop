module.exports = {
  '**/*.{ts,js}': [
    'eslint --fix',
    'prettier --write'
  ],
  '**/*.{json,md,yaml,yml}': [
    'prettier --write'
  ]
};
