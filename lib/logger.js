import chalk from 'chalk';

const originalWarn = console.warn;
const originalError = console.error;
const originalInfo = console.info;
const originalLog = console.log;

console.warn = (...args) => originalWarn(chalk.yellow("Warn: ", ...args));
console.error = (...args) => originalError(chalk.red("Error: ", ...args));
console.info = (...args) => originalInfo(chalk.blue("Info: ", ...args));
console.log = (...args) => originalLog(chalk.white("Log: ", ...args));
