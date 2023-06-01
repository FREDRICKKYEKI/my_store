import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { Rating } from '../Rating';
import { useNavigate } from 'react-router-dom';
import { getCartItems } from '../../localStorage';

export const HomeScreen = () => {
	const navigate = useNavigate();

const redirectUser = () => {
    if (getCartItems().length !== 0) {
      navigate("/shipping");
    } else {
      navigate("/");
    }
   };
	const [products, setProducts] = useState({});
	const [response, setResponse] = useState({})
	const { hideLoading, showLoading } = useAppContext()

	useEffect (() => {
	  showLoading();
	  axios.get({
		url: 'http://localhost:5000/api/products',
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
      {!response ||
        (response.statusText !== "OK" ? (
          <div>Error in getting data</div>
        ) : (
          <ul className="products">
            {products.map((product) => (
              <li key = {product._id}>
                <div className="product">
                  <a href={`/#/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </a>
                  <div className="product-name">
                    <a href="/#/product/1">${product.name}</a>
                  </div>
                  <div className="product-rating">
                    <Rating
                      value = {product.rating}
                      text = {`${product.numReviews} review`}
                    />
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                </div>
              </li>
            ))}
          </ul>
        ))}
    </>
  );
};
