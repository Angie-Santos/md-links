const {
  mdLinks,
} = require('../lib/index');

describe('mdLinks', () => {
  it('Is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
//   it('Options validate is true', () => {
//     expect(mdLinks('test/docs/file1.md', { validate: true })).toEqual([
//       {
//         href: 'https://es.wikipedia.org/wiki/Markdown',
//         text: 'Markdown',
//         file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
//       },
//       {
//         href: 'https://nodejs.org/',
//         text: 'Node.js',
//         file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
//       }]);
});
// });
