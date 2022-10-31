const { stats } = require('../lib/stats');

describe('function stats', () => {
  it('stats is a function', () => {
    expect(typeof stats).toBe('function');
  });

  it('Only stats', () => {
    const obj = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
      }];
    return expect(stats(obj)).toStrictEqual({ total: 2, unique: 2 });
  });

  it('Stats and validate', () => {
    const obj = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
        status: 200,
        ok: 'OK ✅',
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
        status: 200,
        ok: 'Fail ❌',
      }];
    expect(stats(obj, true)).toStrictEqual({ total: 2, unique: 2, broken: 1 });
  });
});
