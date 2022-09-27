import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "./actions/productsActions";
import Product from "./Product/product";
import Loader from "./layout/loader";
import { useAlert } from "react-alert";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.product
  );
  const alert = useAlert();
  useEffect(() => {
    if (error) return alert.error(error);
    dispatch(getAllProducts());
  }, [dispatch, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy our best products"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
