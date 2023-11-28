export type httpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type httpMutateMethods = 'POST' | 'PUT' | 'DELETE';

export interface cartItem {
  _id?: string | undefined;
  qty: number;
  product?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  price?: number | undefined;
  countInStock?: number | undefined;
}

export type product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  countInStock: number;
  qty: number;
  rating: number;
  numReviews: number;
  description: string;
};

export type userInfo = {
  _id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  isAdmin: boolean;
};

export type shippingInfo = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export interface AuthContextType {
  user: userInfo | null;
  setUser: React.Dispatch<React.SetStateAction<userInfo | null>>;
}

export interface AppContextType {
  showLoading: () => void;
  hideLoading: () => void;
  loading: boolean;
  cartItems: cartItem[] | undefined;
  setCartItems: React.Dispatch<React.SetStateAction<cartItem[] | undefined>>;
  params: any;
  setParams: any;
  products: product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<product[] | undefined>>;
}

export type OrderItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  product: {}; // to be changed
};

export interface Order {
  _id: string;
  createdAt: string;
  orderItems: OrderItem[];
  user: {}; // to be changed
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payment: {
    paymentMethod: string;
    paymentResult: {
      orderID: string;
      payerID: string;
      paymentID: string;
    };
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}

export type shippingDetails = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
