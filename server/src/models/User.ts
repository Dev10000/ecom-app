import { compare } from 'bcrypt';
import Model from '../database/Model';
import Country from './Country';
import Order from './Order';
import Article from './Article';

export default class User extends Model<IUser> {
    readonly hidden = ['password'];

    email = '';

    password = '';

    is_admin = false;

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

    async articles(): Promise<IArticle[]> {
        return this.hasMany(Article);
    }
}
