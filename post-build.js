import fs from 'fs';
import path from 'path';

function addJsExtension(dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      addJsExtension(filePath);
    } else if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      /*
      The regex matches all the modules related to the codebase and not imported form the
      node_modules. This check avoids to add the .js extension to the wrong files.

      import logService from './logger';          OK
      import logService from './folder/logger';   OK
      import logService from '../folder/logger';  OK
      import fs from 'fs';                        NOT OK
      */
      content = content.replace(/from\s+['"](.\/|..\/)([^'"]+)/g, (match) => {
        if (!match.endsWith('.js')) {
          return `${match}.js`;
        }
        return match;
      });
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

addJsExtension('./dist');
