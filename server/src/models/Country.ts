import Model from '../database/Model';
import User from './User';

export default class Country extends Model<ICountry> {
    async users(): Promise<IUser[]> {
        return this.hasMany(User);
    }
}
