/* eslint-disable no-console */
import chalk from 'chalk';

export default class LogService {
  static success(message: string): void {
    console.log(chalk.green(message));
  }

  static error(message: string): void {
    console.log(chalk.red(message));
  }

  static info(message: string): void {
    console.log(chalk.blue(message));
  }

  static standard(message: string): void {
    console.log(message);
  }
}
