import { useEffect, useRef, useState } from "react";
import { mutateStoreData } from "../utils/api";
import { setUserInfo, getUserInfo, clearUser } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { apiEndpoints } from "../utils/constants";
import { MessageModal } from "../components/modals/MessageModal";
import { Orders } from "../components/Orders";
import { userInfo } from "../utils/types";

export const ProfileScreen = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useAppContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const profileFormRef = useRef<HTMLFormElement>(null);
  const signoutButtonRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const callBack = () => {
    clearUser();
    setUser({} as userInfo);
    navigate("/signin");
  };

  const handleSignOut = () => {
    setShowModal(true);
    setMessage("You have Logged out successfully!");
  };

  const handleUserUpdate = async (e: any) => {
    e.preventDefault();
    showLoading();
    const { _id } = getUserInfo();
    const nameValue = nameRef?.current?.value ?? "";
    const emailValue = emailRef?.current?.value ?? "";
    const passwordValue = passwordRef?.current?.value ?? "";

    if (nameRef?.current && emailRef?.current && passwordRef?.current) {
      mutateStoreData(
        apiEndpoints.user(_id),
        {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        },
        "PUT"
      )
        .then((data: any) => {
          hideLoading();
          setUserInfo(data);
          setUser(data);
          navigate("/");
          // setMessage(data.message);
        })
        .catch((err: any) => {
          // setMessage(err.message);
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    if (user && !user.name) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {user && (
        <div className="content profile">
          <div className="profile-info">
            <div className="form-container">
              <form onSubmit={(e) => handleUserUpdate(e)} ref={profileFormRef}>
                <ul className="form-items">
                  <li>
                    <h1>User Profile</h1>
                  </li>
                  <li>
                    <label htmlFor="name">Name</label>
                    <input
                      type="name"
                      name="name"
                      ref={nameRef}
                      defaultValue={user.name}
                    />
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
                      onClick={handleSignOut}
                      ref={signoutButtonRef}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <Orders />
        </div>
      )}
      <MessageModal
        show={showModal}
        setShow={setShowModal}
        message={message}
        callback={callBack}
      />
    </>
  );
};
