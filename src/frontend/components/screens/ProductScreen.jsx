import { Link, useNavigate, useParams } from "react-router-dom";
import { parseRequestUrl } from "../../utils";
import { getProduct } from "../../../api";
import { Rating } from "../Rating";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";

export const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  // const request = parseRequestUrl();
  const navigate = useNavigate();
  const handleAddToCart = () => navigate(`/cart/${id}`);
  const { showLoading, hideLoading } = useAppContext();

  useEffect(() => {
    showLoading();

    const getProd = async () => {
      return await getProduct(id);
    };
    getProd()
      .then((res) => {
        setProduct(res);
        hideLoading();
      })
      .catch((err) => {
        hideLoading();
      });
  }, []);
//   console.log(product);
  return (
    <div className="content">
      {product && (
        <>
          {product.error ? (
            <div>{product.error}</div>
          ) : (
            <>
              <div className="back-to-result">
			  	<Link to="/">
				  <i className="fa fa-arrow-left fa-lg"></i> <strong>Go Back</strong>
				</Link>
              </div>
              <div className="details">
                <div className="details-image">
                  <img src={`${product.image}`} alt={`${product.name}`} />
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
      )}
    </div>
  );
};
