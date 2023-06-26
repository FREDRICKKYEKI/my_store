import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { Rating } from "../Rating";
import { Link } from "react-router-dom";
import { getProducts } from "../../../api";

export const HomeScreen = () => {
  const [products, setProducts] = useState();
  const { hideLoading, showLoading } = useAppContext();

  useEffect(() => {
    showLoading();
    const fetchProducts = async () => {
      return await getProducts();
    };
    fetchProducts()
      .then((prod) => {
        setProducts(prod);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  }, []);

  return (
    <>
      {products && products.error ? (
        <div>{products.error}</div>
      ) : (
        <ul className="products">
          {products &&
            products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="product-name">
                    <Link to="/product/1">{product.name}</Link>
                  </div>
                  <div className="product-rating">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
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
