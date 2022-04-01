import deepFreeze from './object';

describe('object', () => {
  it('should not freeze a scalar value', () => {
    const str = deepFreeze('a');

    expect(typeof str).toBe('string');

    let boolean = deepFreeze(true);

    expect(typeof boolean).toBe('boolean');

    boolean = deepFreeze(false);

    expect(typeof boolean).toBe('boolean');
  });
  it('Must be an immutable object', () => {
    const obj = deepFreeze({
      prop1: 'value1',
      deep: {
        prop2: 'value2',
        prop3: new Date(),
      },
    });

    expect(() => {
      (obj as any).props = 'aaaaa';
    }).toThrow(
      'Cannot add property props, object is not extensible',
    );

    expect(typeof obj).toBe('object');
  });
});
