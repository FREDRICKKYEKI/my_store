import axios from 'axios';
// import { apiUrl } from './config';
import { httpMutateMethods } from './types';
import { getUserInfo } from './localStorage';
import { apiEndpoints } from './constants';
import { envs } from './loadEnv';

const apiUrl = envs.BACKEND_URL;

export const getStoreData = (apiEndpoint: string) => {
  return new Promise((resolve, reject) => {
    const { token } = getUserInfo();

    axios({
      url: `${apiUrl}/${apiEndpoint}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const mutateStoreData = (
  apiEndpoint: string,
  data: {},
  method: httpMutateMethods
) => {
  return new Promise((resolve, reject) => {
    const { token } = getUserInfo();

    axios({
      url: `${apiUrl}/${apiEndpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadProductImage = (formData: FormData) => {
  return new Promise((resolve, reject) => {
    const { token } = getUserInfo();
    axios({
      url: `${apiUrl}/${apiEndpoints.uploads}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
/**
 * creates new order in database
 *
 * @param {object} order order details
 * @returns {Promise<object>} response object
 */
export const createOrder = async (order: any) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return {
      error: (err as any).response
        ? (err as any).response.data.message
        : (err as any).message,
    };
  }
};

/**
 * fetches paypal clientId
 * @returns {Promise<object>} response object
 */
export const getPaypalClientId = async () => {
  const response = await axios({
    url: `${apiUrl}/api/paypal/clientId`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  return response.data.clientId;
};

/**
 * Function that handles order payment
 *
 * @param {string} orderId id of order
 * @param {string} paymentResult payment information
 * @returns {Promise<object>} response object
 */
export const payOrder = async (
  orderId: string | undefined,
  paymentResult: {}
) => {
  if (!orderId) {
    return {
      error: 'Order Id is not defined',
    };
  }
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/pay`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return {
      error: (err as any).response
        ? (err as any).response.data.message
        : (err as any).message,
    };
  }
};
