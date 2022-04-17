import Entity from 'shared/entity/entity';
import NotFoundError from '../errors/not-found.error';
import uniqueEntityId from '../value-objects/unique-entity-id';
import { RepositoryInterface, SearchableRepositoryInterface } from './repository-contract';

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | uniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);

    const index = this.items.findIndex((i) => i.id === entity.id);
    this.items[index] = entity;
  }

  async deleteOne(id: string | uniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);

    const index = this.items.findIndex((i) => i.id === _id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const result = this.items.find((i) => i.id === id);

    if (!result) {
      throw new NotFoundError(`Entity not found using ${id}`);
    }
    return result;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity> extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any> {
  search(props: any): Promise<any> {
    throw new Error('not ready');
  }
}