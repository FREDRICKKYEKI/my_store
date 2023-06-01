import { useRef, useState } from "react";
import { update } from "../../../api";
import { getUserInfo, setUserInfo, clearUser } from "../../localStorage";
import { useNavigate } from "react-router-dom";
import { MessageModal } from "../modals/MessageModal";
import { useAppContext } from "../../../contexts/AppContext";

export const ProfileScreen = () => {
  const { name, email } = getUserInfo();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useAppContext();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const removeUser = () => { clearUser(); navigate("/") };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    const data = await update({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    });
    hideLoading();
    if (data.error) {
      setMessage(data.error);
    } else {
      setUserInfo(data);
      navigate("/");
    }
  };
  if (!name) {
    navigate("/");
  }
  return (
	<>
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)} ref="profile-form">
        <ul className="form-items">
          <li>
            <h1>User Profile</h1>
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input type="name" name="name" ref="name" value="${name}" />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref="email" value="${email}" />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref="password" />
          </li>
          <li>
            <button type="submit" className="primary">
              Update
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => removeUser()}
              ref="signout-button"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </form>
    </div>
	<MessageModal show={showModal} setShow={setShowModal} message={message}/>
	</>
  );
};
