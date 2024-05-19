import React from 'react'
import Layout from './../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <div className="text-center p-3">
            <h1>Admin Dashboard</h1>
        </div>
        <div className="container-fluid m-3 p-3"> 
          <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                  <h4>Admin Name: {auth?.user?.name}</h4>
                  <h4>Admin Email: {auth?.user?.email}</h4>
                  <h4>Admin Contact: {auth?.user?.phone}</h4>
                  <h4>Admin Address: {auth?.user?.address}</h4>
              </div>
            </div>
          </div>    
        </div>
    </Layout>
  )
}

export default AdminDashboard
