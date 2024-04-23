import fs from 'fs';
import path from 'path';
import { CONFIGURATION_FILE_NAME } from './constants.js';
import logService from './logger.js';
import askService from './ask.js';

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

async function runCLI() {
  logService.success('Hey dude!');

  const configFile = getConfigFile();
  if (!configFile) {
    const confirmation = await askService.confirmAction(
      `The configuration file ${CONFIGURATION_FILE_NAME} is missing. Do you want to create it?`,
    );
    if (confirmation) {
      createConfigFile();
    }
  }
}

export default runCLI;
