import { compare } from 'bcrypt';
import Model from '../database/Model';
import Country from './Country';
import Order from './Order';

export default class User extends Model<IUser> {
    readonly hidden = ['password'];

    email = '';

    password = '';

    static async checkPasswords(dbPassword: string, password: string): Promise<boolean> {
        const match: boolean = await compare(password, dbPassword);
        return match;
    }

    async country(): Promise<ICountryModel> {
        return this.belongsTo(Country);
    }

    async orders(): Promise<IOrder[]> {
        return this.hasMany(Order);
    }
}
