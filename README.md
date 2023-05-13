# basic-toml

[![build](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/basic-toml/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/basic-toml/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/basic-toml?branch=main)

A simple TOML parser with tons of limitations yet good enough for various projects.

## TOML Subset

This module parses (so far) only these kind of entries:

```toml
# any single line comment
[field] # any global entry
simple = true # any JSON compatible value
version = 0

# array of JSON compatible entries
[[externals]]
src = 'https://cdn.spot.on'
name = 'spot-on'

[[preload]]
files = ['./3rd-party.js']

# direct global field
packages = ['a', 'b'] # comment
```
