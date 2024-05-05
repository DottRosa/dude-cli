import { describe, test, expect, afterEach } from '@jest/globals';
import ConfigValidationLog from '../../src/lib/classes/config-validation-log';
import {
  CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM,
  CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM,
} from '../../src/lib/enums';

describe('ConfigValidationLog', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('message', () => {
    describe('when the field is missing', () => {
      test('should return the right message', async () => {
        const log = new ConfigValidationLog(
          CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
          'rapa',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
        );
        const result = log.message;
        expect(result).toBe('The field "rapa" is missing');
      });
    });

    describe('when the field is wrong', () => {
      test('should return the right message when the suggest list is empty', async () => {
        const log = new ConfigValidationLog(
          CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
          'rapa',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.WRONG_VALUE,
        );
        const result = log.message;
        expect(result).toBe(
          'The field "rapa" contains a wrong value. The accepted values are: ""',
        );
      });

      test('should return the right message when the suggest list is not empty', async () => {
        const log = new ConfigValidationLog(
          CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.STRING,
          'rapa',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.WRONG_VALUE,
          ['value1', 'value2'],
        );
        const result = log.message;
        expect(result).toBe(
          'The field "rapa" contains a wrong value. The accepted values are: "value1", "value2"',
        );
      });
    });

    describe('when the field is an empty list', () => {
      test('should return the right message', async () => {
        const log = new ConfigValidationLog(
          CONFIG_VALIDATION_LOG_MESSAGE_FIELD_TYPES_ENUM.LIST,
          'rapa',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.EMPTY_LIST,
        );
        const result = log.message;
        expect(result).toBe('The list "rapa" is empty');
      });
    });
  });
});
