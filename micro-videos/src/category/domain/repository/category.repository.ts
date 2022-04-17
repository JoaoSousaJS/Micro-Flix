import { SearchableRepositoryInterface } from 'shared/domain/repository/repository-contract';
import { Category } from '../entities/category';

export default interface CategoryRepository
extends SearchableRepositoryInterface<Category, any, any> {

}
