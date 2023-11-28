import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAppContext } from '../contexts/AppContext';
import { useState } from 'react';
import { getStoreData } from '../utils/api';
import { apiEndpoints } from '../utils/constants';

export const NavBar = () => {
  const {
    cartItems,
    setParams,
    params,
    setProducts,
    showLoading,
    hideLoading,
  } = useAppContext();
  const [value, setValue] = useState(params.get('q') || '');
  const { user } = useAuth();
  let numItems = cartItems ? cartItems.length : 0;

  const styles = ({ isActive }: { isActive: boolean }) => {
    return {
      textDecoration: isActive ? 'underline' : 'none',
      color: isActive ? '#f08000' : 'white',
      fontWeight: isActive ? 'bold' : '',
    };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    showLoading();
    getStoreData(apiEndpoints.productQuery(value))
      .then((prod: unknown) => {
        console.log(prod);
        hideLoading();
        setProducts(prod as any);
      })
      .catch((err) => {
        hideLoading();
        console.log(err);
      });
  };

  return (
    <header>
      <div className='brand'>
        <button
          onClick={() => {
            document.getElementById('aside-container')?.classList.add('open');
          }}
          id='aside-open-button'
        >
          &#9776;
        </button>
        <a href='/'>my_Store</a>
      </div>
      <div className='search'>
        <form
          onSubmit={(e: any) => handleSubmit(e)}
          className='search-form'
          id='search-form'
          style={{ color: 'black' }}
        >
          <input
            type='text'
            name='q'
            id='q'
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setParams({ ...params, q: e.target.value });
            }}
            placeholder='Search Products...'
          />
          <button type='submit'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {user && user.name ? (
          <NavLink style={styles} to='/profile'>
            <i className='fa fa-user-circle'></i> {user.name.split(' ')[0]}
          </NavLink>
        ) : (
          <NavLink style={styles} to='/signin'>
            Sign-In
          </NavLink>
        )}
        <span className='cart-icon'>
          <NavLink style={styles} to='/cart'>
            <i className='fa fa-shopping-cart '></i> Cart
          </NavLink>
          {numItems > 0 && <span className='cart-bubble'>{numItems}</span>}
        </span>
        <span>
          {user && user.isAdmin ? (
            <NavLink style={styles} to='/dashboard'>
              <i className='fa fa-dashboard'></i> Dashboard
            </NavLink>
          ) : (
            ''
          )}
        </span>
      </div>
    </header>
  );
};
