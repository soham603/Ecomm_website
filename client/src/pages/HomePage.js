import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { Prices } from "./../components/layout/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get All Categories:
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-allcategories");
      if (data?.success) {
        setCategories(data.categoryall);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
      console.log(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setProducts([...products, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // handle Filter fnc
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(all);
  };

  useEffect(() => {
    if (checked.length === 0 || radio.length === 0) getAllProducts();
  }, [checked.length, radio.length]); // Corrected 'lenght' to 'length'

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  // get filtered products
  const filterProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-filters", {
        params: {
          checked,
          radio,
        },
      });
      setProducts(data?.products);
      console.log(data?.lenghtfil);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <div>
            <h6 className="text-center">Filter By Categories</h6>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-center">Filter By Price</h6>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src={`/api/v1/products/get-product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart,p]));
                      toast.success("Item Added to Cart");
                    }}
                  >
                    {" "}
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
