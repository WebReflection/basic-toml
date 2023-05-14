# basic-toml

[![build](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/basic-toml/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/basic-toml?branch=main)

A simple TOML parser with tons of limitations yet good enough for various projects.

## TOML Subset

This module parses (so far) only these kind of entries:

```toml
# any single line comment
packages = ['a', 'b'] # or end comment

# any propety as object (or nested objects)
[field]
simple = true
version = 0 # any JSON compatible value ... and ...
# ... dates are returned as Date instance
when = 1979-05-27T07:32:00-08:00

# array of JSON compatible entries
[[externals]]
src = 'https://cdn.spot.on'
name = 'spot-on'

[[externals.object]]
ok = true

[[preload]]
files = [
  './3rd-party.js',
  './other.js'
]
```
