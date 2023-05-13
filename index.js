var basicToml = (function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */

  /**
   * Remove any `# comment` from any single line string.
   * @param {string} str the string with a possible comment
   * @returns {string}
   */
  const noComment = str => str.replace(/#.*/, '').trim();

  /**
   * Given a `'string'` or a `"string"` returns a JSON compatible string.
   * @param {string} str a TOML entry to parse
   * @returns {string}
   */
  const getValue = str => JSON.parse(
    str.replace(
      /(["'])(?:(?=(\\?))\2.)*?\1/g,
      ($0, _) => `"${$0.slice(1, -1)}"`
    )
  );

  /**
   * Given a simple subset of a TOML file, returns its JS equivalent.
   * @param {string} text the TOML text to parse
   * @returns {object} the TOML equivalent as JSON serializable
   */
  const parse = text => {
    const json = {};
    let entry = null;
    for (let line of text.split(/(?:\r\n|\n|\r)/)) {
      line = line.trim();
      if (!line) {
        entry = null;
        continue;
      }
      else if (line.startsWith('#'))
        continue;
      else if (line.startsWith('[[')) {
        const key = noComment(line).replace(/^\[\[(.+?)\]\]$/, '$1').trim();
        (json[key] || (json[key] = [])).push(entry = {});
      }
      else if (line.startsWith('['))
        json[noComment(line).replace(/^\[(.+?)\]$/, '$1').trim()] = (entry = {});
      else {
        const [_, property, value] = noComment(line).match(/^(\S+)\s*=(.+)$/);
        (entry || json)[property] = getValue(value.trim());
      }
    }
    return json;
  };

  exports.parse = parse;

  return exports;

})({});
