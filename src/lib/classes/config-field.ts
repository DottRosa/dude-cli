import ConfigService from '../config';
import {
  CONFIG_ACTION_FIELD_TYPES_ENUM,
  CONFIG_VALIDATION_LOG_PROPERTY_TYPES_ENUM,
  CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM,
} from '../enums';
import ConfigCommon from '../interfaces/config-common';
import { CONFIG_ACTION_FIELD_TYPE_TYPES } from '../types';
import ConfigValidationLog from './config-validation-log';

export default class ConfigField implements ConfigCommon {
  private readonly configService: ConfigService;

  readonly parentActionName: string;

  id: string; // refers to the id in the shellCommand

  name: string;

  type: CONFIG_ACTION_FIELD_TYPE_TYPES;

  values?: string[];

  constructor(
    configService: ConfigService,
    parentActionName: string,
    id: string,
    name: string,
    type: CONFIG_ACTION_FIELD_TYPE_TYPES,
    values: string[] = [],
  ) {
    this.configService = configService;
    this.parentActionName = parentActionName;
    this.id = id;
    this.name = name;
    this.type = type;
    this.values = values;
  }

  get path() {
    return `Action ${this.parentActionName}/Field ${this.id}`;
  }

  validate(): void {
    if (!this.id) {
      this.configService.addLog(
        new ConfigValidationLog(
          this.path,
          CONFIG_VALIDATION_LOG_PROPERTY_TYPES_ENUM.STRING,
          'id',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
          [],
        ),
      );
    }

    if (!this.name) {
      this.configService.addLog(
        new ConfigValidationLog(
          this.path,
          CONFIG_VALIDATION_LOG_PROPERTY_TYPES_ENUM.STRING,
          'name',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
          [],
        ),
      );
    }

    if (!this.type) {
      this.configService.addLog(
        new ConfigValidationLog(
          this.path,
          CONFIG_VALIDATION_LOG_PROPERTY_TYPES_ENUM.STRING,
          'type',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.MISSING_FIELD,
          [],
        ),
      );
    }

    if (
      this.type !== CONFIG_ACTION_FIELD_TYPES_ENUM.LIST &&
      this.type !== CONFIG_ACTION_FIELD_TYPES_ENUM.STRING
    ) {
      const enumValues = Object.values(CONFIG_ACTION_FIELD_TYPES_ENUM);
      const suggestedValues = Object.values(
        CONFIG_ACTION_FIELD_TYPES_ENUM,
      ).slice(0, enumValues.length / 2 + 1);

      this.configService.addLog(
        new ConfigValidationLog(
          this.path,
          CONFIG_VALIDATION_LOG_PROPERTY_TYPES_ENUM.STRING,
          'type',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.WRONG_VALUE,
          suggestedValues,
        ),
      );
    }

    if (
      this.type === CONFIG_ACTION_FIELD_TYPES_ENUM.LIST &&
      !this.values.length
    ) {
      this.configService.addLog(
        new ConfigValidationLog(
          this.path,
          CONFIG_VALIDATION_LOG_PROPERTY_TYPES_ENUM.STRING,
          'values',
          CONFIG_VALIDATION_LOG_MESSAGE_TYPES_ENUM.EMPTY_LIST,
          [],
        ),
      );
    }
  }
}
