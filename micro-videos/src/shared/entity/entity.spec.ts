import UniqueEntityId from 'shared/domain/value-objects/unique-entity-id';
import { validate } from 'uuid';
import Entity from './entity';

class StubEntity extends Entity<{prop1: string; prop2: number}> {}

describe('Entity', () => {
  it('should set props and id', () => {
    const arrange = {
      prop1: 'prop 1 value',
      prop2: 20,
    };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(validate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const arrange = {
      prop1: 'prop 1 value',
      prop2: 20,
    };

    const uniqueId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueId);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueId.value);
  });

  it('should convert a entity to an Object', () => {
    const arrange = {
      prop1: 'prop 1 value',
      prop2: 20,
    };

    const uniqueId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueId);
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
