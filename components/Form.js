import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushUrl } from 'redux/urls'
import { pushError } from 'redux/utils'
import { setUrl } from 'utils/axiosUrl'

const Form = () => {
  const [input, setinput] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const handleInput = (event) => {
    setinput(event.target.value)
  }

  const testUrl = () => {
    return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
      input
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (testUrl()) {
      const resp = await setUrl({ source: input }, auth.token)
      if (resp.data) {
        setinput('')
        dispatch(pushUrl(resp.data))
      } else {
        dispatch(pushError(resp))
      }
    } else {
      dispatch(pushError('Invalid URL'))
    }
  }

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={handleInput}
        placeholder="Paste your URL here"
      />
      <button>shrink</button>
    </form>
  )
}

export default Form
