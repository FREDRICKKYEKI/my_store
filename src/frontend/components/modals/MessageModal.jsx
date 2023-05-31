import React from 'react'

export const MessageModal = (show, setShow, message, callback) => {
	const closeModal = () => {
    setShow(false);
  }
  return (
    <div>
      {show && (
        <>
          <div class="overlay active" id="message-overlay">
            <div id="message-overlay-content">
              {message ? message : "Loading..."}
            </div>
            <button
              onClick={() => closeModal()}
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
