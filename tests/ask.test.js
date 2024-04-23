import { describe, test, expect, afterEach } from '@jest/globals';
import * as inquirer from 'inquirer';
import askService from '../lib/ask';

jest.mock('inquirer');

describe('askService', () => {
  afterEach(() => {
    // Resetta i mock dopo ogni test
    jest.clearAllMocks();
  });

  describe('confirmAction', () => {
    test('should return true when user confirms action', async () => {
      inquirer.prompt.mockResolvedValueOnce({ confirmation: true });

      const result = await askService.confirmAction('Are you sure?');
      expect(result).toBe(true);
    });

    test('should return false when user does not confirms action', async () => {
      inquirer.prompt.mockResolvedValueOnce({ confirmation: false });

      const result = await askService.confirmAction('Are you sure?');
      expect(result).toBe(false);
    });
  });

  describe('chooseOption', () => {
    test('should return the selected option', async () => {
      inquirer.prompt.mockResolvedValueOnce({ chosenOption: 'pizza' });

      const result = await askService.chooseOption('Choose a dish', [
        'banana',
        'pizza',
        'pompelmo',
      ]);
      expect(result).toBe('pizza');
    });
  });

  describe('enterValue', () => {
    test('should return the value typed by the user', async () => {
      inquirer.prompt.mockResolvedValueOnce({ value: 'pizza' });

      const result = await askService.enterValue(
        'What is your favourite dish?',
      );
      expect(result).toBe('pizza');
    });
  });
});
