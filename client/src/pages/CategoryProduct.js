// CategoryProduct.js
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/category_indi.css'; // Import the CSS file

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="indi-cat-container">
        <h4>Category - {category?.name}</h4>
        <h6>{products?.length} result found</h6>
      </div>  

      <div className="indi-cat-row">
        {products?.map((p) => (
          <div className="indi-cat-card" key={p._id}>
            <img
              src={`/api/v1/products/get-product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="indi-cat-card-body">
              <div className="indi-cat-card-name-price">
                <h5 className="indi-cat-card-title">{p.name}</h5>
                <h5 className="indi-cat-card-title indi-cat-card-price">
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </h5>
              </div>
              <p className="card-text">
                {p.description.substring(0, 60)}...
              </p>
              <div className="indi-cat-card-name-price">
                <button
                  className="btn btn-info ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-spacing"></div> {/* Space before footer */}
    </Layout>
  );
};

export default CategoryProduct;
