import React, { useState, useEffect } from "react";
import Layout from '../../../components/layout/layout';
import UserMenu from '../../../components/layout/UserMenu';
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../context/auth";
import { Select } from "antd";

const { Option } = Select;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title={"Your Orders"}>
            <div className="container-fluid p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.map((o, i) => (
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
                                            <td>{o?.status}</td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createAt).fromNow()}</td>
                                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container align-items-start">
                                    {o?.products?.map((p) => (
                                        <div className="row mb-2 p-2 card flex-row align-items-start" style={{ border: '1px solid #ddd', borderRadius: '4px', height: "120px", width: "300px"}} key={p._id}>
                                            <div className="col-md-4" style={{ padding: '5px' }}>
                                                <img
                                                    src={`/api/v1/products/get-product-photo/${p._id}`}
                                                    alt={p.name}
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="col-md-8" style={{ padding: '5px' }}>
                                                <p style={{ fontSize: '14px', margin: '0' }}><strong>Name:</strong> {p.name}</p>
                                                <p style={{ fontSize: '14px', margin: '0' }}><strong>Description:</strong> {p.description.substring(0, 30)}</p>
                                                <p style={{ fontSize: '14px', margin: '0' }}><strong>Price:</strong> {p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="footer-spacing" style={{ marginBottom: '70px' }}>
                {/* Optional footer spacing */}
            </div>
        </Layout>
    );
};

export default Orders;
