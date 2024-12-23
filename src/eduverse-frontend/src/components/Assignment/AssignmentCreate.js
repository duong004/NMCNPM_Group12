
import './AssignmentCreate.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from '../toast-message/toast-message'

const AssignmentCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        points: '',
        max_attemps: '',
    });

    const [file, setFile] = useState();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const lessonId = urlParams.get('lesson_id');

        // Kiểm tra xem file đã được chọn chưa
        if (!file) {
            toast({
                title: "Lỗi!",
                message: "Vui lòng chọn 1 file!",
                type: "error",
                duration: 5000,
            });
            return;
        }

        try {
            const fileData = new FormData();

            // Thêm các trường từ `formData` vào `FormData`
            Object.keys(formData).forEach((key) => {
                fileData.append(key, formData[key]);
            });

            // Thêm `lesson_id`
            fileData.append('lesson_id', lessonId);

            // Thêm file
            fileData.append('file', file);

            const response = await axios.post('http://localhost:5000/api/materials/materials', fileData);

            console.log('Response:', response.data);
            // alert('Tài liệu đã được thêm thành công!');
            toast({
                title: "Thành công!",
                message: "Tài liệu đã được thêm thành công!",
                type: "success",
                duration: 3000,
            });
            setTimeout(() => {
                navigate(-1);
            }, 1000);

            setFormData({
                title: '',
                description: '',
                due_date: '',
                points: '',
                max_attemps: '',
            });
            setFile(null);
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            toast({
                title: "Thất bại!",
                message: `Có lỗi xảy ra: ${
                    error.response?.data?.message || error.message
                }`,
                type: "error",
                duration: 5000,
            });
        }
    };
    return (
        <div className="assignment-create">
            <h2>Create New Assignment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" rows="4" cols="50" value={formData.description} onChange={handleChange} required />
                </label>
                <label>
                    Due Date:
                    <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} required />
                </label>
                <label>
                    Points:
                    <input type="number" name="points" value={formData.points} onChange={handleChange} required />
                </label>
                <label>
                    Max Attempts:
                    <input type="number" name="max_attempts" value={formData.max_attempts} onChange={handleChange} required />
                </label>
                <label>
                    Upload File:
                    <input type="file" multiple onChange={handleFileChange} required />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AssignmentCreate;