import Entity from 'shared/entity/entity';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id';
import InvalidParamError from '../errors/invalid-param.error';

export type CategoryProperties = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
}

type CategoryUpdateProps = {
  name: string;
  description?: string
}

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  private set name(value:string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  updateCategory = ({ name, description }: CategoryUpdateProps) => {
    if (!name) {
      throw new InvalidParamError();
    }

    if (description) {
      this.description = description;
    }

    this.name = name;
  }

  activateCategory = () => {
    this.props.is_active = true;
  }

  deactivateCategory = () => {
    this.props.is_active = false;
  }
}
