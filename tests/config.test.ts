import { describe, test, expect, afterEach } from '@jest/globals';
import ConfigService from '../src/lib/config';
import ConfigValidationLog from '../src/lib/classes/config-validation-log';
import {
  CONFIG_VALIDATION_LOG_LEVEL_ENUM,
  CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM,
  CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM,
} from '../src/lib/enums';

describe('configService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addLog', () => {
    test('should add the log', async () => {
      const configService = new ConfigService();
      expect(configService.logs.length).toBe(0);

      const log = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      configService.addLog(log);
      expect(configService.logs.length).toBe(1);
    });
  });

  describe('errorLogsExist', () => {
    test('should return true if there is at least one error log', async () => {
      const configService = new ConfigService();
      expect(configService.errorLogsExist).toBe(false);

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      configService.addLog(errorLog);
      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.errorLogsExist).toBe(true);
    });

    test('should return false if there are no error logs', async () => {
      const configService = new ConfigService();
      expect(configService.errorLogsExist).toBe(false);

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.errorLogsExist).toBe(false);
    });
  });

  describe('warningLogsExist', () => {
    test('should return true if there is at least one warning log', async () => {
      const configService = new ConfigService();
      expect(configService.warningLogsExist).toBe(false);

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING,
      );

      configService.addLog(errorLog);
      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.warningLogsExist).toBe(true);
    });

    test('should return false if there are no warning logs', async () => {
      const configService = new ConfigService();
      expect(configService.warningLogsExist).toBe(false);

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      configService.addLog(infoLog);
      configService.addLog(errorLog);
      expect(configService.warningLogsExist).toBe(false);
    });
  });

  describe('infoLogsExist', () => {
    test('should return true if there is at least one info log', async () => {
      const configService = new ConfigService();
      expect(configService.infoLogsExist).toBe(false);

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      configService.addLog(errorLog);
      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.infoLogsExist).toBe(true);
    });

    test('should return false if there are no info logs', async () => {
      const configService = new ConfigService();
      expect(configService.infoLogsExist).toBe(false);

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING,
      );

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      configService.addLog(warningLog);
      configService.addLog(errorLog);
      expect(configService.infoLogsExist).toBe(false);
    });
  });

  describe('errorLogMessages', () => {
    test('should return the list of errors if there is at least one error log', async () => {
      const configService = new ConfigService();
      expect(configService.errorLogMessages).toEqual([]);

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      configService.addLog(errorLog);
      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.errorLogMessages).toEqual([errorLog.message]);
    });

    test('should return an empty list if there are no error logs', async () => {
      const configService = new ConfigService();
      expect(configService.errorLogMessages).toEqual([]);

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.errorLogMessages).toEqual([]);
    });
  });

  describe('warningLogMessages', () => {
    test('should return a list of warnings if there is at least one warning log', async () => {
      const configService = new ConfigService();
      expect(configService.warningLogMessages).toEqual([]);

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING,
      );

      configService.addLog(errorLog);
      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.warningLogMessages).toEqual([warningLog.message]);
    });

    test('should return an empty list if there are no warning logs', async () => {
      const configService = new ConfigService();
      expect(configService.warningLogMessages).toEqual([]);

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      configService.addLog(infoLog);
      configService.addLog(errorLog);
      expect(configService.warningLogMessages).toEqual([]);
    });
  });

  describe('infoLogMessages', () => {
    test('should return a list of infos if there is at least one info log', async () => {
      const configService = new ConfigService();
      expect(configService.infoLogMessages).toEqual([]);

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      const infoLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO,
      );

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING,
      );

      configService.addLog(errorLog);
      configService.addLog(infoLog);
      configService.addLog(warningLog);
      expect(configService.infoLogMessages).toEqual([infoLog.message]);
    });

    test('should return an empty list if there are no info logs', async () => {
      const configService = new ConfigService();
      expect(configService.infoLogMessages).toEqual([]);

      const warningLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        [],
        CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING,
      );

      const errorLog = new ConfigValidationLog(
        CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
        'rapa',
        CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
      );

      configService.addLog(warningLog);
      configService.addLog(errorLog);
      expect(configService.infoLogMessages).toEqual([]);
    });
  });
});
