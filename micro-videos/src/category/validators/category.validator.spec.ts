import CategoryValidatorFactory, { CategoryValidator } from './category.validator';

describe('CategoryValidator tests', () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });
  test('Invalidation cases for name field', () => {
    let isValid = validator.validate(null);

    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = validator.validate({ name: '' });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name should not be empty',
    ]);

    isValid = validator.validate({ name: 5 as any });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = validator.validate({ name: 't'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(validator.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ]);
  });
});
