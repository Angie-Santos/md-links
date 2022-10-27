const { readFiles, getLink } = require('../lib/read-files');

describe('function Read files', () => {
  it('readFiles is a function', () => {
    expect(typeof readFiles).toBe('function');
  });
  it('read a file', () => expect(readFiles('test/docs/file1.md')).resolves.toEqual(
    [{
      file: 'test/docs/file1.md',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
    },
    {
      file: 'test/docs/file1.md',
      href: 'https://nodejs.org/',
      text: 'Node.js',
    }],
  ));
  it('Path is incorrect', () => expect(readFiles('test/docs/file1.m')).rejects.toBe("ENOENT: no such file or directory, open 'test/docs/file1.m'"));
});

describe('function get Link', () => {
  it('getLink is a function', () => {
    expect(typeof getLink).toBe('function');
  });
  it('file contains links', () => {
    const obj = [{
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'test/docs/file1.md',
    }];
    const file = '[Markdown](https://es.wikipedia.org/wiki/Markdown)';
    expect(getLink(file, 'test/docs/file1.md')).toEqual(obj);
  });
  it('file not contains links', () => {
    const obj = [{
      href: 'no links found',
      text: 'no links found',
      file: 'test/docs/file2.md',
    }];
    const file = '';
    expect(getLink(file, 'test/docs/file2.md')).toEqual(obj);
  });
});
