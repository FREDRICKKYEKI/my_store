export const apiEndpoints = {
  products: 'api/products',
  myOrders: 'api/orders/mine',
  orders: 'api/orders',
  register: 'api/users/register',
  signin: 'api/users/signin',
  uploads: 'api/uploads',
  summary: 'api/orders/summary',
  paypalId: '/api/paypal/clientId',
  productQuery: (query: string | undefined) =>
    `api/products?searchKeyword=${query}&`,
  payment: (id: string | undefined) => `api/orders/${id}/pay`,
  delivery: (id: string | undefined) => `api/orders/${id}/deliver`,
  product: (id: string | undefined) => `api/products/${id}`,
  order: (id: string | undefined) => `api/orders/${id}`,
  user: (id: string | undefined) => `api/users/${id}`,
};

export const initSummary = {
  users: [],
  orders: [],
  dailyOrders: [],
  productCategories: [],
};
