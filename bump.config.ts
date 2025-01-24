import { defineConfig } from 'bumpp';

export default defineConfig({
  all: true,
  confirm: false,
  files: ['package.json'],
  noGitCheck: true,
  noVerify: false,
  printCommits: true,
  push: false,
  tag: true,
});
