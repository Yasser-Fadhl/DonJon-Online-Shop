import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Home from "./components/home";
import ProductDetails from "./components/Product/productDetails";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <div className="container container-fluid">
            <Route path="/" component={Home} exact />
            <Route path="/products/:id" component={ProductDetails} exact />
          </div>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
