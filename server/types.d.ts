interface IUser {
    id?: number;
    email: string;
    password: string;
    hash: string;
    first_name: string;
    last_name: string;
    address?: string;
    city?: string;
    postal_code?: string;
    phone_number?: string;
    created_at?: string;
}
