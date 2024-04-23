const { describe, test, expect } = require('@jest/globals');
const { exec } = require('child_process');

describe('dude CLI test', () => {
  test('it should respond with "Hey dude!"', (done) => {
    exec('node ./bin/dude.js', (error, stdout) => {
      if (error) {
        done(error);
      } else {
        expect(stdout.trim()).toBe('Hey dude!');
        done();
      }
    });
  });
});
