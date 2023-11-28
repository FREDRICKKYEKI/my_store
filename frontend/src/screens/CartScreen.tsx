import { useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { parseUrlHash } from "../utils/utils";
import { cartItem, product } from "../utils/types";
import { getCartItems, storeCartItems } from "../utils/localStorage";
import { useAppContext } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { apiEndpoints } from "../utils/constants";
import { getStoreData } from "../utils/api";

export const CartScreen = () => {
  const { id } = useParams();
  const { cartItems, setCartItems } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qtySelectRef = useRef<any>();

  const removeFromCart = (id: string) => {
    storeCartItems(getCartItems().filter((x) => x.product !== id));
    setCartItems(getCartItems());
    if (id === parseUrlHash().id) {
      navigate("/cart");
    }
  };

  const handleChange = (e: any) => {
    const item = getCartItems().find((x) => x.product === e.target.id);
    addToCart({ ...item, qty: Number(e.target.value) });
  };
  const handleDelete = (e: any) => removeFromCart(e.target.id);

  const handleCheckOut = () => {
    if (!user?.name) navigate("/signin");
    else navigate("/shipping");
  };

  const addToCart = async (item: cartItem) => {
    let items = getCartItems();
    const existItem = items.find((x) => x.product === item.product);

    if (existItem) {
      items = items.map((x) => (x.product === existItem.product ? item : x));
    } else {
      items = [...items, item];
    }
    storeCartItems(items);
    setCartItems(getCartItems());
  };

  useEffect(() => {
    if (!id) return;
    getStoreData(apiEndpoints.product(id))
      .then((data: unknown) => {
        let product = data as product;
        addToCart({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: 1,
        });
      })
      .catch((err: unknown) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {cartItems && (
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
                  <Link to="/">
                    <span
                      style={{
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      Go Shopping
                    </span>
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <li key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        Qty:
                        <select
                          onChange={(e) => handleChange(e)}
                          className="qty-select"
                          id={item.product}
                          ref={qtySelectRef}
                        >
                          {[...Array(item.countInStock).keys()].map((x, i) =>
                            item.qty === x + 1 ? (
                              <option key={i} selected value={x + 1}>
                                {x + 1}
                              </option>
                            ) : (
                              <option key={i} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e)}
                          className="delete-button"
                          id={item.product}
                        >
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
              {cartItems.reduce((a, c) => a + (c?.price || 0) * c.qty, 0)}
            </h3>
            <button
              onClick={handleCheckOut}
              id="checkout-button"
              className="primary fw"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};
