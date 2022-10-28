const { httpRequest } = require('../lib/http-request');

describe('function http request', () => {
  it('httpRquest is a function', () => {
    expect(typeof httpRequest).toBe('function');
  });
  it('Array contain good links', () => {
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

    const objOutput = [{
      file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      status: 200,
      ok: 'OK ✅',
    },
    {
      file: '/home/angie/Laboratoria/md-links/test/docs/file1.md',
      href: 'https://nodejs.org/',
      text: 'Node.js',
      status: 200,
      ok: 'OK ✅',
    }];
    return expect(httpRequest(obj)).resolves.toEqual(objOutput);
  });
  it('link doesn`t works', () => {
    const obj = [
      {
        href: 'http://community.laboratoria.la/c/js',
        text: 'foro de la comunidad',
        file: '/home/angie/Laboratoria/md-links/test/docs/mdHTTP.md',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: '/home/angie/Laboratoria/md-links/test/docs/mdHTTP.md',
      }];

    const objOutput = [{
      href: 'http://community.laboratoria.la/c/js',
      text: 'foro de la comunidad',
      file: '/home/angie/Laboratoria/md-links/test/docs/mdHTTP.md',
      status: 'Server error',
      ok: 'Fail ❌',
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: '/home/angie/Laboratoria/md-links/test/docs/mdHTTP.md',
      status: 404,
      ok: 'Fail ❌',
    }];
    return expect(httpRequest(obj)).resolves.toEqual(objOutput);
  });
});
