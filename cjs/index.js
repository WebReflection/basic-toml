'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {isArray} = Array;

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
 * Crawl the `json` object via the given array of keys and handle array entries.
 * @param {string[]} keys a path with all keys to reach the entry
 * @param {object} entry the root entry of the TOML
 * @param {boolean} asArray handle array entries
 * @returns {object} the current entry to handle
 */
const getPath = (keys, entry, asArray) => {
  for (let i = 0, {length} = keys, last = length - 1; i < length; i++) {
    entry = entry[keys[i]] || (entry[keys[i]] = (asArray && (i === last) ? [] : {}));
    if (isArray(entry)) {
      if ((i === last) || !entry.length)
        entry.push({});
      entry = entry.at(-1);
    }
  }
  return entry;
};

/**
 * Given a simple subset of a TOML file, returns its JS equivalent.
 * @param {string} text the TOML text to parse
 * @returns {object} the TOML equivalent as JSON serializable
 */
const parse = text => {
  const json = {};
  let entry = json;
  for (let line of text.split(/[\r\n]+/)) {
    if ((line = line.trim()) && !line.startsWith('#')) {
      if (/^(\[+)(.*?)\]+/.test(line))
        entry = getPath(RegExp.$2.trim().split('.'), json, RegExp.$1 !== '[');
      else if (/^(\S+?)\s*=([^#]+)/.test(line))
        entry[RegExp.$1] = getValue(RegExp.$2.trim());
    }
  }
  return json;
};
exports.parse = parse;
