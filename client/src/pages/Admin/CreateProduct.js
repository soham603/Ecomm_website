import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantitiy, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // Get All Categories:
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-allcategories");
      if (data?.success) {
        setCategories(data?.categoryall);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle Create Product Function
  const handleCreateProduct = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantitiy);
      productData.append("category", category);
      productData.append("photo", photo);
      const { data } = axios.post('/api/v1/products/create-product', productData);

      if(data?.success){
        toast.error(data?.message);
      } else {
        toast.success('Product Created Sucessfully');
        navigate("/dashboard/admin/products");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Try Again Later");
    }
  }

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create New Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label
                  className="btn btn-outline-secondary col-md-6"
                >
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                      <img src={URL.createObjectURL(photo)} alt="Product Image" height={'200px'} className="img img-responsive"/>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder="Enter Product Name" className="form-control" onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="text" value={description} placeholder="Enter Product Description" className="form-control" onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder="Enter Product Price" className="form-control" onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" value={quantitiy} placeholder="Enter Quantity of Product" className="form-control" onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <div className="mb-3 width-75">
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping Status"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreateProduct}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
    </Layout>
  );
};

export default CreateProduct;
