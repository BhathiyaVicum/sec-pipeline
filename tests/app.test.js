const { hashPassword, isAdmin } = require('../src/auth');
const { processData, calculateDiscount, validateEmail } = require('../src/utils');

describe('auth', () => {
  test('hashPassword returns consistent hash', () => {
    expect(hashPassword('test')).toBe(hashPassword('test'));
  });

  test('isAdmin returns false for non-admin', () => {
    expect(isAdmin({ role: 'user' })).toBe(false);
  });

  test('isAdmin returns true for admin', () => {
    expect(isAdmin({ role: 'admin' })).toBe(true);
  });
});

describe('utils', () => {
  test('processData handles null', () => {
    expect(processData(null)).toEqual([]);
  });

  test('calculateDiscount applies 17%', () => {
    expect(calculateDiscount(100)).toBe(17);
  });

  test('validateEmail accepts valid email', () => {
    expect(validateEmail('a@b.com')).toBe(true);
  });

  test('validateEmail rejects invalid email', () => {
    expect(validateEmail('not-an-email')).toBe(false);
  });
});