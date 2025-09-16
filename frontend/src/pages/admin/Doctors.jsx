import React from 'react'
import { useState, useEffect} from 'react' 
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios'
import { set } from 'mongoose';

export default function Doctors() {
    const [doctors, setDoctors] = useState([])
    const [visibility, setvisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const getAllDoctors = async () => {
        setLoading(true)        
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get('/api/v1/admin/get-all-doctors', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            if (response.data.success){
                console.log('response data', response.data.doctors);
                setDoctors(response.data.doctors)
            }else{
                console.log("error while fetching doctors")
                message.error(response.data.message)
            }

        }
        catch(error){
            console.log("error while fetching doctors", error);
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllDoctors();
    }, []);

    const handleDelete = async (_id) =>{
        setLoading(true)
        try{
            const token = localStorage.getItem("token")
            const response = await axios.delete(`/api/v1/admin/delete-doctor/${_id}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if (response.data.success){
                message.success(response.data.message)
                getAllDoctors()
            }else{
                message.error(response.data.message)
            }
        }
        catch(err){
            console.log("error while deleting doctor", err);
        }finally{
            setLoading(false)
        }
    }

      
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); 
  };
  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/v1/admin/add-doctor', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        message.success(response.data.message);
        setIsModalVisible(false); 
        form.resetFields();       
        getAllDoctors();          
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      message.error('Something went wrong.');
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: ['userId', 'name'], 
      key: 'name',
    },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Email',
      dataIndex: ['userId', 'email'],
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Doctors List</h2>
        <Button type="primary" onClick={showModal}>
          Add Doctor
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={doctors}
        rowKey={(record) => record._id} 
        loading={loading}
        bordered
      />

      <Modal
        title="Add New Doctor"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // We'll use the form's button for submission
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the doctor\'s name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input a password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Specialization" name="specialization" rules={[{ required: true, message: 'Please input the specialization!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Doctor
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
