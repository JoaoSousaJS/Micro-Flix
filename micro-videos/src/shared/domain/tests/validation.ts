import { objectContaining } from 'expect';
import { EntityValidationError } from '../errors/validation-error';
import ClassValidatorFields from '../validators/class-validator-fields';
import { FieldsErrors } from '../validators/validator-fields-interface';

type Expected = {
  validator: ClassValidatorFields<any>,
  data: any
} | (() => any)

function isValid() {
  return { pass: true, message: () => '' };
}

function assertContainsErrorMessages(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? { pass: true, message: () => '' }
    : {
      pass: false,
      message: () => `The validation error not contains ${JSON.stringify(
        received,
      )}. Current: ${JSON.stringify(expected)}`,
    };
}

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;

        return assertContainsErrorMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorMessages(validator.errors, received);
    }
  },
});
