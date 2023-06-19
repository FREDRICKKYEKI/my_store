import React, { useEffect, useState } from "react";
import { getOrder, getPaypalClientId, payOrder } from "../../../api";
import { useAppContext } from "../../../contexts/AppContext";
import { useParams } from "react-router-dom";

export const PayPalButton = ({ totalPrice, setMessage, setShow, setOrder }) => {
  const { showLoading, hideLoading } = useAppContext();
  const { id } = useParams();
  const [clientId, setClientId] = useState("");

  /**
   * Function that handles payment
   *
   * @param {string} clientId paypal client id
   * @param {string} totalPrice total price for payment
   */
  const handlePayment = (clientId, totalPrice) => {
    if (!clientId) return;
    if (document.querySelectorAll(".paypal-button").length >= 1) return;
    window.paypal.Button.render(
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
        payment(data, actions) {
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
        onAuthorize(data, actions) {
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
    const fetchOrderDetails = async () => {
      return await getOrder(id);
    };

    fetchOrderDetails()
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
