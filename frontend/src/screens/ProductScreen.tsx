import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { product } from '../utils/types';
import { getStoreData, mutateStoreData } from '../utils/api';
import { apiEndpoints } from '../utils/constants';
import { Rating } from '../components/Rating';
import { useAuth } from '../contexts/AuthContext';
import { MessageModal } from '../components/modals/MessageModal';

export const ProductScreen = () => {
  const [product, setProduct] = useState<product>({} as product);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
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

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    showLoading();
    if (document.getElementById('review-form')) {
      showLoading();
      mutateStoreData(
        apiEndpoints.productReview(id),
        {
          comment: (document.getElementById('comment') as any)?.value,
          rating: (document.getElementById('rating') as any)?.value,
        },
        'POST'
      )
        .then(() => {
          hideLoading();
          setMessage('Review Added Successfully');
          setShowModal(true);
        })
        .catch((err) => {
          hideLoading();
          console.log(err);
          setMessage("Something went wrong. Couldn't add review");
          setShowModal(true);
        });
    }
  };
  return (
    <div className='content'>
      <>
        {!product ? (
          <div>No Products available</div>
        ) : (
          <>
            <div className='back-to-result'>
              <Link to='/'>
                <i className='fa fa-arrow-left fa-lg'></i>{' '}
                <strong>Go Back</strong>
              </Link>
            </div>
            <div className='details'>
              <div className='details-image'>
                <img
                  style={{
                    objectFit: 'contain',
                    maxHeight: '300px',
                  }}
                  src={`${product.image}`}
                  alt={`${product.name}`}
                />
              </div>
              <div className='details-info'>
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
              <div className='details-action'>
                <ul>
                  <li>Price: ${product.price}</li>
                  <li>
                    Status :
                    {product.countInStock > 0 ? (
                      <span className='success'>In Stock</span>
                    ) : (
                      <span className='error'>Unavailable</span>
                    )}
                  </li>
                  <li>
                    <button
                      id='add-button'
                      onClick={() => handleAddToCart()}
                      className='fw primary'
                    >
                      Add to Cart{' '}
                    </button>
                  </li>
                </ul>
              </div>
              <div className='content'>
                <h2>Reviews</h2>
                {product?.reviews?.length === 0 && (
                  <div>There is no review.</div>
                )}
                <ul className='review'>
                  {product?.reviews?.map((review: any) => (
                    <li>
                      <div>
                        <b>{review.name}</b>
                      </div>
                      <div className='rating-container'>
                        <Rating text='' value={review.rating} />
                        <div>{review.createdAt.substring(0, 10)}</div>
                      </div>
                      <div>{review.comment}</div>
                    </li>
                  ))}
                  <li>
                    {user?.name ? (
                      <div className='form-container'>
                        <form
                          onSubmit={(e: any) => handleFormSubmit(e)}
                          id='review-form'
                        >
                          <ul className='form-items'>
                            <li>
                              {' '}
                              <h3>Write a customer reviews</h3>
                            </li>
                            <li>
                              <label htmlFor='rating'>Rating</label>
                              <select required name='rating' id='rating'>
                                <option value=''>Select</option>
                                <option value='1'>1 = Poor</option>
                                <option value='2'>2 = Fair</option>
                                <option value='3'>3 = Good</option>
                                <option value='4'>4 = Very Good</option>
                                <option value='5'>5 = Excellent</option>
                              </select>
                            </li>
                            <li>
                              <label htmlFor='comment'>Comment</label>
                              <textarea
                                required
                                name='comment'
                                id='comment'
                              ></textarea>
                            </li>
                            <li>
                              <button type='submit' className='primary'>
                                Submit
                              </button>
                            </li>
                          </ul>
                        </form>
                      </div>
                    ) : (
                      <div>
                        Please <a href='/#/signin'>Signin</a> to write a review.
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </>
      <MessageModal
        callback={() => window.location.reload()}
        message={message}
        show={showModal}
        setShow={setShowModal}
      />
    </div>
  );
};
