import { parser } from '../lib/index.esm.js';

describe('Parser', () => {
  test('1', () => {
    expect(parser('1')).toEqual({ args: [1], opts: {} });
  });

  test('1 2', () => {
    expect(parser('1 2')).toEqual({ args: [1, 2], opts: {} });
  });

  test('1 Two 3', () => {
    expect(parser('1 Two 3')).toEqual({ args: [1, 'Two', 3], opts: {} });
  });

  test('89.13 0xA', () => {
    expect(parser('89.13 0xA')).toEqual({ args: [89.13, 0xa], opts: {} });
  });

  test('-a', () => {
    expect(parser('-a')).toEqual({ args: [], opts: { a: true } });
  });

  test('-A', () => {
    expect(parser('-A')).toEqual({ args: [], opts: { A: true } });
  });

  test('-ab', () => {
    expect(parser('-ab')).toEqual({ args: [], opts: { a: true, b: true } });
  });

  test('-abc', () => {
    expect(parser('-abc')).toEqual({
      args: [],
      opts: { a: true, b: true, c: true },
    });
  });

  test('-a -b', () => {
    expect(parser('-a -b')).toEqual({ args: [], opts: { a: true, b: true } });
  });

  test('-a -b -c', () => {
    expect(parser('-a -b -c')).toEqual({
      args: [],
      opts: { a: true, b: true, c: true },
    });
  });

  test('-n=5', () => {
    expect(parser('-n=5')).toEqual({ args: [], opts: { n: 5 } });
  });

  test('-n=23.09', () => {
    expect(parser('-n=23.09')).toEqual({ args: [], opts: { n: 23.09 } });
  });

  test('-n=-17', () => {
    expect(parser('-n=-17')).toEqual({ args: [], opts: { n: -17 } });
  });

  test('-x=0 -y=-25 -z=+180', () => {
    expect(parser('-x=0 -y=-25 -z=+180')).toEqual({
      args: [],
      opts: { x: 0, y: -25, z: 180 },
    });
  });

  test('-m=msg', () => {
    expect(parser('-m=msg')).toEqual({ args: [], opts: { m: 'msg' } });
  });

  test(`-m='commit msg'`, () => {
    expect(parser(`-m='commit msg'`)).toEqual({
      args: [],
      opts: { m: 'commit msg' },
    });
  });

  test(`-a -m='commit msg'`, () => {
    expect(parser(`-a -m='commit msg'`)).toEqual({
      args: [],
      opts: { a: true, m: 'commit msg' },
    });
  });

  test('--verbose', () => {
    expect(parser('--verbose')).toEqual({
      args: [],
      opts: { verbose: true },
    });
  });

  test('--dry-run', () => {
    expect(parser('--dry-run')).toEqual({
      args: [],
      opts: { dryRun: true },
    });
  });

  test('--dry-run --ignore-errors', () => {
    expect(parser('--dry-run --ignore-errors')).toEqual({
      args: [],
      opts: { dryRun: true, ignoreErrors: true },
    });
  });

  test('--file=a.txt', () => {
    expect(parser('--file=a.txt')).toEqual({
      args: [],
      opts: { file: 'a.txt' },
    });
  });

  test('--pathspec-from-file', () => {
    expect(parser('--pathspec-from-file')).toEqual({
      args: [],
      opts: { pathspecFromFile: true },
    });
  });

  test('--chmod=+x', () => {
    expect(parser('--chmod=+x')).toEqual({
      args: [],
      opts: { chmod: '+x' },
    });
  });

  test('--max-line-length=24', () => {
    expect(parser('--max-line-length=24')).toEqual({
      args: [],
      opts: { maxLineLength: 24 },
    });
  });

  test('commit -a -m="New commit msg"', () => {
    expect(parser('commit -a -m="New commit msg"')).toEqual({
      args: ['commit'],
      opts: { a: true, m: 'New commit msg' },
    });
  });

  test('rm -rf .', () => {
    expect(parser('rm -rf .')).toEqual({
      args: ['rm', '.'],
      opts: { r: true, f: true },
    });
  });

  test('--user.name="Thanga Ganapathy"', () => {
    expect(parser('--user.name="Thanga Ganapathy"')).toEqual({
      args: [],
      opts: { user: { name: 'Thanga Ganapathy' } },
    });
  });

  test('--no-g', () => {
    expect(parser('--no-g')).toEqual({
      args: [],
      opts: { g: false },
    });
  });

  test('--no-A', () => {
    expect(parser('--no-A')).toEqual({
      args: [],
      opts: { A: false },
    });
  });

  test('git --no-pager', () => {
    expect(parser('git --no-pager')).toEqual({
      args: ['git'],
      opts: { pager: false },
    });
  });

  test('git merge --no-commit', () => {
    expect(parser('git merge --no-commit')).toEqual({
      args: ['git', 'merge'],
      opts: { commit: false },
    });
  });

  test('-x=1 -x=2', () => {
    expect(parser('-x=1 -x=2')).toEqual({
      args: [],
      opts: { x: [1, 2] },
    });
  });

  test('-x=1,2', () => {
    expect(parser('-x=1,2')).toEqual({
      args: [],
      opts: { x: [1, 2] },
    });
  });

  test('-x=1,2 -x=3,4', () => {
    expect(parser('-x=1,2 -x=3,4')).toEqual({
      args: [],
      opts: { x: [1, 2, 3, 4] },
    });
  });

  test('ssh 192.168.56.101', () => {
    expect(parser('ssh 192.168.56.101')).toEqual({
      args: ['ssh', '192.168.56.101'],
      opts: {},
    });
  });

  test('ssh test.server.com -p=3322', () => {
    expect(parser('ssh test.server.com -p=3322')).toEqual({
      args: ['ssh', 'test.server.com'],
      opts: { p: 3322 },
    });
  });

  test('vim /etc/ssh/sshd_config', () => {
    expect(parser('vim /etc/ssh/sshd_config')).toEqual({
      args: ['vim', '/etc/ssh/sshd_config'],
      opts: {},
    });
  });
});
