import { genSaltSync, hashSync } from 'bcrypt';
import config from '../../config';

export default function hashPassword(password: string): string {
    const salt = genSaltSync(config.SALT_ROUNDS);
    return hashSync(password, salt);
}
