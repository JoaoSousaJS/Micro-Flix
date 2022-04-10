import Entity from 'shared/entity/entity';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id';
import CategoryValidatorFactory from '../validators/category.validator';

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
    Category.validate(props);
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
    Category.validate({
      name, description,
    });
    if (description) {
      this.description = description;
    }

    this.name = name;
  }

  // static validate(props: Omit<CategoryProperties, 'created_at'>) {
  //   ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
  //   ValidatorRules.values(props.description, 'name').string();
  //   ValidatorRules.values(props.is_active, 'is_active').boolean();
  // }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
  }

  activateCategory = () => {
    this.props.is_active = true;
  }

  deactivateCategory = () => {
    this.props.is_active = false;
  }
}
