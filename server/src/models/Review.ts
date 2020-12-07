import Model from '../database/Model';
import Product from './Product';

export default class Review extends Model<IReview> {
    product(): Promise<IProductModel> {
        return this.belongsTo(Product);
    }
}
