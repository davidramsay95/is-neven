# is-neven

Returns `true` if the input number is "n-even": divisible by the given divisor.

The inverse of [`is-nodd`](https://github.com/davidramsay95/is-nodd), which this package depends on. The generalised form of [`is-threeven`](https://github.com/davidramsay95/is-threeven).

## Install

```sh
npm install is-neven
```

## Usage

This package is ESM only.

```js
import isNeven from 'is-neven';

isNeven(3, 6); // true
isNeven(5, 25); // true
isNeven(3, 0); // true
isNeven(3, 4); // false
isNeven(5, 12); // false
```

## Behavior

`isNeven(divisor, value)` returns `!isNodd(divisor, value)`, which is `value % divisor === 0`. Zero is divisible by any non-zero divisor, so `isNeven(3, 0)` returns `true`.

Because the check is delegated to `is-nodd`, input validation is inherited. A `TypeError` is thrown if:

- `value` is not a primitive number, is `NaN`, `Infinity` or `-Infinity`, or is outside the safe integer range.
- `divisor` fails the same checks, or is `0`.

Otherwise the result follows JavaScript `%` semantics:

- Non-integer values such as `1.5` return `false`.
- Negative values and negative divisors work as expected: `isNeven(3, -9)` and `isNeven(-3, 9)` both return `true`.

## Development

Tests use the built-in Node.js test runner.

`is-nodd` must be resolvable from `node_modules`, and it in turn needs `is-safe-number`. Once both are published, `npm install` is enough. Until then, link the local sibling checkouts without modifying `package.json`:

```sh
(cd ../is-nodd && npm install --no-save --no-package-lock ../is-safe-number)
npm install --no-save --no-package-lock ../is-nodd
npm test
```

## Publishing

Publish `is-safe-number` and `is-nodd` first, in that order. `is-neven` declares it as a dependency (`^1.0.0`), so installing `is-neven` fails until `is-nodd` exists on the registry.

Only `index.js`, `package.json`, `README.md` and `LICENSE` are included in the package tarball. Verify with:

```sh
npm pack --dry-run
```

## License

[MIT](LICENSE)
