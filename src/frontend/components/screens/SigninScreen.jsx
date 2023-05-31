import { redirectUser } from '../../../backend/utils.mjs';
import { signin } from '../../../api';
import { getUserInfo, setUserInfo } from '../../localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const SigninScreen = () => {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState("");
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
		redirectUser();
	  }
	};

	useEffect(() => {
	  if (getUserInfo().name) { navigate('/'); }
	},[])

  return (
    <>
      <div class="form-container">
        <form onSubmit={(e) => handleSignIn(e)} id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Sign-In</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" ref={emailRef} />
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" name="password" ref={passwordRef} />
            </li>
            <li>
              <button type="submit" class="primary">
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

