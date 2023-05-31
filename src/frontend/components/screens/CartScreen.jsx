import { useEffect, useRef } from "react";
import { parseRequestUrl } from "../../utils";
import { getProduct } from "../../../api";
import { getCartItems, setCartItems } from "../../localStorage";
import { useParams, useNavigate } from "react-router-dom";

export const CartScreen = () => {
  const { id } = useParams();
  let cartItems = getCartItems();
  const qtySelectRef = useRef();
  const navigate = useNavigate();

  const addToCart = (item) => {
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    } else {
      cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
  };

  const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestUrl().id) {
      navigate("/cart");
    }
  };

  const handleChange = (e) => {
    const item = getCartItems().find((x) => x.product === e.target.id);
    addToCart({ ...item, qty: Number(e.target.value) }, true);
  };
  const handleDelete = () =>  removeFromCart(deleteButton.id); 

  const handleCheckOut = () => navigate("/signin");

  useEffect(async () => {
    if (id) {
      const product = await getProduct(id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
  }, []);
  return (
    <>
      <div className="content cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {cartItems.length === 0 ? (
              <div>
                Cart is empty.
                <Link to="/">Go Shopping</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <li>
                  <div className="cart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      Qty:
                      <select
                        onChange={(e) => handleChange(e)}
                        className="qty-select"
                        ref={qtySelectRef}
                        id={item.product}
                      >
                        {[...Array(item.countInStock).keys()].map((x, i) =>
                          item.qty === x + 1 ? (
                            <option key={i} selected value={x + 1}>{x + 1}</option>
                          ) : (
                            <option key={i} value={x + 1}>{x + 1}</option>
                          )
                        )}
                      </select>
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e)}
                        className="delete-button"
                        id={item.product}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="cart-price">${item.price}</div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="cart-action">
          <h3>
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button
            onClick={(e) => handleCheckOut(e)}
            id="checkout-button"
            className="primary fw"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};
