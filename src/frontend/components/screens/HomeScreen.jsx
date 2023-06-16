import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { Rating } from '../Rating';
import { Link } from 'react-router-dom';

export const HomeScreen = () => {
	const [products, setProducts] = useState({});
	const [response, setResponse] = useState({})
	const { hideLoading, showLoading } = useAppContext()

	useEffect (() => {
	  showLoading();
	  axios.get('http://localhost:5000/api/products',{
		headers: {
		  'Content-Type': 'application/json',
		},
	  }).then((response) => {
		  setProducts(response.data);
		  setResponse(response);
		  hideLoading();
	  }).catch((err) => {
		hideLoading(err);
		console.log(err)
	  });
	  },[])
  return (
    <>
      {response.statusText !== "OK" ? (<>{response.status&&<div>Error in getting data</div>}</>)
       : ( response &&
          <ul className="products">
            {products.map((product) => (
              <li key = {product._id}>
                <div className="product">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="product-name">
                    <Link to="/product/1">{product.name}</Link>
                  </div>
                  <div className="product-rating">
                    <Rating
                      value = {product.rating}
                      text = {`${product.numReviews} reviews`}
                    />
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
    </>
  );
};
