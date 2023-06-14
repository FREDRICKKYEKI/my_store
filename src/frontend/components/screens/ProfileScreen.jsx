import { useEffect, useRef, useState } from "react";
import { update } from "../../../api";
import { getUserInfo, setUserInfo, clearUser } from "../../localStorage";
import { useNavigate } from "react-router-dom";
import { MessageModal } from "../modals/MessageModal";
import { useAppContext } from "../../../contexts/AppContext";
import { useAuth } from "../../../contexts/AuthContext";

export const ProfileScreen = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useAppContext();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const profileFormRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const signoutButtonRef = useRef();

  const removeUser = () => {
    clearUser();
	setUser({});
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    const data = await update({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    hideLoading();
    if (data.error) {
      setMessage(data.error);
	  console.log(data.error)
    } else {
      setUserInfo(data);
	  setUser(data);
      navigate("/");
    }
  };
  useEffect(() => {
	  if (!user) {
		navigate("/");
	  }
  }, [])
  return (
    <>{user&&
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} ref={profileFormRef}>
          <ul className="form-items">
            <li>
              <h1>User Profile</h1>
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input type="name" name="name" ref={nameRef} defaultValue={user.name} />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                defaultValue={user.email}
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" ref={passwordRef} />
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
                ref={signoutButtonRef}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </form>
      </div>}
      <MessageModal show={showModal} setShow={setShowModal} message={message} />
    </>
  );
};
