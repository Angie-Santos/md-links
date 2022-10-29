const { mdLinks } = require('../lib/index');

describe('mdLinks', () => {
  it('Is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Options validate is false', () => expect(mdLinks('test/docs/file1.md')).resolves.toStrictEqual([
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
    }]));
  it('Options validate is true', () => {
    const output = [
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
        ok: 'OK ✅',
      }];

    return mdLinks('test/docs/file1.md', { validate: true }).then((links) => {
      const set = new Set(links.map(JSON.stringify));
      const arrSinDuplicaciones = Array.from(set).map(JSON.parse);
      expect(arrSinDuplicaciones).toStrictEqual(output);
    });
  });
});
