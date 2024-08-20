import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-update/${orderId}`, {
        status: value,
      });
      toast.success("Status Changes Successfully");
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
      <div className="col-md-3" style={{marginTop: '70px', paddingLeft : '10px'}}>
            <AdminMenu />
          </div>
        <div className="col-md-9" style={{marginTop : '10px'}}>
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow mb-4" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                    {o?.products?.map((p) => (
                      <tr key={p._id}>
                        <td colSpan="6">
                          <div className="row mb-2 p-2 card flex-row align-items-center" style={{ border: '1px solid #ddd', borderRadius: '4px', marginLeft: '10px'}}>
                            <div className="col-md-4" style={{ padding: '5px' }}>
                              <img
                                src={`/api/v1/products/get-product-photo/${p._id}`}
                                alt={p.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                              />
                            </div>
                            <div className="col-md-8" style={{ padding: '5px' }}>
                              <p style={{ fontSize: '14px', margin: '0' }}><strong>Name:</strong> {p.name}</p>
                              <p style={{ fontSize: '14px', margin: '0' }}><strong>Price:</strong> {p.price}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer-spacing" style={{marginBottom : '70px'}}>

      </div>
    </Layout>
  );
};

export default AdminOrders;
