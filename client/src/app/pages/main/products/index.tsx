import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categoryId] = useState<number | null>(1);
    useEffect(() => {
        axios
            .get(`categories/${categoryId}/products`)
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, [categoryId]);
    return (
        <div>
            <div>
                {categoryId}
                {products.map((product) => product.title)}
            </div>
        </div>
    );
};

export default Products;
