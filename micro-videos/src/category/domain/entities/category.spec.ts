import { omit } from 'lodash';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id';
import { Category } from './category';

describe('Category Tets', () => {
  test('constructor of category - Name', () => {
    const category = new Category({ name: 'Movie' });

    const props = omit(category.props, 'created_at');

    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);
  });

  test('should save description and is active equals to false', () => {
    const category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
    });

    const created_at = new Date();

    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
  });

  test('getter of name field', () => {
    const category = new Category({ name: 'Movie' });

    expect(category.name).toBe('Movie');
  });

  test('getter and setter of description field', () => {
    const category = new Category({ name: 'Movie', description: 'some description' });

    expect(category.description).toBe('some description');
  });

  test('if id field', () => {
    let category = new Category(
      {
        name: 'Movie',
      },
      new UniqueEntityId(),
    );

    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    category = new Category(
      {
        name: 'Movie',
      },
      null,
    );

    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);

    category = new Category(
      {
        name: 'Movie',
      },
      undefined,
    );

    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);
  });

  it('should update name and description', () => {
    let category = new Category({ name: 'Movie', description: 'description' });

    category.updateCategory({
      name: 'new movie',
      description: 'new description',
    });

    expect(category.name).toBe('new movie');
    expect(category.description).toBe('new description');

    category = new Category({ name: 'Movie' });

    category.updateCategory({
      name: 'new movie',
    });

    expect(category.name).toBe('new movie');
  });

  it('should fail if no name or description was submitted', () => {
    const category = new Category({ name: 'Movie', description: 'description' });

    expect(category.name).toBe('Movie');

    expect(() => {
      category.updateCategory({
        name: '',
        description: '',
      });
    }).toThrow('Must pass name or description');
  });

  it('must active a category', () => {
    const category = new Category({ name: 'Movie', is_active: false });

    category.activateCategory();

    expect(category.is_active).toBeTruthy();
  });

  it('must deactive a category', () => {
    const category = new Category({ name: 'Movie' });

    category.deactivateCategory();

    expect(category.is_active).toBeFalsy();
  });
});
