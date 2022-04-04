import ValidationError from 'category/domain/errors/validation-error';
import ValidatorRules from './validator-rules';

describe('ValidatorRules test', () => {
  test('Values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('required validation rule', () => {
    // invalid cases
    let arrange: {
      value: any;
      property: string;
      message: string;
    }[] = [
      {
        value: null, property: 'field', message: 'The field is required',
      },
      {
        value: undefined, property: 'field', message: 'The field is required',
      },
      {
        value: '', property: 'field', message: 'The field is required',
      },
    ];
    arrange.forEach((i) => {
      expect(() => {
        ValidatorRules.values(i.value, i.property).required();
      }).toThrow(
        new ValidationError(i.message),
      );
    });

    // valid cases
    arrange = [
      {
        value: 'test', property: 'field', message: 'The field is required',
      },
      {
        value: 5, property: 'field', message: 'The field is required',
      },
      {
        value: 0, property: 'field', message: 'The field is required',
      },
      {
        value: false, property: 'field', message: 'The field is required',
      },
    ];
    arrange.forEach((i) => {
      expect(() => {
        ValidatorRules.values(i.value, i.property).required();
      }).not.toThrow(
        new ValidationError(i.message),
      );
    });
  });
});
