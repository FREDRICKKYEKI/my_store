import './assets/styles/styles.css'
import { Route, Routes } from 'react-router-dom'
import { ProductScreen } from './frontend/components/screens/ProductScreen'
import { CartScreen } from './frontend/components/screens/CartScreen'
import { ProfileScreen } from './frontend/components/screens/ProfileScreen'
import { ShippingScreen } from './frontend/components/screens/ShippingScreen'
import { RegisterScreen } from './frontend/components/screens/RegisterScreen'
import { SigninScreen } from './frontend/components/screens/SigninScreen'
import { NavBar } from './frontend/components/NavBar'
import { AppContext, useAppContext } from './contexts/AppContext'

function App() {
	const { loading } = useAppContext();

	return (
    <AppContext>
      <NavBar />
      <LoadingScreen loading={loading} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        {/* <Route path="/payment" element={<PaymentScreen />} /> */}
        {/* <Route path="/placeorder" element={<PlaceOrderScreen />} /> */}
      </Routes>
    </AppContext>
  );
}

export default App
