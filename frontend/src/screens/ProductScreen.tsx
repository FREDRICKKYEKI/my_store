import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { product } from "../utils/types";
import { getStoreData } from "../utils/api";
import { apiEndpoints } from "../utils/constants";
import { Rating } from "../components/Rating";
import { envs } from "../utils/loadEnv";

export const ProductScreen = () => {
  const [product, setProduct] = useState<product>({} as product);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleAddToCart = () => navigate(`/cart/${id}`);
  const { showLoading, hideLoading } = useAppContext();

  useEffect(() => {
    showLoading();

    getStoreData(apiEndpoints.product(id))
      .then((res) => {
        setProduct(res as product);
        hideLoading();
      })
      .catch(() => {
        hideLoading();
      });
  }, []);
  return (
    <div className="content">
      <>
        {!product ? (
          <div>No Products available</div>
        ) : (
          <>
            <div className="back-to-result">
              <Link to="/">
                <i className="fa fa-arrow-left fa-lg"></i>{" "}
                <strong>Go Back</strong>
              </Link>
            </div>
            <div className="details">
              <div className="details-image">
                <img
                  src={`${envs.BACKEND_URL + product.image}`}
                  alt={`${product.name}`}
                />
              </div>
              <div className="details-info">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </li>
                  <li>
                    Price: <strong>${product.price}</strong>
                  </li>
                  <li>
                    Description: <strong>{product.brand}</strong>
                  </li>
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>Price: ${product.price}</li>
                  <li>
                    Status :
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="error">Unavailable</span>
                    )}
                  </li>
                  <li>
                    <button
                      id="add-button"
                      onClick={() => handleAddToCart()}
                      className="fw primary"
                    >
                      Add to Cart{" "}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};
