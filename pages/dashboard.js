import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initUrls } from "redux/urls";
import { delUser } from "redux/auth";
import { delLoading, setLoading, pushError } from "redux/utils";
import Head from "next/head";
import Form from "components/Form";
import Body from "components/Body";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();

  const getUrlsFromServer = async () => {
    dispatch(setLoading());
    try {
      const response = await axios.get(process.env.BASE_URL + "/url");
      if (response.data) dispatch(initUrls(response.data));
      else dispatch(delUser());
    } catch (error) {
      dispatch(pushError(error.response.data));
    }
    dispatch(delLoading());
  };

  useEffect(() => {
    getUrlsFromServer();
  }, []);

  return (
    <div className="dashboard__container">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="dashboard__body">
        <Form />
        <Body />
      </div>
      <div className="dashboard__background"></div>
    </div>
  );
};

export default Dashboard;
