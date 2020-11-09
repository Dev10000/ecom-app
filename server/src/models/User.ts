import { compare } from 'bcrypt';
import Model from '../database/Model';
import Country from './Country';

export default class User extends Model<IUser> {
    readonly hidden = ['password'];

    email = '';

    password = '';

    country(): Promise<ICountryModel> {
        return this.belongsTo(Country);
    }

    static async checkPasswords(dbPassword: string, password: string): Promise<boolean> {
        const match: boolean = await compare(password, dbPassword);
        return match;
    }
}
