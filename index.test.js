import { test } from 'node:test';
import assert from 'node:assert/strict';
import isNodd from 'is-nodd';
import isNeven from './index.js';

test('exports a function', () => {
  assert.equal(typeof isNeven, 'function');
});

test('returns true when the value is divisible by the divisor', () => {
  assert.equal(isNeven(3, 3), true);
  assert.equal(isNeven(3, 999), true);
  assert.equal(isNeven(5, 25), true);
  assert.equal(isNeven(2, 8), true);
});

test('returns true for zero, which is divisible by any non-zero divisor', () => {
  assert.equal(isNeven(3, 0), true);
  assert.equal(isNeven(7, 0), true);
});

test('returns true for negative values divisible by the divisor', () => {
  assert.equal(isNeven(3, -3), true);
  assert.equal(isNeven(3, -9), true);
});

test('returns true for negative divisors that divide the value', () => {
  assert.equal(isNeven(-3, 9), true);
});

test('returns false when the value is not divisible by the divisor', () => {
  assert.equal(isNeven(3, 1), false);
  assert.equal(isNeven(3, 4), false);
  assert.equal(isNeven(5, 12), false);
  assert.equal(isNeven(2, 7), false);
});

test('returns false for negative values not divisible by the divisor', () => {
  assert.equal(isNeven(3, -1), false);
  assert.equal(isNeven(3, -4), false);
});

test('returns false for non-integers', () => {
  assert.equal(isNeven(3, 1.5), false);
  assert.equal(isNeven(3, 3.5), false);
});

test('throws a TypeError for NaN, Infinity and non-number values', () => {
  assert.throws(() => isNeven(3, NaN), TypeError);
  assert.throws(() => isNeven(3, Infinity), TypeError);
  assert.throws(() => isNeven(3, -Infinity), TypeError);
  assert.throws(() => isNeven(3, '6'), TypeError);
  assert.throws(() => isNeven(3, Number.MAX_SAFE_INTEGER + 1), TypeError);
});

test('throws a TypeError for a divisor of zero', () => {
  assert.throws(() => isNeven(0, 5), TypeError);
  assert.throws(() => isNeven(0, 0), TypeError);
});

test('is the exact inverse of is-nodd', () => {
  for (let divisor = -5; divisor <= 5; divisor += 1) {
    if (divisor === 0) continue;
    for (let value = -30; value <= 30; value += 1) {
      assert.equal(
        isNeven(divisor, value),
        !isNodd(divisor, value),
        `mismatch for divisor ${divisor}, value ${value}`,
      );
    }
  }
});

test('always returns a boolean', () => {
  assert.equal(typeof isNeven(3, 3), 'boolean');
  assert.equal(typeof isNeven(3, 4), 'boolean');
});
