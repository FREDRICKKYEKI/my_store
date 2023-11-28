import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { getPaypalClientId, getStoreData, payOrder } from "../../utils/api";
import { apiEndpoints } from "../../utils/constants";

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
  const [clientId, setClientId] = useState("");

  /**
   * Function that handles payment
   *
   * @param {string} clientId paypal client id
   * @param {string} totalPrice total price for payment
   */
  const handlePayment = (clientId: string, totalPrice: number) => {
    if (!clientId) return;
    if (document.querySelectorAll(".paypal-button").length >= 1) return;
    (window as any).paypal.Button.render(
      {
        env: "sandbox",
        client: {
          sandbox: clientId,
          production: "",
        },
        locale: "en_KE",
        style: {
          size: "responsive",
          color: "gold",
          shape: "pill",
        },
        commit: true,
        payment(actions: any) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: totalPrice,
                  currency: "USD",
                },
              },
            ],
          });
        },
        onAuthorize(data: any, actions: any) {
          return actions.payment.execute().then(async () => {
            showLoading();
            await payOrder(id, {
              orderID: data.orderID,
              payerID: data.payerID,
              paymentID: data.paymentID,
            });
            hideLoading();
            setMessage("Payment was successful.");
            resetOrder();
            setShow(true);
          });
        },
      },
      "#paypal-button"
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
    const fetchClientId = async () => {
      return await getPaypalClientId();
    };
    fetchClientId()
      .then((res) => setClientId(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handlePayment(clientId, totalPrice);
  }, [clientId]);

  return <>{clientId && <div className="fw" id="paypal-button"></div>}</>;
};
