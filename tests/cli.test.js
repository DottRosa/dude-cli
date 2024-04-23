import fs from 'fs';
import { beforeEach, describe, expect, test } from '@jest/globals';
import runCLI from '../lib/index.js';
import askService from '../lib/ask.js';

jest.mock('fs');
jest.mock('../lib/logger.js');
jest.mock('../lib/ask.js');

describe('runCLI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when the configuration file is missing', () => {
    test('it should create configuration file if missing', async () => {
      fs.existsSync.mockReturnValue(false);
      askService.confirmAction.mockResolvedValue(true);

      await runCLI();

      expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), '{}');
    });

    test('it should not create configuration file if user declines', async () => {
      fs.existsSync.mockReturnValue(false);
      askService.confirmAction.mockResolvedValue(false);

      await runCLI();

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe('when the configuration file is present', () => {
    test('it should read the file', async () => {
      fs.existsSync.mockReturnValue(true);

      await runCLI();

      expect(fs.writeFileSync).not.toHaveBeenCalledWith(
        expect.any(String),
        '{}',
      );
    });
  });
});
