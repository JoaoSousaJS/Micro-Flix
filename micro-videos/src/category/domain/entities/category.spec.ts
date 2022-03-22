import { omit } from 'lodash';
import { Category } from './category';

describe('Category Tets', () => {
  test('constructor of category', () => {
    const category = new Category({ name: 'Movie' });

    const props = omit(category.props, 'created_at');

    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
  });
});
