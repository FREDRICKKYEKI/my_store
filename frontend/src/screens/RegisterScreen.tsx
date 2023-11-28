import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mutateStoreData } from "../utils/api.js";
import { apiEndpoints } from "../utils/constants.js";
import { useAppContext } from "../contexts/AppContext.js";
import { useAuth } from "../contexts/AuthContext.js";
import { getUserInfo, setUserInfo } from "../utils/localStorage.js";
import { userInfo } from "../utils/types.js";
import { MessageModal } from "../components/modals/MessageModal.js";

export const RegisterScreen = () => {
  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const { setUser } = useAuth();
  const { showLoading, hideLoading } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = async (e: any) => {
    e.preventDefault();

    showLoading();
    if (nameRef?.current && emailRef?.current && passwordRef?.current) {
      mutateStoreData(
        apiEndpoints.register,
        {
          name: nameRef?.current.value,
          email: emailRef?.current.value,
          password: passwordRef?.current.value,
        },
        "POST"
      )
        .then((data) => {
          setMessage("You have Registered Successfully!");
          setShowModal(true);
          hideLoading();
          setUserInfo(data as userInfo);
          setUser(data as userInfo);
        })
        .catch(() => {
          setMessage("Error!");
          setShowModal(true);
          hideLoading();
        });
    }
  };

  const callBacks = () => {
    navigate("/");
  };

  useEffect(() => {
    if (getUserInfo().name) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="form-container">
        <form onSubmit={(e) => handleCreateUser(e)} id="registerForm">
          <ul className="form-items">
            <li>
              <h1>Create Account</h1>
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input type="name" name="name" ref={nameRef} />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" ref={emailRef} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" ref={passwordRef} />
            </li>
            <li>
              <label htmlFor="repassword">Re-Enter Password</label>
              <input type="password" name="repassword" id="repasswordRef" />
            </li>
            <li>
              <button type="submit" className="primary">
                Register
              </button>
            </li>
            <li>
              <div>
                Already have an account?
                <Link
                  style={{ color: "#203040", fontWeight: "bold" }}
                  to="/signin"
                >
                  &nbsp; Sign-In
                </Link>
              </div>
            </li>
          </ul>
        </form>
      </div>
      <MessageModal
        show={showModal}
        setShow={setShowModal}
        message={message}
        callback={getUserInfo() && callBacks}
      />
    </>
  );
};
