#!/usr/bin/env node

const fs = require('fs');
const msgPath = process.argv[2] || '.git/COMMIT_EDITMSG';
const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const valid = /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}/.test(msg);

if (!valid) {
  console.error('⛔️ Le message de commit doit respecter le format conventionnel (ex: feat: ...).');
  process.exit(1);
}
