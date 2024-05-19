import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  //Get All Products
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
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={`/api/v1/products/get-product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
