import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { product } from '../utils/types';
import { Rating } from '../components/Rating';
import { apiEndpoints } from '../utils/constants';
import { getStoreData } from '../utils/api';
// import { envs } from '../utils/loadEnv';

export const HomeScreen = () => {
  const { hideLoading, showLoading, products, setProducts, params } =
    useAppContext();

  const getProducts = () => {
    showLoading();
    getStoreData(apiEndpoints.productQuery(params.get('q') || ''))
      .then((prod: unknown) => {
        setProducts(prod as product[]);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products && products?.length < 1 ? (
        <div>No Products yet</div>
      ) : (
        <ul className='products'>
          {products?.map((product) => (
            <li key={product?._id}>
              <div className='product'>
                <Link to={`/product/${product?._id}`}>
                  <img
                    // src={`${envs.BACKEND_URL}${product?.image}`}
                    src={product?.image}
                    alt={product?.name}
                  />
                </Link>
                <div className='product-name'>
                  <Link to={`/product/${product?._id}`}>{product?.name}</Link>
                </div>
                <div className='product-rating'>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </div>
                <div className='product-brand'>{product?.brand}</div>
                <div className='product-price'>${product?.price}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
