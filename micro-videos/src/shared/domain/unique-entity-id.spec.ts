import { v4, validate } from 'uuid';
import InvalidUuidError from '../../category/domain/errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id';

describe('UniqueEntityId Unit Tests                                                                                              ', () => {
  it('should ', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    const uuid = v4();
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept an empty id passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    const vo = new UniqueEntityId();
    expect(validate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
