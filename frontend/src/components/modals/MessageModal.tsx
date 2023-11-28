/**
 * Modal component
 * @param {object} props Component props
 * @returns Modal JSX
 */
export const MessageModal = ({
  show,
  setShow,
  message,
  callback,
}: {
  show: boolean;
  setShow: (bool: boolean) => void;
  message: string;
  callback?: () => void;
}) => {
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
                callback && callback();
                setShow(false);
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
