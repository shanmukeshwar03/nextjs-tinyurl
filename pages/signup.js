import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { delLoading, pushError, setLoading } from 'redux/utils'
import { setUser } from 'redux/auth'
import { register } from 'utils/axiosAuth'

const Signup = () => {
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [_password, _setpassword] = useState('')
  const [showpassword, setshowpassword] = useState(false)
  const dispatch = useDispatch()

  const validator = () => password === _password

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(setLoading())

    if (validator()) {
      const payload = { username, email, password }
      const resp = await register(payload)
      if (resp.data) {
        dispatch(setUser(resp.data))
      } else {
        dispatch(pushError(resp))
        dispatch(delLoading())
      }
    } else {
      dispatch(pushError("Passwords did'nt match"))
      dispatch(delLoading())
    }
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

  return (
    <div className='signup__container'>
      <form onSubmit={onSubmit}>
        <h1>Join us</h1>
        <div className='input__container'>
          <img src='/icons/email.svg' />
          <input
            value={email}
            onChange={handleEmail}
            placeholder='Email'
            required
          />
        </div>
        <div className='input__container'>
          <img src='/icons/user.svg' />
          <input
            value={username}
            onChange={handleUsername}
            placeholder='Username'
            required
          />
        </div>
        <div className='input__container'>
          <img src='/icons/password.svg' />
          <input
            type={showpassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            placeholder='Password'
            required
          />
          <img
            src={showpassword ? '/icons/eye-off.svg' : '/icons/eye-on.svg'}
            onClick={handleShowPassword}
          />
        </div>
        <div className='input__container'>
          <img src='/icons/password.svg' />
          <input
            type={showpassword ? 'text' : 'password'}
            value={_password}
            onChange={_handlePassword}
            placeholder='Confirm Password'
            required
          />
          <img
            src={showpassword ? '/icons/eye-off.svg' : '/icons/eye-on.svg'}
            onClick={handleShowPassword}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div className='signup__background'></div>
    </div>
  )
}

export default Signup
