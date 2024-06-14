# easy-tspaths

easy-tspaths is a lib made by Lucas Christian, this lib was made for make all your typescript aliases become relative paths

## Summary
- [Installation](#installation);
- [Using](#using);
- [Collaborate](#collaborate);
- [Errors in easy-tspaths](#errors-in-easy-tspaths);
- [Authors](#authors).


## Installation
Installation: `npm i --save-dev easy-tspaths`

## Using
In your `package.json` after the build add the line `easy-tspaths` or `easy-tspaths -c <path to your tsconfig.json>`
```
"build": "tsc && easy-tspaths"

"build": "tsc && easy-tspaths -c <path to your tsconfig.json>"

"build": "tsc && easy-tspaths --config <path to your tsconfig.json>"
```
You also can use with the npx: `npx easy-tspaths --help`

## Collaborate

Whenever you think of an even better way to resolve typescript aliases and want to apply it to this package, do so and submit it with a pull request, with tests already implemented on the new features.

## Errors in easy-tspaths

If you have identified an error, just open an issue, and if you have already
resolved this error, please make a pull request, so you collaborate with
the project!

## Authors

- [Lucas Christian](https://github.com/Lucas-Christian)
- [LordLuch (My secondary account)](https://www.github.com/LordLuch)