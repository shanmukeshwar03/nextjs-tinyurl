import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { useDispatch } from 'react-redux';
import { pushError } from 'redux/utils';
import { setUser } from 'redux/auth';
import Loading from 'components/Loading';
import router from 'next/router';
import Link from 'next/link';

const Signin = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [pageLoading, setPageLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    fetcher();
  }, [])

  const fetcher = async () => {
    try {
      await axios.get('validateCookie')
      router.replace('/dashboard')
    } catch (error) {
      setPageLoading(false)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setloading(true);

    const payload = { email, password };
    try {
      const { data } = await axios.post('auth/signin', payload);
      dispatch(setUser(data));
      router.replace('/dashboard');
    } catch (err) {
      const { error } = err.response.data;
      dispatch(pushError(error));
    }

    setloading(false);
  };

  const handleEmail = (event) => {
    setemail(event.target.value);
  };

  const handlePassword = (event) => {
    setpassword(event.target.value);
  };

  const handleShowPassword = () => {
    setshowpassword(!showpassword);
  };

  if (pageLoading) {
    return <div className='center__container'>
      <Loading />
    </div>
  }

  return (
    <div className="signin__container">
      <form onSubmit={onSubmit}>
        <h1>Welcome back</h1>
        <div className="input__container">
          <img src="/email.svg" />
          <input
            value={email}
            onChange={handleEmail}
            placeholder="Email"
            required
          />
        </div>
        <div className="input__container">
          <img src="/password.svg" />
          <input
            type={showpassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            placeholder="Password"
            required
          />
          <img
            src={showpassword ? '/eye-off.svg' : '/eye-on.svg'}
            onClick={handleShowPassword}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Loading /> : 'Submit'}
        </button>
        <span className="signin__link">
          Not a member? <Link href="/auth/signup">Signup now</Link>
        </span>
      </form>
      <div className="signin__background"></div>
    </div>
  );
};

export default Signin;
