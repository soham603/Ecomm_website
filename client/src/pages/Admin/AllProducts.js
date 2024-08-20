import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../styles/all_products.css"; // Ensure you have a CSS file for additional styling

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-allproducts");
      setProducts(data.productsall);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong! Plz Try Again");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3 admin-menu-container">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4" style={{marginTop : '15px'}}>All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`} className="product-link">
                <div className="card m-3" style={{ width: "18rem", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                  <img
                    className="card-img-top"
                    src={`/api/v1/products/get-product-photo/${p._id}`}
                    alt={p.name}
                    style={{ height: "200px", objectFit: "fill" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{p.name}</h5>
                    <p className="card-text descppp" style={{ fontSize: "0.875rem", color: "#555" }}>{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-spacing">

      </div>
    </Layout>
  );
};

export default AllProducts;
