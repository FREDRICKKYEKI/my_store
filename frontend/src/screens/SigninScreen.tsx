import { mutateStoreData } from "../utils/api";
import { getUserInfo, setUserInfo } from "../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { MessageModal } from "../components/modals/MessageModal";
import { useAuth } from "../contexts/AuthContext";
import { apiEndpoints } from "../utils/constants";
import { userInfo } from "../utils/types";

export const SigninScreen = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const { showLoading, hideLoading } = useAppContext();
  const { setUser } = useAuth();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    showLoading();
    if (!emailRef.current || !passwordRef.current) return;
    mutateStoreData(
      apiEndpoints.signin,
      {
        email: emailRef?.current.value,
        password: passwordRef?.current.value,
      },
      "POST"
    )
      .then((data) => {
        setMessage("Signed in Successfully !");
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
  };

  const callBacks = () => {
    navigate("/");
  };
  useEffect(() => {
    if (getUserInfo().name) {
      navigate("/profile");
    }
  }, []);

  return (
    <>
      <div className="form-container">
        <form onSubmit={(e) => handleSignIn(e)} id="signin-form">
          <ul className="form-items">
            <li>
              <h1>Sign-In</h1>
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
              <button type="submit" className="primary">
                Signin
              </button>
            </li>
            <li>
              <div>
                New User?
                <Link
                  style={{ color: "#203040", fontWeight: "bold" }}
                  to="/register"
                >
                  &nbsp;Create your account
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
        callback={callBacks}
      />
    </>
  );
};
