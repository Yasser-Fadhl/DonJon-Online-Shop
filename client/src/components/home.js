import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, clearError } from "./actions/productsActions";
import Product from "./Product/product";
import Loader from "./layout/loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import categories from "../data/categories";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match, history }) => {
  const [price, setPrice] = useState([1, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const {
    loading,
    products,
    productsCount,
    resPerPage,
    error,
    filteredProductsCount,
  } = useSelector((state) => state.product);
  const alert = useAlert();
  const keyword = match.params.keyword;
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    dispatch(getAllProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, currentPage, keyword, price, category]);

  function setCurrentPageNo(page) {
    setCurrentPage(page);
  }
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
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 bt-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: "1$",
                          1000: "1000$",
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormtter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="mt-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
