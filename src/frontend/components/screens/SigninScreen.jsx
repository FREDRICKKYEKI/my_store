import { signin } from '../../../api';
import { getUserInfo, setUserInfo } from '../../localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { MessageModal } from '../modals/MessageModal';
import { useAuth } from '../../../contexts/AuthContext';

export const SigninScreen = () => {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState("");
	const { showLoading, hideLoading } = useAppContext();
	const { setUser }= useAuth();
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleSignIn = async (e) => {
	  e.preventDefault();
	  showLoading();
	  const data = await signin({
		email: emailRef.current.value,
		password: passwordRef.current.value,
	  });
	  hideLoading();
	  if (data.error) {
		setMessage(data.error);
		setShowModal(true);
	  } else {
		setUserInfo(data);
		setUser(data);
		navigate('/');
	  }
	};

	useEffect(() => {
	  if (getUserInfo().name) { navigate('/'); }
	},[])

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
                <Link to="/register">Create your account</Link>
              </div>
            </li>
          </ul>
        </form>
      </div>
      <MessageModal show={showModal} setShow={setShowModal} message={message} />
    </>
  );
};

