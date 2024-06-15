import { sleep, spawn } from 'bun';

const childProcess1 = spawn(['yarn', 'run', 'dev'], {
  stderr: 'pipe',
});
console.log(Date.now(), 'childProcess1 started with PID', childProcess1.pid);

const stdoutPromise = new Response(childProcess1.stdout).text();

console.log(Date.now(), 'Sleeping for 2 seconds...');
await sleep(1000);

childProcess1.kill();
const childProcess1ExitCode = await childProcess1.exited;
console.log(
  Date.now(),
  'childProcess1 exited with exit code',
  childProcess1ExitCode,
);

// 💥 Hangs on GitHub Actions, instant on local machine
console.log(
  Date.now(),
  'Waiting for stdoutPromise to resolve (hangs on CI)...',
);
await stdoutPromise;

// Use case: smoke testing a dev server and comparing it against snapshot
// expect(await stdOutPromise).toMatchSnapshot();

const childProcess2 = spawn(['yarn', 'run', 'dev'], {
  stderr: 'pipe',
});
console.log(Date.now(), 'childProcess2 started with PID', childProcess2.pid);
childProcess2.kill();
const childProcess2ExitCode = await childProcess2.exited;
console.log(
  Date.now(),
  'childProcess2 exited with exit code',
  childProcess2ExitCode,
);
