const { verifyPath } = require('../src/verify-path');

describe('verifyPath', () => {
  it('Path exist and is a directory', () => {
    expect(verifyPath('docs')).toBe('directory');
    expect(verifyPath('/home/angie/Laboratoria/md-links/docs/dir-empty')).toBe('directory');
    expect(verifyPath('docs/file1.md')).toBe('file');
    expect(verifyPath('/home/angie/Laboratoria/md-links/docs/dir/empty')).toBe('file');
  });

  it('Path doesn`t exist', () => {
    expect(verifyPath('/home/angie/Laboratoria/md-links/docs/f')).toBeFalsy();
    expect(verifyPath('docs/file1')).toBeFalsy();
    expect(verifyPath('docs/file.')).toBeFalsy();
    expect(verifyPath('lola')).toBeFalsy();
    expect(verifyPath('')).toBeFalsy();
  });
});
