import fs from 'fs';
import { beforeEach, describe, expect, test } from '@jest/globals';
import runCLI from '../src/lib/index';
import askService from '../src/lib/ask';

jest.mock('fs');
jest.mock('../src/lib/logger.ts');
jest.mock('../src/lib/ask.ts');

describe('runCLI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when the configuration file is missing', () => {
    test('it should create configuration file if missing', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      jest.spyOn(askService, 'confirmAction').mockResolvedValue(true);

      await runCLI();

      expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), '{}');
    });

    test('it should not create configuration file if user declines', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      jest.spyOn(askService, 'confirmAction').mockResolvedValue(false);

      await runCLI();

      expect(fs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe('when the configuration file is present', () => {
    test('it should read the file', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);

      await runCLI();

      expect(fs.writeFileSync).not.toHaveBeenCalledWith(
        expect.any(String),
        '{}',
      );
    });
  });
});
