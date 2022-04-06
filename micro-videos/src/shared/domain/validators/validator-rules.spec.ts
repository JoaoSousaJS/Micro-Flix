import ValidatorRules from './validator-rules';

type AssertProps = {
  value: any;
  property: string;
  rule: keyof ValidatorRules
  error: string
  params?: any[]
}

function assertIsInvalid({
  value, property, rule, error, params = [],
}: AssertProps) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
  }).toThrow(error);
}

function assertIsvalid({
  value, property, rule, error, params = [],
}: AssertProps) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
  }).not.toThrow(error);
}

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
      assertIsInvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'required',
      });
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
      assertIsvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'required',
      });
    });
  });

  test('string validation rule', () => {
    // invalid cases
    let arrange: {
      value: any;
      property: string;
      message: string;
    }[] = [
      {
        value: 5, property: 'field', message: 'The field must be a string',
      },
      {
        value: {}, property: 'field', message: 'The field must be a string',
      },
      {
        value: false, property: 'field', message: 'The field must be a string',
      },
    ];
    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'string',
      });
    });

    // valid cases
    arrange = [
      {
        value: 'test', property: 'field', message: 'The field must be a string',
      },
      {
        value: null, property: 'field', message: 'The field must be a string',
      },
      {
        value: undefined, property: 'field', message: 'The field must be a string',
      },
    ];
    arrange.forEach((i) => {
      assertIsvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'string',
      });
    });
  });

  test('maxlength validation rule', () => {
    // invalid cases
    let arrange: {
      value: any;
      property: string;
      message: string;
    }[] = [
      {
        value: 'aaaaa', property: 'field', message: 'The field must be less or equal than 4',
      },
    ];
    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'maxLength',
        params: [4],
      });
    });

    // valid cases
    arrange = [
      {
        value: 'aaaaa', property: 'field', message: 'The field must be less or equal than 5',
      },
      {
        value: null, property: 'field', message: 'The field must be less or equal than 5',
      },
      {
        value: undefined, property: 'field', message: 'The field must be less or equal than 5',
      },
    ];
    arrange.forEach((i) => {
      assertIsvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'maxLength',
        params: [5],
      });
    });
  });

  test('boolean validation rule', () => {
    // invalid cases
    let arrange: {
      value: any;
      property: string;
      message: string;
    }[] = [
      {
        value: 'aaaaa', property: 'field', message: 'The field must be a boolean',
      },
      {
        value: 5, property: 'field', message: 'The field must be a boolean',
      },
      {
        value: 'true', property: 'field', message: 'The field must be a boolean',
      },
    ];
    arrange.forEach((i) => {
      assertIsInvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'boolean',
      });
    });

    // valid cases
    arrange = [
      {
        value: true, property: 'field', message: 'The field must be a boolean',
      },
      {
        value: false, property: 'field', message: 'The field must be a boolean',
      },

    ];
    arrange.forEach((i) => {
      assertIsvalid({
        value: i.value,
        property: i.property,
        error: i.message,
        rule: 'boolean',
      });
    });
  });

  test('should combine two or more validation rules', () => {
    let validator = ValidatorRules.values(null, 'field');
    expect(() => {
      validator.required().maxLength(5).string();
    }).toThrow('The field is required');

    validator = ValidatorRules.values(5, 'field');
    expect(() => {
      validator.required().maxLength(5).string();
    }).toThrow('The field must be a string');

    validator = ValidatorRules.values('long string', 'field');
    expect(() => {
      validator.required().maxLength(5).string();
    }).toThrow('The field must be less or equal than 5');

    validator = ValidatorRules.values(null, 'field');
    expect(() => {
      validator.required().boolean();
    }).toThrow('The field is required');

    validator = ValidatorRules.values('true', 'field');
    expect(() => {
      validator.required().boolean();
    }).toThrow('The field must be a boolean');
  });

  it('should validate when combine two or more validation rules', () => {
    expect.assertions(0);
    ValidatorRules.values('test', 'field').required().string();
    ValidatorRules.values('test', 'field').required().string().maxLength(5);

    ValidatorRules.values(true, 'field').required().boolean();
    ValidatorRules.values(false, 'field').required().boolean();
  });
});
