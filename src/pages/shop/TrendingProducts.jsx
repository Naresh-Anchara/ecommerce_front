import React, { useState, useEffect } from 'react';
import ProductCards from './ProductCards';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL'; // Adjust the path if needed

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    axios.get(`${getBaseUrl()}/api/products`)
      .then(res => {
        // If your backend sends { products: [...] }
        // Update this according to your actual response structure
        const fetchedProducts = Array.isArray(res.data) 
          ? res.data 
          : res.data.products;

        setProducts(fetchedProducts);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts([]); // fallback to empty array
      });
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 4);
  };

  return (
    <section className='section__container product__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader mb-12'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque impedit
        harum praesentium quibusdam assumenda dignissimos, quas odio minus
        molestias consequuntur, labore incidunt optio ullam? Repellendus fugit
        possimus porro earum odio.
      </p>

      {/* Products */}
      <div className='mt-12'>
        <ProductCards
          products={Array.isArray(products) ? products.slice(0, visibleProducts) : []}
        />
      </div>

      {/* Load More */}
      <div className='product__btn'>
        {visibleProducts < products.length && (
          <button className='btn' onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
