/* eslint-disable no-console */
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import chalk from 'chalk';
import logService from '../dist/lib/logger';

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
    logService.success(message);
    expect(console.log).toHaveBeenCalledWith(chalk.green(message));
  });

  test('error should call console.error with the message', () => {
    const message = 'Error message';
    logService.error(message);
    expect(console.log).toHaveBeenCalledWith(chalk.red(message));
  });

  test('info should call console.log with the message', () => {
    const message = 'Info message';
    logService.info(message);
    expect(console.log).toHaveBeenCalledWith(chalk.blue(message));
  });

  test('standard should call console.log with the message', () => {
    const message = 'Standard message';
    logService.standard(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
