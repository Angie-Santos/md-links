const { directoryManagement, isMd } = require('../lib/directory-management');

describe('function directoryManagment', () => {
  it('directoryManagment is a function', () => {
    expect(typeof directoryManagement).toBe('function');
  });
  it('Directory contain more documents', () => {
    expect(directoryManagement('test')).toEqual([
      'test/docs/dir/dir2/file3.md',
      'test/docs/file1.md',
      'test/docs/file2.md',
      'test/docs/mdHTTP.md',
    ]);
  });
});

describe('function isMD', () => {
  it('isMD is a function', () => {
    expect(typeof isMd).toBe('function');
  });
  it('File is not md', () => {
    expect(isMd('test/docs/file1.txt')).toBe('File isn`t md');
  });
});
