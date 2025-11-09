#!/usr/bin/env node
const { spawn } = require('node:child_process');

const port = process.env.PORT || '3000';
const args = ['next', 'start', '-p', port];

const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
