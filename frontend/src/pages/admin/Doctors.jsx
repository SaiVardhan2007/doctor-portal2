import React from 'react'
import { useState, useEffect} from 'react' 
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios'

export default function Doctors() {
    const [doctors, setDoctors] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const getAllDoctors = async () => {
        setLoading(true)        
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get('http://localhost:4000/api/admin/get-all-doctors', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            setDoctors(response.data)
        }
        catch(error){
            console.log("error while fetching doctors", error);
            message.error("Failed to fetch doctors")
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
            const response = await axios.delete(`http://localhost:4000/api/admin/delete-doctor/${_id}`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            message.success("Doctor deleted successfully")
            getAllDoctors()
        }
        catch(err){
            console.log("error while deleting doctor", err);
            message.error("Failed to delete doctor")
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
            const response = await axios.post('http://localhost:4000/api/admin/add-doctor', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            message.success("Doctor added successfully");
            setIsModalVisible(false); 
            form.resetFields();       
            getAllDoctors();          
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
                footer={null}
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