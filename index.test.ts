import { spawn } from 'bun';
import { test } from 'bun:test';

test('Spawn and kill two child processes', async () => {
  // const childProcess1 = spawn(['python3', '-m', 'http.server', '8000']);
  const childProcess1 = spawn(['yarn', 'run', 'dev']);
  console.log('childProcess1 started with PID', childProcess1.pid);
  childProcess1.kill();
  const childProcess1ExitCode = await childProcess1.exited;
  console.log('childProcess1 exited with exit code', childProcess1ExitCode);

  const childProcess2 = spawn(['yarn', 'run', 'dev']);
  console.log('childProcess2 started with PID', childProcess2.pid);
  childProcess2.kill();
  const childProcess2ExitCode = await childProcess2.exited;
  console.log('childProcess2 exited with exit code', childProcess2ExitCode);
});