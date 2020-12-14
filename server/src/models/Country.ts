import User from './User';
import Model from '../database/Model';

export default class Country extends Model<ICountry> {
    hasMany = [{ model: User }];
}
