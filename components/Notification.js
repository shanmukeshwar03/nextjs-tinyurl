import { useSelector } from 'react-redux'
import Toast from 'components/Toast'

const Notification = () => {
  const state = useSelector((state) => state.utils)
  return (
    <div className='notification__container'>
      {state.errors.map((err, key) => (
        <Toast key={key} err={err} />
      ))}
    </div>
  )
}

export default Notification
