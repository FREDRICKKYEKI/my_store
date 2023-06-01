import { Link } from 'react-router-dom';
import { getUserInfo } from '../localStorage';

export const NavBar = () => {
    const { name } = getUserInfo();
    return (
      <header>
        <div className="brand">
          <Link to="/">jsamazona</Link>
        </div>
        <div>
          {name
            ? <Link to="/profile">${name}</Link>
            : <Link to="/signin">Sign-In</Link>
			}
          <Link to="/cart">Cart</Link>
        </div>
      </header>
    );
};

