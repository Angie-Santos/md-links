const { verifyPath } = require('../lib/verify-path');

describe('function Verify Path', () => {
  it('Verify is a function', () => {
    expect(typeof verifyPath).toBe('function');
  });
  it('Path is ok and is a directory', () => {
    expect(verifyPath('test')).toEqual([
      '/home/angie/Laboratoria/md-links/test/docs/dir/dir2/file3.md',
      '/home/angie/Laboratoria/md-links/test/docs/file1.md',
      '/home/angie/Laboratoria/md-links/test/docs/file2.md',
      '/home/angie/Laboratoria/md-links/test/docs/mdHTTP.md',
    ]);
  });
  it('Path is ok and is a File', () => {
    expect(verifyPath('test/docs/file1.txt')).toBe('File isn`t md');
  });
  it('Path is bad', () => {
    expect(verifyPath('tests')).toBeFalsy();
  });
});
