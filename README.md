# basic-toml

[![build](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/basic-toml/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/basic-toml?branch=main)

A simple TOML subset parser. ~500 bytes minified with brotli.

## TOML Subset

  * [key / value pairs](https://toml.io/en/v1.0.0#keyvalue-pair)
    * quoted or non-quoted, optionally dotted (within tables and arrays of tables), keys such as `key` or `key.sub` or `"my-key.same"`
    * **no** spaces around dots in keys
  * [strings](https://toml.io/en/v1.0.0#string)
    * prefer double quotes but it works with single quotes too
    * **no** multiline
  * [integers](https://toml.io/en/v1.0.0#integer) and [floats](https://toml.io/en/v1.0.0#float)
    * must be compatible with JSON
  * [boleans](https://toml.io/en/v1.0.0#boolean)
  * all JSON compatible [dates](https://toml.io/en/v1.0.0#offset-date-time)
  * [arrays](https://toml.io/en/v1.0.0#array)
    * also multiline arrays
  * [tables](https://toml.io/en/v1.0.0#table)
  * [inline tables](https://toml.io/en/v1.0.0#inline-table)
  * [arrays of tables](https://toml.io/en/v1.0.0#array-of-tables)

```toml
# any single line comment
packages = ['a', 'b'] # or end comment

# any propety as object (or nested objects)
[field]
simple = true
version = 0 # any JSON compatible value ... and ...
# ... dates are returned as Date instance
when = 1979-05-27T07:32:00-08:00

# quoted keys
"inline" = { OK = true, key = "value" }

# array of JSON compatible entries
[[externals]]
src = 'https://cdn.spot.on'
name = 'spot-on'

[[externals."special.case"]]
ok = true

[[preload]]
files = [
  './3rd-party.js',
  './other.js'
]
```
