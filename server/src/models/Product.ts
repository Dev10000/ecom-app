import Model from '../database/Model';

export default class Product extends Model<IProduct> {
    price = 0;

    discount = 0;

    table = 'products_view';
}
