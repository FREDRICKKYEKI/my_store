import React from "react";

/**
 * Modal component
 * @param {object} props Component props
 * @returns Modal JSX
 */
export const MessageModal = ({ show, setShow, message, callback = null }) => {
  const callBack = () => {
    callback && callback();
    setShow(false);
  };
  return (
    <div>
      <>
        <div className={`overlay ${show && "active"}`} id="message-overlay">
          <div>
            <div id="message-overlay-content">
              {message ? message : "Loading..."}
            </div>
            <button
              onClick={() => {
                callBack();
              }}
              id="message-overlay-close-button"
            >
              OK
            </button>
          </div>
        </div>
      </>
    </div>
  );
};
