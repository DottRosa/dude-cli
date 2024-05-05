import ConfigValidationLog from './classes/config-validation-log';
import { CONFIG_VALIDATION_LOG_LEVEL_ENUM } from './enums';
import { CONFIG_VALIDATION_LOG_LEVEL_TYPES } from './types';

export default class ConfigService {
  logs: ConfigValidationLog[] = [];

  addLog(log: ConfigValidationLog) {
    this.logs.push(log);
  }

  private logByTypeExists(type: CONFIG_VALIDATION_LOG_LEVEL_TYPES): boolean {
    if (this.logs.length === 0) {
      return false;
    }

    for (let i = 0; i < this.logs.length; i += 1) {
      if (this.logs[i].level === type) {
        return true;
      }
    }

    return false;
  }

  private getMessagesByType(type: CONFIG_VALIDATION_LOG_LEVEL_TYPES): string[] {
    const messages = [];
    this.logs.forEach((log) => {
      if (log.level === type) {
        messages.push(log.message);
      }
    });

    return messages;
  }

  get errorLogsExist(): boolean {
    return this.logByTypeExists(CONFIG_VALIDATION_LOG_LEVEL_ENUM.ERROR);
  }

  get warningLogsExist(): boolean {
    return this.logByTypeExists(CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING);
  }

  get infoLogsExist(): boolean {
    return this.logByTypeExists(CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO);
  }

  get errorLogMessages(): string[] {
    return this.getMessagesByType(CONFIG_VALIDATION_LOG_LEVEL_ENUM.ERROR);
  }

  get warningLogMessages(): string[] {
    return this.getMessagesByType(CONFIG_VALIDATION_LOG_LEVEL_ENUM.WARNING);
  }

  get infoLogMessages(): string[] {
    return this.getMessagesByType(CONFIG_VALIDATION_LOG_LEVEL_ENUM.INFO);
  }
}
