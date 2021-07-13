import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delUser } from 'redux/auth'
import { delLoading, setLoading } from 'redux/utils'
import Loading from 'components/Loading'

const Appbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { utils, auth } = useSelector((state) => state)

  useEffect(() => {
    dispatch(delLoading())

    const handleRouteChangeStart = () => dispatch(setLoading())
    const handleRouteChangeComplete = () => dispatch(delLoading())

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  useEffect(() => {
    if (auth.token) router.replace('/dashboard')
    else router.replace('/signin')
  }, [auth.token])

  if (utils.loading) return <Loading />

  return (
    <div className='appbar__container'>
      <h1>Url Shortener</h1>
      {auth.token ? (
        <button
          className='button button-appbar'
          onClick={() => dispatch(delUser())}
        >
          Logout
        </button>
      ) : router.pathname === '/signin' ? (
        <button
          className='button button-appbar'
          onClick={() => router.push('/signup')}
        >
          signup
        </button>
      ) : (
        <button
          className='button button-appbar'
          onClick={() => router.push('/signin')}
        >
          signin
        </button>
      )}
    </div>
  )
}

export default Appbar
