import { v4, validate } from 'uuid';
import InvalidUuidError from '../../category/domain/errors/invalid-uuid.error';

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || v4();
    this.validate();
  }

  private validate() {
    const isValid = validate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}