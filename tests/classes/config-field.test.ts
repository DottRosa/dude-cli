import { describe, test, expect, afterEach } from '@jest/globals';
import ConfigService from '../../src/lib/config';
import ConfigField from '../../src/lib/classes/config-field';
import { CONFIG_ACTION_FIELD_TYPES_ENUM } from '../../src/lib/enums';

function getPath(field: ConfigField) {
  return `[Action ${field.parentActionName ?? ''}/Field ${field.id ?? ''}]`;
}

describe('ConfigField', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    describe('when the id is missing', () => {
      test('should validate', async () => {
        const configService = new ConfigService();
        const field = new ConfigField(
          configService,
          'myAction',
          '',
          'rapa',
          CONFIG_ACTION_FIELD_TYPES_ENUM.STRING,
        );
        field.validate();
        expect(configService.errorLogMessages).toEqual([
          `${getPath(field)} The field "id" is missing`,
        ]);
      });
    });

    describe('when the name is missing', () => {
      test('should validate', async () => {
        const configService = new ConfigService();
        const field = new ConfigField(
          configService,
          'myAction',
          'greetings',
          '',
          CONFIG_ACTION_FIELD_TYPES_ENUM.STRING,
        );
        field.validate();
        expect(configService.errorLogMessages).toEqual([
          `${getPath(field)} The field "name" is missing`,
        ]);
      });
    });

    describe('when the field is a list and there are no values', () => {
      test('should validate', async () => {
        const configService = new ConfigService();
        const field = new ConfigField(
          configService,
          'myAction',
          'greetings',
          'rapa',
          CONFIG_ACTION_FIELD_TYPES_ENUM.LIST,
        );
        field.validate();
        expect(configService.errorLogMessages).toEqual([
          `${getPath(field)} The list "values" is empty`,
        ]);
      });
    });
  });
});
