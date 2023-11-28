import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";

export const NavBar = () => {
  const { user } = useAuth();
  const { cartItems } = useAppContext();
  let numItems = cartItems ? cartItems.length : 0;

  const styles = ({ isActive }: { isActive: boolean }) => {
    return {
      textDecoration: isActive ? "underline" : "none",
      color: isActive ? "#f08000" : "white",
      fontWeight: isActive ? "bold" : "",
    };
  };
  return (
    <header>
      <div className="brand">
        <h1>
          <a href="/">my_Store</a>
        </h1>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {user && user.name ? (
          <NavLink style={styles} to="/profile">
            <i className="fa fa-user-circle"></i> {user.name.split(" ")[0]}
          </NavLink>
        ) : (
          <NavLink style={styles} to="/signin">
            Sign-In
          </NavLink>
        )}
        <span className="cart-icon">
          <NavLink style={styles} to="/cart">
            <i className="fa fa-shopping-cart "></i> Cart
          </NavLink>
          {numItems > 0 && <span className="cart-bubble">{numItems}</span>}
        </span>
        <span>
          {user && user.isAdmin ? (
            <NavLink style={styles} to="/dashboard">
              <i className="fa fa-dashboard"></i> Dashboard
            </NavLink>
          ) : (
            ""
          )}
        </span>
      </div>
    </header>
  );
};
