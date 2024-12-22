import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MaterialCreate.css';

const MaterialCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        type: '',
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
            alert("Vui lòng chọn một file!");
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
            alert('Tài liệu đã được thêm thành công!');
            navigate('/course/list');

            setFormData({
                title: '',
                type: '',
            });
            setFile(null);
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            alert(`Có lỗi xảy ra: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="submit-course-form">
            <h2>Thêm Tài Liệu</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Tên tài liệu:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <div className="radio-group">
                        <label>Loại tài liệu:</label>
                        <label className="radio-label">
                            <div>Tài liệu</div>
                            <input
                                type="radio"
                                name="type"
                                value="Tài liệu"
                                checked={formData.type === 'Tài liệu'}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="radio-label">
                            <div>Video</div>
                            <input
                                className="radio-label-input"
                                type="radio"
                                name="type"
                                value="Video"
                                checked={formData.type === 'Video'}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Chọn file:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="*/*"
                        required
                    />
                </div>

                <button type="submit">Thêm tài liệu</button>
            </form>
        </div>
    );
};

export default MaterialCreate;
