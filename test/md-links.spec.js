const { mdLinks } = require('../lib/index');
const { mdFiles } = require('../lib/directory-management');

describe('mdLinks', () => {
  afterEach(() => {
    while (mdFiles.length > 0) {
      mdFiles.pop();
    }
  });
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
    return expect(mdLinks('test/docs/file1.md', { validate: true })).resolves.toStrictEqual(output);
  });
  it('If options and options validate is false', () => {
    const output = [
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
    return expect(mdLinks('test/docs/file1.md', { validate: false })).resolves.toStrictEqual(output);
  });

  it('Option is not valid', () => expect(mdLinks('test/docs/file1.md', 'true')).rejects.toThrow(new Error('Option argument is not valid')));

  it('No path', () => expect(mdLinks()).rejects.toThrow(new Error('you did not enter path')));

  it('Path does not exist or is broken', () => expect(mdLinks('tests')).rejects.toThrow(new Error(('path does not exist or is broken'))));

  it('File is not md', () => expect(mdLinks('test/docs/file1.txt')).rejects.toThrow(new Error(('File isn`t md'))));

  it('Folder does not contain files', () => expect(mdLinks('test/docs/dir-empty')).rejects.toThrow(new Error(('Folder does not contain md files'))));

  it('Folder does not contain md files', () => expect(mdLinks('test/docs/dir-not-md')).rejects.toThrow(new Error(('Folder does not contain md files'))));
});
