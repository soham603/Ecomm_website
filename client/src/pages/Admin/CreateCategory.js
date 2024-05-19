import React,{useState, useEffect} from 'react';
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from './../../components/Froms/CategoryForm';
import { Button, Modal } from 'antd';
import { get } from 'mongoose';

const CreateCategory = () => {
  const [categories,setCategories] = useState([]); // List to store categoroes on fetch , [] = initial Empty
  const [name,setName] = useState("");

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [selected,setSelected] = useState(null);
  const [upDatedName, setUpdatedName] = useState("");

  //handleSubmit
  const handleSubmit = async(e) => {
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success)
      {
        toast.success(`${name} is Created`);
        getAllCategories();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Creating Category")
    }
  }

  // Get All Categories:
  const getAllCategories = async () => {
    try {
       
      const {data} = await axios.get("/api/v1/category/get-allcategories");
      if (data.success)
      {
        setCategories(data.categoryall);
      }

    } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong in Getting Categories');      
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  // Update category
  const handleUpdate = async(e ) => {
    e.preventDefault();
    try {
      
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:upDatedName});
      if(setUpdatedName == null)
      {
          toast.error('Plz Enter Upadted Value');
      }
      if(data.success)
      {
        toast.success(`Category ${selected.name} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      }
      else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Something went wrong! Try Again");
    } 
  }

  // Delete Category
  const handledelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-categories/${pId}`);
      if(data.success)
      {
        toast.success(`Category is Deleted!`);
        getAllCategories();
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Try Again");
    } 
  }

  return (
    <Layout title={"Dashboard - Create Category"}>
    <div className="container-fluid m-3 p-3">     
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Manage Categories</h1>
                <div className= "p-3 w-50">
                <CategoryForm handleSubmit={handleSubmit} value = {name} setValue={setName}/>
                </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {categories?.map(c => (
                        <>
                         <tr>
                            <td key={c._id}>{c.name}</td>
                        <td>
                            <button className='btn btn-primary ms-2' onClick = {() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>      
                            <button className='btn btn-danger ms-2' onClick={() => {handledelete(c._id)}}>Delete</button>      

                        </td>
                  </tr>
                  </>
                    ))}
                </tbody>
              </table>
            </div>
            <Modal
                title="Title"
                footer = {null}  
                onOk={handleOk}
                confirmLoading={confirmLoading}
                visible = {visible}
                onCancel= {() => setVisible(false)}
                >
                <CategoryForm value={upDatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                
              </Modal>            
            </div>
        </div>
    </div>    
    </Layout>
  )
}

export default CreateCategory
