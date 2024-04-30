import inquirer from 'inquirer';

const askService = {
  // Ask user to confirm an action
  async confirmAction(message: string) {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message,
      },
    ]);
    return answer.confirmation;
  },

  // Ask user to select one option from the list
  async chooseOption(message: string, options: string[]) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'chosenOption',
        message,
        choices: options,
      },
    ]);
    return answer.chosenOption;
  },

  // Ask user to fill the input with a value
  async enterValue(message: string) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message,
      },
    ]);
    return answer.value;
  },
};

export default askService;
