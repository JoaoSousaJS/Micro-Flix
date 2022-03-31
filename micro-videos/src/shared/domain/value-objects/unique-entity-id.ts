import { v4, validate } from 'uuid';
import InvalidUuidError from '../../../category/domain/errors/invalid-uuid.error';
import ValueObject from './value-object';

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || v4());
    this.validate();
  }

  private validate() {
    const isValid = validate(this.value);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
