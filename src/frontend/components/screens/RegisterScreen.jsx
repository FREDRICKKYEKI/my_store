import { useContext, useRef, useState } from 'react';
// import { redirectUser } from '../../../backend/utils.js';
import { register } from '../../../api';
import { getUserInfo, setUserInfo } from '../../localStorage';
import { MessageModal } from '../modals/MessageModal.jsx';
import { useAppContext } from '../../../contexts/AppContext.js';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterScreen = () => {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const {showLoading, hideLoading} = useAppContext();
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleCreateUser = async (e) => {
		e.preventDefault();

		showLoading();
		const data = await register({
		  name: nameRef.current.value,
		  email: emailRef.current.value,
		  password: passwordRef.current.value,
		});
		hideLoading();

		if (data.error) {
		  setMessage(data.error);
		  setShowModal(true);
		} else {
		  setUserInfo(data);
		//   redirectUser();
		}
	  };
	  if (getUserInfo().name) { navigate('/'); }

    return (
	<>
    <div class="form-container">
      <form onSubmit={(e) => handleCreateUser(e)} id="registerForm">
        <ul class="form-items">
          <li>
            <h1>Create Account</h1>
          </li>
          <li>
            <label for="name">Name</label>
            <input type="name" name="name" ref={nameRef} />
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
            <label for="repassword">Re-Enter Password</label>
            <input type="password" name="repassword" id="repasswordRef" />
          </li>
          <li>
            <button type="submit" class="primary">Register</button>
          </li>
          <li>
            <div>
              Already have an account?
              <Link to="/signin">Sign-In </Link>
            </div>
          </li>
        </ul>
      </form>
    </div>
	<MessageModal show={showModal} setShow={setShowModal} message={message}/>
	</>
	)
}
