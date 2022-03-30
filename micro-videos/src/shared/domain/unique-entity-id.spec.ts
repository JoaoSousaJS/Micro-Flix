import { v4, validate } from 'uuid';
import InvalidUuidError from '../../category/domain/errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id';

function spyValidationMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe('UniqueEntityId Unit Tests                                                                                              ', () => {
  it('should ', () => {
    const validateSpy = spyValidationMethod();
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = spyValidationMethod();

    const uuid = v4();
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept an empty id passed in constructor', () => {
    const validateSpy = spyValidationMethod();

    const vo = new UniqueEntityId();
    expect(validate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
