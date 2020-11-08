/**
 * Models
 */

interface IModel {
    id?: number; // primary key for model
    table: string; // name of the table
    hidden: string[]; // other fields that we want to get excluded in toJSON()
    save: () => Promise<T>;
    // create: (props: T) => this;
    toJSON: () => Pick<this, Exclude<keyof this, keyof this>>;
    belongsTo: (otherModel: Constructor<U>, localField?: string, remoteField?: string) => Promise<T>;
    hasMany(otherModel: Constructor<U>, localField?: string, remoteField?: string): Promise<U[]>;
}

interface IUserModel extends IModel, IUser {
    country: () => Promise<ICountry>;
}

interface IUser {
    id?: number;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    country_id?: string;
    city?: string;
    postal_code?: string;
    phone_number?: string;
    created_at?: string;
}

interface IOrder {
    id?: number;
    code: string;
    user_id: number;
    order_status: string; // Pending | Confirmed | Dispatched | Completed | Canceled;
    price;
    created_at?: string;
}

interface IOrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    coupon_code_id?: number;
    quantity: number;
    price: number;
}

interface IProduct {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    price?: number;
    weight?: number;
    package_size?: string;
    discount?: number;
    product_category_id?: number;
    stock_qty?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

interface IProductCategory {
    id?: number;
    title?: string;
    parent_id?: number | null;
    slug?: string;
    created_at?: string;
    updated_at?: string;
}

interface IProductImage {
    id?: number;
    href?: string;
    default_img?: boolean;
    product_id?: number;
}

interface IProductOption {
    id?: number;
    title: string;
}

interface IProductSpec {
    id?: number;
    product_id: number;
    product_options_id: number;
    value: string;
}

interface ICouponCode {
    id?: number;
    code: string;
    quantity?: number;
    created_at?: string;
    expired_at?: string;
}

interface ICountryModel extends IModel, ICountry {
    users: () => Promise<IUser[]>;
}

interface ICountry {
    id?: number;
    name?: string;
    alpha2?: string;
    alpha3?: string;
    code?: string;
    iso_3166_2?: string;
    region?: string;
    sub_region?: string;
    intermediate_region?: string;
    region_code?: string;
    sub_region_code?: string;
    intermediate_region_code?: string;
}
