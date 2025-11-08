#!/usr/bin/env node
// Custom dev runner with extra diagnostics to keep process alive

const { spawn } = require('child_process');

function ensureNodeVersion() {
  const requiredMajor = 20;
  const actual = process.versions.node.split('.')[0];
  if (Number(actual) !== requiredMajor) {
    console.warn(`\n[WARN] Detected Node ${process.versions.node}. Recommended Node ${requiredMajor}.x for this project.`);
    console.warn('[WARN] Please install/switch (nvm use 20) to avoid unexpected dev server exits.\n');
  }
}

ensureNodeVersion();

const env = { ...process.env, DEBUG: 'next:*' };

console.log('[DEV] Starting Next.js dev server with extended debug...');
const child = spawn('npx', ['next', 'dev', '-p', '3000'], {
  stdio: 'inherit',
  env
});

child.on('exit', (code, signal) => {
  console.error(`\n[DEV] Next.js dev process exited. code=${code} signal=${signal}`);
  if (code !== 0) {
    console.error('[DEV] Attempting automatic restart in 3s... (Ctrl+C to abort)');
    setTimeout(() => {
      console.log('[DEV] Restarting...');
      spawn(process.argv[0], [__filename], { stdio: 'inherit', env });
    }, 3000);
  } else {
    console.log('[DEV] Clean shutdown.');
  }
});
