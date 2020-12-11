import Model from '../database/Model';
import Product from './Product';

export default class ProductCategory extends Model<IProductCategory> {
    hasMany = [{ model: Product }];
}
