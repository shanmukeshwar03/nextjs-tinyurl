import Notification from "components/Notification";
import Appbar from "components/Appbar";
import store from "redux/store";
import { Provider } from "react-redux";
import "styles/globals.css";
import "styles/index.css";
import "styles/notification.css";
import "styles/toast.css";
import "styles/loading.css";
import "styles/dashboard.css";
import "styles/form.css";
import "styles/body.css";
import "styles/appbar.css";
import "styles/utils.css";
import "styles/app.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }) => {
  return (
    <div className="app__container">
      <Provider store={store}>
        <Appbar />
        <Component {...pageProps} />
        <Notification />
      </Provider>
    </div>
  );
};

export default App;
