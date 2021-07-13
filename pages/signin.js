import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { delLoading, pushError, setLoading } from 'redux/utils'
import { setUser } from 'redux/auth'
import { login } from 'utils/axiosAuth'

const Signin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showpassword, setshowpassword] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(setLoading())

    const payload = { email, password }

    const resp = await login(payload)
    if (resp.data) {
      dispatch(setUser(resp.data))
    } else {
      dispatch(pushError(resp))
      dispatch(delLoading())
    }
  }

  const handleEmail = (event) => {
    setemail(event.target.value)
  }

  const handlePassword = (event) => {
    setpassword(event.target.value)
  }

  const handleShowPassword = () => {
    setshowpassword(!showpassword)
  }

  return (
    <div className='signin__container'>
      <form onSubmit={onSubmit}>
        <h1>Welcome back</h1>
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
        <button type='submit'>Submit</button>
      </form>
      <div className='signin__background'></div>
    </div>
  )
}

export default Signin
