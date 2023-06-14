import React from 'react'

export const MessageModal = ({show, setShow, message}) => {
  return (
    <div>
      {show && (
        <>
          <div className="overlay active" id="message-overlay">
            <div id="message-overlay-content">
              {message ? message : "Loading..."}
            </div>
            <button
              onClick={() => setShow(false)}
              id="message-overlay-close-button"
            >
              OK
            </button>
          </div>
        </>
      )}
    </div>
  );
}
