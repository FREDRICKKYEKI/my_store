import { Aside } from './components/Aside';
import { NavBar } from './components/NavBar';
import { AppContext } from './contexts/AppContext';
import { CartScreen } from './screens/CartScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { Error404Screen } from './screens/Error404Screen';
import { HomeScreen } from './screens/HomeScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { OrderListScreen } from './screens/OrderListScreen';
import { OrderScreen } from './screens/OrderScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { ProductEditScreen } from './screens/ProductEditScreen';
import { ProductListScreen } from './screens/ProductListScreen';
import { ProductScreen } from './screens/ProductScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import { SigninScreen } from './screens/SigninScreen';
import './styles/styles.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AppContext>
      <div className='grid-container'>
        <NavBar />
        <aside id='aside-container'>
          <Aside />
        </aside>
        <LoadingScreen />
        <main id='main-container'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/dashboard' element={<DashboardScreen />}>
              <Route path='productlist' element={<ProductListScreen />} />
              <Route path='orderlist' element={<OrderListScreen />} />
            </Route>
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='*' element={<Error404Screen />} />
          </Routes>
        </main>
        <footer>All rights reserved &copy;{new Date().getFullYear()}</footer>
      </div>
    </AppContext>
  );
}

export default App;
