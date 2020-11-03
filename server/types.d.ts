interface IUser {
    id?: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address?: string;
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
}

interface IProduct {
    id?: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    weight?: number;
    package_size?: string;
    discount: number;
    product_category_id: number;
    stock_qty: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

interface IProductCategory {
    id?: number;
}

interface IProductImage {
    id?: number;
}

interface IProductOption {
    id?: number;
}

interface IProductSpec {
    id?: number;
}

interface ICouponCode {
    id?: number;
}

interface ICountry {
    id?: number;
}
