import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
import ProductDetails from "./components/Product/productDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useDispatch } from "react-redux";
import { loadUser } from "./components/actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/protectedRoute";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <>
            <div className="container container-fluid">
              <Route path="/" component={Home} exact />
              <Route path="/search/:keyword" component={Home} />
              <Route path="/products/:id" component={ProductDetails} exact />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <ProtectedRoute path="/me" component={Profile} exact />
            </div>
          </>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
