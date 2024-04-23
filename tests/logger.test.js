/* eslint-disable no-console */
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { logSuccess, logError, logInfo } from '../lib/logger';

describe('logger functions', () => {
  // Mock log functions
  const originalLog = console.log;
  const originalError = console.error;
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
    console.error = originalError;
    // Reset console output after each test
    consoleOutput = [];
  });

  test('logSuccess should call console.log with the message', () => {
    const message = 'Success message';
    logSuccess(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });

  test('logError should call console.error with the message', () => {
    const message = 'Error message';
    logError(message);
    expect(console.error).toHaveBeenCalledWith(message);
  });

  test('logInfo should call console.log with the message', () => {
    const message = 'Info message';
    logInfo(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
