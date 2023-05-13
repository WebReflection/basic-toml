const {parse} = require('../cjs');

if (!Object.is(
  JSON.stringify(
    parse(`
      [splashscreen] # comment
      autoclose = true # comment

      # comment
      [[interpreters]] # comment
      src = 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js'
      name = 'pyodide-0.21.2' # comment
      lang = 'python' # comment

      [[fetch]] # comment
      files = ['./utils.py'] # comment

      # comment
      packages = ['a', 'b'] # comment
    `)
  ),
  JSON.stringify({
    splashscreen: { autoclose: true },
    interpreters: [
      {
        src: 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js',
        name: 'pyodide-0.21.2',
        lang: 'python'
      }
    ],
    fetch: [ { files: ['./utils.py'] } ],
    packages: [ 'a', 'b' ]
  })
)) throw new Error('shenanigans');
