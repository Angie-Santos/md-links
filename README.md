<h1 align='center' style=color:darkblue>🔗Markdown Links🔗</h1>

<div align='center'>

![banner](img/banner.png)

</div>

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Instalación](#2-instalación)
* [3. Detalles técnicos](#3-detalles-técnicos)
* [4. Guía de uso](#4-guía-de-uso)

***

## 1. Preámbulo

**MD-LINKS** es una herramienta que nos permite buscar, dada una ruta, los archivos `.md` y extraer los links que contenga cada uno de ellos. Si se desea, se verifica el estado de los links y se dan algunas estadísticas de los datos encontrados.  

Esto es muy útil dado que los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

## 2. Instalación
```
  npm i -g angie-santos-md-links
```
## 3. Detalles técnicos

**MD-LINKS** esta compuesto en dos partes: La librería y el script ejecutable (herramienta de línea de comando - CLI).

- Esta construido en JavaScript para ser ejecutado con Node.js 
- Recibe tanto rutas relativas como absolutas.
- Tiene soporte para archivos y carpetas.
- A parte de traer los links nos da opciones estadisticas como: 
  -  Total de links de los archivos o directorios analizados.
  - Links no repetidos.
  - Links funcionales (cuya petición http fue exitosa).

Si desea saber más sobre la lógica implementada, observa el [diagrama de flujo](https://miro.com/app/board/uXjVPPgBYpc=/?share_link_id=982462006443)  

## 4. Guía de uso

### 1) JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y se ejecuta de la siguiente manera:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
* `options`: Un objeto con **únicamente** las siguientes propiedades:
  - `validate`: Booleano que determina si se desea validar los links encontrados.

##### Valor de retorno

La función **retorna una promesa** que se **resuelve a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("angie-santos-md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir", { validate: false })
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

A través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate o --v`

Si pasamos la opción `--validate o --v`, se hace una petición HTTP para averiguar si el link funciona o no.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha URL.

##### `--stats o --s`

Si pasamos la opción `--stats o --s` el output (salida) será un texto con estadísticas básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate`  o `--s` y `--v`para obtener estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

***
