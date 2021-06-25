import { useState, useEffect } from 'react'
import axios from 'utils/axios'
import { useDispatch } from 'react-redux'
import { pushError } from 'redux/utils'
import { setUser } from 'redux/auth'
import Loading from 'components/Loading'
import router from 'next/router'
import Link from 'next/link'

const Signup = () => {
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [_password, _setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [showpassword, setshowpassword] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const dispatch = useDispatch()

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

  const validator = () => {
    if (password !== _password) {
      dispatch(pushError("Passwords did'nt match"))
      return false
    }
    return true
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setloading(true)
    if (validator()) {
      const payload = { email, username, password }
      try {
        const { data } = await axios.post('auth/signup', payload)
        dispatch(setUser(data))
        router.replace('/dashboard')
      } catch (err) {
        const { error } = err.response.data
        dispatch(pushError(error))
      }
    }
    setloading(false)
  }

  const handleEmail = (event) => {
    setemail(event.target.value)
  }

  const handleUsername = (event) => {
    setusername(event.target.value)
  }

  const handlePassword = (event) => {
    setpassword(event.target.value)
  }

  const _handlePassword = (event) => {
    _setpassword(event.target.value)
  }

  const handleShowPassword = () => {
    setshowpassword(!showpassword)
  }


  if (pageLoading) {
    return <div className='center__container'>
      <Loading />
    </div>
  }

  return (
    <div className="signup__container">
      <form onSubmit={onSubmit}>
        <h1>Join us</h1>
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
          <img src="/user.svg" />
          <input
            value={username}
            onChange={handleUsername}
            placeholder="Username"
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
        <div className="input__container">
          <img src="/password.svg" />
          <input
            type={showpassword ? 'text' : 'password'}
            value={_password}
            onChange={_handlePassword}
            placeholder="Confirm Password"
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
        <span className="signup__link">
          Already a member? <Link href="/auth/signin">Signin</Link>
        </span>
      </form>
      <div className="signup__background"></div>
    </div>
  )
}

export default Signup
