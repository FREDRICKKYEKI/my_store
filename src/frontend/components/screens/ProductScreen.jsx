import { useNavigate, useParams } from 'react-router-dom';
import { parseRequestUrl } from '../../utils';
import { getProduct } from '../../../api';
import { Rating } from '../Rating';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext'

export const ProductScreen = () => {
	const [product, setProduct] = useState({})
	const request = parseRequestUrl();
	const navigate = useNavigate()
	const handleAddToCart = () => navigate(`/cart/${request.id}`);
	const { showLoading, hideLoading } = useAppContext();

	useEffect(async() => {
		showLoading();
		setProduct(await getProduct(request.id));
		hideLoading();
	  },[])
    return (
      <div className="content">
        {product && (
          <>
            {product.error ? (
              <div>{product.error}</div>
            ) : (
              <>
                <div className="back-to-result">
                  <a href="/#/">Back to result </a>
                </div>
                <div className="details">
                  <div className="details-image">
                    <img src="${product.image}" alt="${product.name}" />
                  </div>
                  <div className="details-info">
                    <ul>
                      <li>
                        <h1>${product.name}</h1>
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
                        Description:
                        <div>${product.description}</div>
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
