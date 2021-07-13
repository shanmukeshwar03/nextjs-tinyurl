import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUrls } from 'redux/urls'
import { delUser } from 'redux/auth'
import { delLoading, setLoading } from 'redux/utils'
import { getUrl } from 'utils/axiosUrl'
import Head from 'next/head'
import Form from 'components/Form'
import Body from 'components/Body'

const Dashboard = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    const fetcher = async () => {
      dispatch(setLoading())
      const resp = await getUrl(auth.token)

      if (resp.data) dispatch(initUrls(resp.data))
      else dispatch(delUser())

      dispatch(delLoading())
    }
    fetcher()
  }, [])

  return (
    <div className='dashboard__container'>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='dashboard__body'>
        <Form />
        <Body />
      </div>
      <div className='dashboard__background'></div>
    </div>
  )
}

export default Dashboard
