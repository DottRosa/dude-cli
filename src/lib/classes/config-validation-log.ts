import { CONFIG_VALIDATION_LOG_LEVEL_ENUM } from '../enums';
import {
  CONFIG_VALIDATION_LOG_PROPERTY_TYPE_TYPES,
  CONFIG_VALIDATION_LOG_LEVEL_TYPES,
  CONFIG_VALIDATION_LOG_MESSAGE_TYPE_TYPES,
} from '../types';

export default class ConfigValidationLog {
  path: string; // the id of the ConfigField or the ConfigAction

  propertyType: CONFIG_VALIDATION_LOG_PROPERTY_TYPE_TYPES; // the type of the property involved

  propertyInvolvedName: string; // the name of the field involved in the log

  level: CONFIG_VALIDATION_LOG_LEVEL_TYPES; // the level of the log

  messageType: CONFIG_VALIDATION_LOG_MESSAGE_TYPE_TYPES; // the message type to use as a template

  suggestedValues: string[]; // the values to suggest if the field has a value but is wrong

  messages = {
    generic_error: 'There is an error in your configuration',
    missing_field: 'The field "{field}" is missing',
    wrong_value:
      'The field "{field}" contains a wrong value. The accepted values are: {suggestedValues}',
    empty_list: 'The list "{field}" is empty',
  };

  constructor(
    path: string,
    propertyType: CONFIG_VALIDATION_LOG_PROPERTY_TYPE_TYPES,
    propertyInvolvedName: string,
    messageType: CONFIG_VALIDATION_LOG_MESSAGE_TYPE_TYPES,
    suggestedValues: string[] = [],
    level: CONFIG_VALIDATION_LOG_LEVEL_TYPES = CONFIG_VALIDATION_LOG_LEVEL_ENUM.ERROR,
  ) {
    this.propertyType = propertyType;
    this.propertyInvolvedName = propertyInvolvedName;
    this.messageType = messageType;
    this.suggestedValues = suggestedValues;
    this.path = path;
    this.level = level;
  }

  get message(): string {
    const message = this.messages[this.messageType];
    if (!message) {
      return this.messages.generic_error;
    }
    return `[${this.path}] ${message
      .replace('{field}', this.propertyInvolvedName)
      .replace('{id}', this.path)
      .replace('{suggestedValues}', `"${this.suggestedValues.join('", "')}"`)}`;
  }
}
