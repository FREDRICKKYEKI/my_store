export const apiEndpoints = {
  products: 'api/products',
  myOrders: 'api/orders/mine',
  orders: 'api/orders',
  register: 'api/users/register',
  signin: 'api/users/signin',
  uploads: 'api/uploads',
  summary: 'api/orders/summary',
  delivery: (id: string | undefined) => `api/orders/${id}/deliver`,
  product: (id: string | undefined) => `api/products/${id}`,
  order: (id: string | undefined) => `api/orders/${id}`,
  user: (id: string | undefined) => `api/users/${id}`,
};
