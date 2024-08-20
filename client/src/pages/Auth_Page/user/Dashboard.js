import React from 'react';
import Layout from '../../../components/layout/layout';
import UserMenu from '../../../components/layout/UserMenu';
import "../../../styles/category_indi.css";
import { useAuth } from '../../../context/auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"User Dashboard"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                        <h3>Name: {auth?.user?.name}</h3>
                        <h3>Email: {auth?.user?.email}</h3>
                        <h3>Phone: {auth?.user?.phone}</h3>
                        <h3>Address: {auth?.user?.address}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div className='footer-spacing'>

        </div>
    </Layout>
  )
}

export default Dashboard;