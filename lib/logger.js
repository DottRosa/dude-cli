/* eslint-disable no-console */
import chalk from 'chalk';

const logService = {
  success(message) {
    console.log(chalk.green(message));
  },

  error(message) {
    console.log(chalk.red(message));
  },

  info(message) {
    console.log(chalk.blue(message));
  },

  standard(message) {
    console.log(message);
  },
};

export default logService;
