import { Link, NavLink } from 'react-router-dom';
import { getCartItems, getUserInfo } from '../localStorage';
import { useAuth } from '../../contexts/AuthContext';
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';

export const NavBar = () => {
    const { user } = useAuth();
	const { cartItems } = useAppContext();
	let numItems = cartItems ? cartItems.length : 0;

	const styles = ({isActive}) => {
		return {
			// color: isActive ? '#f08040' : 'white',
			textDecoration: isActive ? 'underline' : 'none',
		}
	}
	useEffect(() => {

	}, [])

    return (
      <header>
        <div className="brand">
          <NavLink to="/">amazona</NavLink>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {user && user.name ? (
            <NavLink style={styles} to="/profile">
				<i className='fa fa-user-circle'></i> {user.name.split(" ")[0]}
            </NavLink>
          ) : (
            <NavLink style={styles} to="/signin">
              Sign-In
            </NavLink>
          )}
          <span className="cart-icon">
            <NavLink style={styles} to="/cart">
            <i className="fa fa-shopping-cart "></i>
              Cart
            </NavLink>
            {numItems > 0 && <span className="cart-bubble">{numItems}</span>}
          </span>
        </div>
      </header>
    );
};

