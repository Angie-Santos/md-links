const { verifyPath, normalizePath } = require('../src/verify-path');

describe('verifyPath', () => {
  it('Path exist and is a directory', () => {
    expect(verifyPath('test/docs')).toBe('directory');
    expect(verifyPath('/home/angie/Laboratoria/md-links/test/docs/dir-empty')).toBe('directory');
    expect(verifyPath('test/docs/file1.md')).toBe('file');
    expect(verifyPath('/home/angie/Laboratoria/md-links/test/docs/dir/empty')).toBe('file');
  });

  it('Path doesn`t exist', () => {
    expect(verifyPath('/home/angie/Laboratoria/md-links/test/docs/f')).toBeFalsy();
    expect(verifyPath('test/docs/file1')).toBeFalsy();
    expect(verifyPath('test/docs/file.')).toBeFalsy();
    expect(verifyPath('test/lola')).toBeFalsy();
    expect(verifyPath('')).toBeFalsy();
  });
});

describe('normalizePath', () => {
  it('Path exist and is a directory', () => {
    expect(normalizePath('test/docs')).toBe('/home/angie/Laboratoria/md-links/test/docs');
    expect(normalizePath('/home/angie/Laboratoria/md-links/test/docs/dir-empty')).toBe('/home/angie/Laboratoria/md-links/test/docs/dir-empty');
    expect(normalizePath('test/docs/file1.md')).toBe('/home/angie/Laboratoria/md-links/test/docs/file1.md');
    expect(normalizePath('/home/angie/Laboratoria/md-links/test/docs/dir/empty')).toBe('/home/angie/Laboratoria/md-links/test/docs/dir/empty');
  });
});
