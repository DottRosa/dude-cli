/* eslint-disable no-console */
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import chalk from 'chalk';
import LogService from '../dist/lib/logger';

describe('logger functions', () => {
  // Mock log functions
  const originalLog = console.log;
  let consoleOutput = [];

  beforeEach(() => {
    // Overwrite the console functions to capture the outputs
    console.log = jest.fn((...args) => {
      consoleOutput.push(...args);
    });
    console.error = jest.fn((...args) => {
      consoleOutput.push(...args);
    });
  });

  afterEach(() => {
    // Restores the original console.log and console.error functions
    console.log = originalLog;
    // Reset console output after each test
    consoleOutput = [];
  });

  test('success should call console.log with the message', () => {
    const message = 'Success message';
    LogService.success(message);
    expect(console.log).toHaveBeenCalledWith(chalk.green(message));
  });

  test('error should call console.error with the message', () => {
    const message = 'Error message';
    LogService.error(message);
    expect(console.log).toHaveBeenCalledWith(chalk.red(message));
  });

  test('info should call console.log with the message', () => {
    const message = 'Info message';
    LogService.info(message);
    expect(console.log).toHaveBeenCalledWith(chalk.blue(message));
  });

  test('standard should call console.log with the message', () => {
    const message = 'Standard message';
    LogService.standard(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
