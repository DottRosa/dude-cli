import fs from 'fs';
import path from 'path';
import { CONFIGURATION_FILE_NAME, HELP_MESSAGE, LOGO } from './constants';
import LogService from './logger';
import askService from './ask';

const currentDirectory = process.cwd();
const configFilePath = path.join(currentDirectory, CONFIGURATION_FILE_NAME);

function getConfigFile() {
  try {
    const configData = fs.readFileSync(configFilePath, 'utf8');
    return JSON.parse(configData);
  } catch (err) {
    return null;
  }
}

function createConfigFile() {
  const defaultConfig = {};
  const defaultConfigString = JSON.stringify(defaultConfig, null, 2);
  fs.writeFileSync(configFilePath, defaultConfigString);
}

function showHelp() {
  LogService.standard(LOGO);
  LogService.standard(HELP_MESSAGE);
}

async function runCLI() {
  const args = process.argv;
  if (args[2] === '-h' || args[2] === 'help') {
    showHelp();
    return;
  }

  const configFile = getConfigFile();
  if (!configFile) {
    const confirmation = await askService.confirmAction(
      `Hey dude! The configuration file ${CONFIGURATION_FILE_NAME} is missing. Do you want to create it?`,
    );
    if (confirmation) {
      createConfigFile();
    }
  }
}

export default runCLI;
