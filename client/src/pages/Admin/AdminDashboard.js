import React from 'react';
import Layout from './../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/auth';
import '../../styles/adminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-db-header text-center p-3">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-db-container container-fluid m-3 p-3">
        <div className="row row-adb">
          <div className="admin-db-menu col-md-3">
            <AdminMenu />
          </div>
          <div className="admin-db-content col-md-9">
            <div className="admin-db-card card w-75 p-4 shadow-sm">
              <h4 className="admin-db-info">
                <span className="admin-db-label">Admin Name:</span> {auth?.user?.name}
              </h4>
              <h4 className="admin-db-info">
                <span className="admin-db-label">Admin Email:</span> {auth?.user?.email}
              </h4>
              <h4 className="admin-db-info">
                <span className="admin-db-label">Admin Contact:</span> {auth?.user?.phone}
              </h4>
              <h4 className="admin-db-info">
                <span className="admin-db-label">Admin Address:</span> {auth?.user?.address}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-space'>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
