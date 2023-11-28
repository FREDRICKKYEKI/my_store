import { Link } from 'react-router-dom';

export const DashboardMenu = (props: { selected: string }) => {
  console.log(props.selected);
  return (
    <>
      <div className='dashboard-menu'>
        <ul>
          <li className={`${props.selected === undefined ? 'selected' : ''}`}>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li className={`${props.selected === 'orderlist' ? 'selected' : ''}`}>
            <Link to='./orderlist'>Orders</Link>
          </li>
          <li
            className={`${props.selected === 'productlist' ? 'selected' : ''}`}
          >
            <Link to='./productlist'>Products</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
