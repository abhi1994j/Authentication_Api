// logger.js — Node.js backend logger (ESM)

// ─────────────────────────────────────────────
// Dev mode check (Node only)
// ─────────────────────────────────────────────
const DEV = process.env.NODE_ENV !== 'production';

// ─────────────────────────────────────────────
// Timer storage
// ─────────────────────────────────────────────
const timers = new Map();

// ─────────────────────────────────────────────
// ANSI colors (Node terminal)
// ─────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const LEVEL_COLOR = {
  log: C.cyan,
  warn: C.yellow,
  error: C.red,
  info: C.blue,
  success: C.green,
};

// ─────────────────────────────────────────────
// Timestamp
// ─────────────────────────────────────────────
function getTime() {
  return new Date().toISOString();
}

// ─────────────────────────────────────────────
// Caller info (file + fn + line)
// ─────────────────────────────────────────────
function getCaller() {
  const stack = new Error().stack?.split('\n') || [];

  for (let i = 2; i < stack.length; i++) {
    const line = stack[i];

    if (line.includes('logger.js')) continue;

    const m = line.match(/at\s+(.*?)\s+\((.*):(\d+):(\d+)\)/) ||
      line.match(/at\s+(.*):(\d+):(\d+)/);

    if (!m) continue;

    if (m.length === 5) {
      const fn = m[1];
      const file = m[2].split(/[\\/]/).pop();
      const lineNo = m[3];
      return `[${file} in function ${fn}:${lineNo}]`;
    } else {
      const file = m[1].split(/[\\/]/).pop();
      const lineNo = m[2];
      return `[${file}:${lineNo}]`;
    }
  }

  return '[unknown]';
}

// ─────────────────────────────────────────────
// Core printer
// ─────────────────────────────────────────────
function print(level, args) {
  if (!DEV) return;

  const tag = getCaller();
  // const ts = getTime();
  const color = LEVEL_COLOR[level] || C.magenta;
  const method = level === 'success' ? 'log' : level;

  console[method](
    `${color}${tag}${C.reset}`,
    `${C.magenta}${C.reset}`,
    ...args
  );
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────
export const log = (...a) => print('log', a);
export const warn = (...a) => print('warn', a);
export const error = (...a) => print('error', a);
export const info = (...a) => print('info', a);
export const success = (...a) => print('success', a);

// Groups
export function group(label = 'Group') {
  if (DEV) console.group(label);
}

export function groupEnd() {
  if (DEV) console.groupEnd();
}

// Timers
export function time(label = 'default') {
  if (!DEV) return;
  timers.set(label, Date.now());
}

export function timeLog(label = 'default') {
  if (!DEV) return;
  const start = timers.get(label);
  if (!start) return warn(`[Timer "${label}" not found]`);
  info(`[Timer ${label}] ${Date.now() - start}ms`);
}

export function timeEnd(label = 'default') {
  if (!DEV) return;
  const start = timers.get(label);
  if (!start) return warn(`[Timer "${label}" not found]`);
  info(`[Timer ${label}] ${Date.now() - start}ms`);
  timers.delete(label);
}

export default {
  log,
  warn,
  error,
  info,
  success,
  group,
  groupEnd,
  time,
  timeLog,
  timeEnd,
};
