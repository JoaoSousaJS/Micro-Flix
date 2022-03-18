import { Category } from "./category";

describe('Category Tets', () => {
  test('constructor of category', () => {
    const category = new Category('test')
    expect(category.name).toBe('test')
  });
});