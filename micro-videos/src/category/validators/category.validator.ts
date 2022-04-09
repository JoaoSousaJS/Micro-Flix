import { CategoryProperties } from 'category/domain/entities/category';
import {
  IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength,
} from 'class-validator';
import ClassValidatorFields from 'shared/domain/validators/class-validator-fields';

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_active: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({
    name, created_at, description, is_active,
  }: CategoryProperties) {
    Object.assign(this, {
      name, created_at, description, is_active,
    });
  }
}

export class CategoryValidator
  extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? {} as any));
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
