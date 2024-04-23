import { describe, test, expect } from '@jest/globals';
import { exec } from 'child_process';

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
