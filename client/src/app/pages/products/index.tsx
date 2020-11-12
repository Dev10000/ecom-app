import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AUTH_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwiZW1haWwiOiJhbmdlbGluLmNhbHUxMEBnbWFpbC5jb20iLCJpYXQiOjE2MDUxNjk0MTQsImV4cCI6MTYwNTI1NTgxNH0.kddknkSWA2psj5BAOjLyUsKacYYFFq_1kjusURpFV8w';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

const Products: React.FC = () => {
    // const [products, setProducts] = useState<IProduct[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(1);
    const setState = () => {
        setCategoryId(2);
    };
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/categories/5/products`)
            .then((response) => {
                console.log(response.data.data);
                setProducts(response.data.data);
            })
            .catch((err) => {
                return err;
            });
    }, [categoryId]);
    return (
        <div>
            <button type="button" onClick={setState}>
                Click me to get new category id
            </button>
            <div>
                {categoryId}
                {products.map((product) => product.title)}
            </div>
        </div>
    );
};

export default Products;
