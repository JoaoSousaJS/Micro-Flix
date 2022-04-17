import Entity from 'shared/entity/entity';
import NotFoundError from '../errors/not-found.error';
import { InMemoryRepository } from './in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
}

class StubEntity extends Entity<StubEntityProps> {

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe('InMemoryRepository Unit Test', () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });
  it('should insert a new entity', async () => {
    const entity = new StubEntity({
      name: 'name value', price: 5,
    });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should finds a entity by id', async () => {
    const entity = new StubEntity({
      name: 'name value', price: 5,
    });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);

    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should return all entities', async () => {
    const entity = new StubEntity({
      name: 'name value', price: 5,
    });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it('should throw error on update when entity not found', async () => {
    const entity = new StubEntity({
      name: 'name value', price: 5,
    });
    await repository.insert(entity);
    expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity Not found using ID ${entity.id}`));
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({
      name: 'name value', price: 5,
    });
    await repository.insert(entity);

    const updatedEntity = new StubEntity(
      {
        name: 'updated',
        price: 1,
      },
      entity.uniqueEntityId,
    );

    await repository.update(updatedEntity);
    expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({
      name: 'name value', price: 5,
    });
    await repository.insert(entity);

    await repository.deleteOne(entity.id);
    expect(repository.items).toHaveLength(0);
  });
});
