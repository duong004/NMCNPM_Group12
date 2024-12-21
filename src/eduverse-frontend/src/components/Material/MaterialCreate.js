import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MaterialCreate.css'
const MaterialCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        type: '',
        content_url: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const lessonId = urlParams.get('lesson_id');

        try {
            const response = await axios.post('http://localhost:5000/api/materials/create', {
                ...formData,
                lesson_id: lessonId,
            });

            console.log('Response:', response.data);
            alert('Bài học đã được gửi thành công!');
            navigate('/course/list');

            setFormData({
                title: '',
                type: '',
                content_url: '',
            });
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            alert(`Có lỗi xảy ra: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="submit-course-form">
            <h2>Thêm Tài Liệu</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nội dung:</label>
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
                                className='radio-label-input'
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
                    <label>Link:</label>
                    <input
                        type="text"
                        name="content_url"
                        value={formData.content_url}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Thêm tài liệu</button>
            </form>
        </div>
    );
}

export default MaterialCreate;