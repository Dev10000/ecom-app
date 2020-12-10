import Model from '../database/Model';
import Review from './Review';

export default class Product extends Model<IProduct> {
    price = 0;

    discount = 0;

    table = 'products_view';

    async reviews(): Promise<IReview[]> {
        return this.hasMany(Review);
    }
}
