import { Link } from "react-router-dom";

export const DashboardMenu = (props) => {
  return (
    <div className="dashboard-menu">
      <ul>
        <li className={`${props.selected === "dashboard" ? "selected" : ""}`}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={`${props.selected === "orders" ? "selected" : ""}`}>
          <Link to="/orderlist">Orders</Link>
        </li>
        <li className={`${props.selected === "products" ? "selected" : ""}`}>
          <Link to="/productlist">Products</Link>
        </li>
      </ul>
    </div>
  );
};
