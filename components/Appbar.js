import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, delUser } from "redux/auth";
import { delLoading, setLoading, pushError } from "redux/utils";
import Loading from "components/Loading";
import axios from "axios";

axios.defaults.withCredentials = true;

const Appbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { utils, auth } = useSelector((state) => state);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(
        process.env.AUTH_URL + "/auth/verifyToken"
      );
      if (response.data) dispatch(setUser(response.data));
    } catch (error) {
      dispatch(pushError(error.response.data));
    }
    dispatch(delLoading());
  };

  useEffect(() => {
    checkLoggedIn();

    const handleRouteChangeStart = () => dispatch(setLoading());
    const handleRouteChangeComplete = () => dispatch(delLoading());

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    if (auth.user) router.replace("/dashboard");
    else router.replace("/");
  }, [auth.user]);

  if (utils.loading) return <Loading />;

  return (
    <div className="appbar__container">
      <h1>Tiny URL</h1>
      {auth.user ? (
        <button
          className="button button-appbar"
          onClick={() => dispatch(delUser())}
        >
          Logout
        </button>
      ) : (
        <a
          className="button button-appbar"
          target="_blank"
          href="https://auth.shanmukeshwar.me"
        >
          Login
        </a>
      )}
    </div>
  );
};

export default Appbar;
