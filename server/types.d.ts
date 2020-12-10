/**
 * Models
 */

interface IModel {
    id?: number; // primary key for model
    table: string; // name of the table
    hidden: string[]; // other fields that we want to get excluded in toJSON()
    relationships: IRelationship[];
    created_at?: string;
    updated_at?: string;
    save: () => Promise<T>;
    // static create: (props: T) => T;
    toJSON: () => Pick<this, Exclude<keyof this, keyof this>>;
    belongsTo: (otherModel: Constructor<U>, localField?: string, remoteField?: string) => Promise<T>;
    hasMany: (otherModel: Constructor<U>, localField?: string, remoteField?: string) => Promise<U[]>;
}

interface IRelationship {
    type: 'belongsTo' | 'hasMany';
    name: string;
    constructor: new () => T & IModel;
    table: string;
    localField: keyof T;
    remoteField: string;
}

interface IUserModel extends IModel, IUser {
    country: () => Promise<ICountry>;
    orders: () => Promise<IOrder[]>;
    articles: () => Promise<IArticle[]>;
}

interface IUser {
    id?: number;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    country_id?: number;
    city?: string;
    postal_code?: string;
    phone_number?: string;
    is_admin: boolean;
}

interface IOrderModel extends IModel, IOrder {}

interface IOrder {
    id?: number;
    code?: string;
    user_id?: number;
    coupon_code_id?: number;
    order_status?: string; // Pending | Confirmed | Dispatched | Completed | Canceled;
    price?;
}

interface IOrderItemModel extends IModel, IOrderItem {}

interface IOrderItem {
    id?: number;
    order_id?: number;
    product_id?: number;
    quantity?: number;
    price?: number;
}

interface IProductModel extends IModel, IProduct {}

interface IProduct {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    price: number;
    weight?: number;
    package_size?: string;
    discount: number;
    product_category_id?: number;
    stock_qty?: number;
    featured?: boolean;
    rating?: number;
    reviews_count?: number;
    deleted_at?: string;
}

interface IProductCategoryModel extends IModel, IProductCategory {
    products: () => Promise<IProduct[]>;
}

interface IProductCategory {
    id?: number;
    title?: string;
    parent_id?: number | null;
    slug?: string;
}

interface IProductImageModel extends IModel, IProductImage {}

interface IProductImage {
    id?: number;
    href?: string;
    default_img?: boolean;
    product_id?: number;
}

interface IProductOptionModel extends IModel, IProductOption {}

interface IProductOption {
    id?: number;
    title?: string;
}

interface IProductSpecModel extends IModel, IProductSpec {}

interface IProductSpec {
    id?: number;
    product_id?: number;
    product_options_id?: number;
    value?: string;
}

interface IReviewModel extends IModel, IReview {}

interface IReview {
    id?: number;
    user_id?: number;
    product_id?: number;
    review?: number;
}

interface IArticleModel extends IModel, IArticle {}

interface IArticle {
    id?: number;
    user_id?: number;
    title?: string;
    slug?: string;
    featured_image?: string;
    body?: string;
    published_at?: string;
}

interface ICouponCodeModel extends IModel, ICouponCode {}

interface ICouponCode {
    id?: number;
    code?: string;
    quantity?: number;
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
    code?: number;
    iso_3166_2?: string;
    region?: string;
    sub_region?: string;
    intermediate_region?: string;
    region_code?: string;
    sub_region_code?: string;
    intermediate_region_code?: string;
}

declare const operators = ['=', '>', '<', '>=', '<=', '<>', '!=', 'LIKE'] as const;

type ConditionOperator = typeof operators[number];
type ConditionValue = string | number | boolean;
type SortDirection = 'asc' | 'desc';
type Constructor<T> = new () => T & IModel;
type QueryType = 'select' | 'count' | 'delete';

interface ICondition {
    field: string;
    operator?: ConditionOperator | ConditionValue;
    value: ConditionValue;
}

interface INullCondition {
    field: string;
    is_null: boolean;
}

interface IOrderBy {
    field: string;
    direction: SortDirection;
}

interface IContext {
    resourceId: number | undefined;
}

interface IOrderItemData {
    product_id: number;
    quantity: number;
}
