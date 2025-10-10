import chalk from 'chalk';

const originalWarn = console.warn;
const originalError = console.error;
const originalInfo = console.info;

console.warn = (...args) => originalWarn(chalk.yellow(...args));
console.error = (...args) => originalError(chalk.red(...args));
console.info = (...args) => originalInfo(chalk.blue(...args));
