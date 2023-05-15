'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {isArray} = Array;
const {parse: jsonParse} = JSON;

/**
 * Given a `'string'` or a `"string"` returns a JSON compatible string.
 * @param {string} str a TOML entry to parse
 * @returns {string}
 */
const getValue = (str, foreign) => jsonParse(
  str.replace(/(\S+?)\s*=/g, '"$1":'),
  (_, value) => typeof value === 'string' ?
    foreign[value[0]][value.slice(1)] :
    value
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
 * Given a TOML text, removes stirngs and dates for easier parsing +
 * remove multi-line arrays to not need evaluation.
 * @param {string} toml the TOML text to map
 * @param {string[]} strings mapped strings
 * @param {Date[]} dates mapped Dates
 * @returns {[string, {s: string[], d: Date[]}]}
 */
const mapForeign = (toml, strings, dates) => [
  toml
    // map strings in the TOML
    .replace(
      /(["'])(?:(?=(\\?))\2.)*?\1/g,
      value => `"s${strings.push(value.slice(1, -1)) - 1}"`
    )
    // map dates in the TOML
    .replace(
      /\d{2,}([:-]\d{2}){2}([ T:-][\dZ:-]+)?/g,
      value => `"d${dates.push(new Date(value)) - 1}"`
    )
    // avoid multi-line array entries
    .replace(/,\s*[\r\n]+/g, ', ')
    .replace(/\[\s*[\r\n]+/g, '[')
    .replace(/[\r\n]+\s*]/g, ']'),
  {s: strings, d: dates}
];

/**
 * Given a simple subset of a TOML file, returns its JS equivalent.
 * @param {string} toml the TOML text to parse
 * @returns {object} the TOML equivalent as JSON serializable
 */
const parse = toml => {
  const [text, foreign] = mapForeign(toml, [], []);
  const json = {};
  let entry = json;
  for (let line of text.split(/[\r\n]+/)) {
    if ((line = line.trim()) && !line.startsWith('#')) {
      if (/^(\[+)(.*?)\]+/.test(line))
        entry = getPath(RegExp.$2.trim().split('.'), json, RegExp.$1 !== '[');
      else if (/^(\S+?)\s*=([^#]+)/.test(line))
        entry[RegExp.$1] = getValue(RegExp.$2.trim(), foreign);
    }
  }
  return json;
};
exports.parse = parse;
