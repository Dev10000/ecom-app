import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AUTH_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwiZW1haWwiOiJhbmdlbGluLmNhbHVAZ21haWwuY29tIiwiaWF0IjoxNjA1MzA0Mzg1LCJleHAiOjE2MDUzOTA3ODV9.mQVBKSMidByA5O5NdH-CXxCkLub_udVNrzXqXYOycoA';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

const Products: React.FC = () => {
    // const [products, setProducts] = useState<IProduct[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categoryId] = useState<number | null>(1);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/categories/${categoryId}/products`)
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
