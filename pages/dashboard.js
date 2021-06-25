import { useEffect, useState } from 'react'
import Form from 'components/Form'
import Body from 'components/Body'
import axios from 'utils/axios'
import Header from 'components/Header'
import { useDispatch } from 'react-redux'
import { initUrls } from 'redux/urls'
import router from 'next/router'
import Loading from 'components/Loading'
import Head from 'next/head'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => { fetcher() }, [])

  const fetcher = async () => {
    try {
      const { data } = await axios.get('/url')
      dispatch(initUrls(data))
      setLoading(false)
    } catch (error) {
      router.replace('/auth/signin')
    }
  }

  if (loading) {
    return <div className="center__container"> <Head><title>Loading</title></Head> <Loading /></div>
  }

  return (
    <div className="dashboard__container">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <div className="dashboard__body">
        <Form />
        <Body />
      </div>
      <div className="dashboard__background"></div>
    </div>
  )
}

export default Dashboard
