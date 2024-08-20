import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import "../styles/productDetailsStyles.css"; // Ensure you have a CSS file for additional styling

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-singleproduct/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart
  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
  };

  return (
    <Layout>
      <div className="container product-details my-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/products/get-product-photo/${product._id}`}
              className="img-fluid rounded"
              alt={product.name}
              style={{ height: "400px", width: "100%", objectFit: "fill", border:"1px solid black",borderRadius : "20px" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-start">
            <h1 className="mb-4">{product.name}</h1>
            <p className="lead mb-4">{product.description}</p>
            <h4 className="mb-3">
              Price: {product?.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h4>
            <h5 className="mb-4">Category: {product?.category?.name}</h5>
            <button
              className="btn btn-secondary"
              onClick={addToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="similar-products">
          <h3>Similar Products ▶</h3>
          {relatedProducts.length < 1 ? (
            <p className="text-center">No Similar Products found</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-start">
              {relatedProducts?.map((p) => (
                <div className="card m-2" key={p._id} style={{ width: "18rem", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                  <img
                    src={`/api/v1/products/get-product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "180px", objectFit: "fill", border : "1px, solid black" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{p.name}</h5>
                    <p className="card-text" style={{ fontSize: "0.875rem", color: "#555" }}>
                      {p.description.substring(0, 60)}...
                    </p>
                    <h5 className="card-price" style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}>
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                    <div className="d-flex justify-content-between mt-2">
                      <button
                        className="btn btn-info"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
