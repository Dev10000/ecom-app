import User from './User';
import Model from '../database/Model';

export default class Country extends Model<ICountry> {
    async users(): Promise<IUser[]> {
        return this.hasMany(User);
    }
}
