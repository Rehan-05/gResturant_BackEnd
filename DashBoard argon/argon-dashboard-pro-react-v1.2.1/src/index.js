/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// react library for routing
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.0";

import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import AuthLayout from "layouts/Auth.js";
// import IndexView from "views/Index.js";
import {Provider} from 'react-redux';
import ConfigureStore from './views/Redux/store';
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

const store = ConfigureStore();
function AuthRoute({ children, ...rest }) {
  debugger
  const user = useSelector(({ LoginUser }) => LoginUser?.auth);
  const onlyChild = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}
function PrivateRoute({ children, ...rest }) {
  const user = useSelector(({ LoginUser }) => LoginUser.auth);
  // const history = useHistory();
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  return (
    <>
    
    </>
  );
}
const App = () => {
  return(
   
  <BrowserRouter>
    <Switch>
    <AuthRoute path="/admin">
        <AdminLayout />
      </AuthRoute>
      <Route path="/rtl"  >
      <RTLLayout />
      </Route>
      <Route  path={"/"} >
      <AuthLayout  />
      </Route>
      {/* <Route path="/" render={(props) => <IndexView {...props} />} /> */}
      <Redirect from="/" to="/" />  
    </Switch>
  </BrowserRouter>
  
  )
}

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById("root")
);
