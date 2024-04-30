/* eslint-disable no-console */
import chalk from 'chalk';

const logService = {
  success(message: string) {
    console.log(chalk.green(message));
  },

  error(message: string) {
    console.log(chalk.red(message));
  },

  info(message: string) {
    console.log(chalk.blue(message));
  },

  standard(message: string) {
    console.log(message);
  },
};

export default logService;
