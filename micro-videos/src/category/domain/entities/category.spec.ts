import { omit } from 'lodash';
import { validate } from 'uuid';
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
    let category = new Category({
      name: 'Movie',
    });

    expect(category.id).not.toBeNull();
    expect(validate(category.id)).toBeTruthy();

    category = new Category(
      {
        name: 'Movie',
      },
      null,
    );

    expect(category.id).not.toBeNull();
    expect(validate(category.id)).toBeTruthy();

    category = new Category(
      {
        name: 'Movie',
      },
      undefined,
    );

    expect(category.id).not.toBeNull();
    expect(validate(category.id)).toBeTruthy();
  });
});
