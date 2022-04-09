import ValidationError from '../errors/validation-error';
import { Category } from './category';

describe('Category integration test', () => {
  it('should validate invalid names', () => {
    expect(() => new Category({
      name: null,
    })).toThrow(new ValidationError('The name is required'));

    expect(() => new Category({
      name: '',
    })).toThrow(new ValidationError('The name is required'));

    expect(() => new Category({
      name: 't'.repeat(256),
    })).toThrow(new ValidationError('The name must be less or equal than 255'));
  });
});
