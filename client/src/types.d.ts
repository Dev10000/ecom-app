/** Front End Specific */

interface ICartProducts extends IProduct {
    quantity: number;
}

interface IUseCart {
    cartItems: ICartProducts[];
    addProduct: (product: IProduct) => void;
    removeProduct: (product: IProduct) => void;
    updateQuantity: (product: IProduct, newQuantity: number) => void;
}

interface ILoginFormState {
    email: string;
    password: string;
    error: string[] | string | null;
    loading: boolean;
    loggedIn: boolean;
}

interface IUseAuth {
    isLoggedIn: boolean;
    user: IUser | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
}
