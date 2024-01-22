import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sort = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' 또는 'desc'

    useEffect(() => {
        // JSON 데이터 가져오기
        axios.get('https://gonookim.github.io/product.json')
            .then(response => {
                setProducts(response.data);
                setSortedProducts(response.data.sort((a, b) => a.product_name.localeCompare(b.product_name)));
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleSortClick = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);

        const sorted = [...products].sort((a, b) => {
            if (newOrder === 'asc') {
                return a.product_name.localeCompare(b.product_name);
            } else {
                return b.product_name.localeCompare(a.product_name);
            }
        });

        setSortedProducts(sorted);
    };

    return (
        <div>
            <button onClick={handleSortClick}>
                {`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            </button>

            <ul>
                {sortedProducts.map(product => (
                    <li key={product.id}>{product.product_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sort;