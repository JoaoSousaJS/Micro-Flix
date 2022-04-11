import { Category } from './category';

describe('Category integration test', () => {
  it('should validate invalid names', () => {
    expect(() => new Category({
      name: null,
    })).containsErrorMessages({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
    });

    expect(() => new Category({
      name: '',
    })).containsErrorMessages({
      name: [
        'name should not be empty',
      ],
    });

    expect(() => new Category({
      name: 't'.repeat(256),
    })).containsErrorMessages({
      name: [
        'name must be shorter than or equal to 255 characters',
      ],
    });
  });
});
