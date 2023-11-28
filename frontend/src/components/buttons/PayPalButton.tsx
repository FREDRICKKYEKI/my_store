import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { getStoreData, mutateStoreData } from '../../utils/api';
import { apiEndpoints } from '../../utils/constants';

export const PayPalButton = ({
  totalPrice,
  setMessage,
  setShow,
  setOrder,
}: {
  totalPrice: number;
  setMessage: (message: string) => void;
  setShow: (show: boolean) => void;
  setOrder: (order: any) => void;
}) => {
  const { showLoading, hideLoading } = useAppContext();
  const { id } = useParams();
  const [clientId, setClientId] = useState('');

  /**
   * Function that handles payment
   *
   * @param {string} clientId paypal client id
   * @param {string} totalPrice total price for payment
   */
  const handlePayment = (clientId: string, totalPrice: number) => {
    if (!clientId) return;
    if (document.querySelectorAll('.paypal-button').length >= 1) return;
    (window as any).paypal.Button.render(
      {
        env: 'sandbox',
        client: {
          sandbox: clientId,
          production: '',
        },
        locale: 'en_KE',
        style: {
          size: 'responsive',
          color: 'gold',
          shape: 'pill',
        },
        commit: true,
        payment(actions: any) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: totalPrice,
                  currency: 'USD',
                },
              },
            ],
          });
        },
        onAuthorize(data: any, actions: any) {
          return actions.payment.execute().then(async () => {
            showLoading();
            mutateStoreData(
              apiEndpoints.payment(id),
              {
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: data.paymentID,
              },
              'PUT'
            )
              .then(() => {
                hideLoading();
                setMessage('Payment was successful.');
                setShow(true);
                resetOrder();
              })
              .catch((err) => {
                setMessage('⚠ Payment was not successful.');
                setShow(true);
                console.log(err);
                hideLoading();
              });
          });
        },
      },
      '#paypal-button'
    ).then(() => {});
  };

  /**
   * Function that refetches order from database
   */
  const resetOrder = () => {
    showLoading();
    getStoreData(apiEndpoints.order(id))
      .then((res) => {
        setOrder(res);
        hideLoading();
      })
      .catch((err) => {
        console.log(err);
        hideLoading();
      });
  };

  useEffect(() => {
    getStoreData(apiEndpoints.paypalId)
      .then((res) => setClientId(res as string))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handlePayment(clientId, totalPrice);
  }, [clientId]);

  return <>{clientId && <div className='fw' id='paypal-button'></div>}</>;
};
