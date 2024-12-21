import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MeListCourses.css';

const UserCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    //const user_id = 'U003'; // Thay bằng user ID thật (hoặc lấy từ token)

    useEffect(() => {
        // Gọi API để lấy danh sách khóa học của user
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/me/list`);
                setCourses(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách khóa học:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="user-courses">
            <h2>Danh sách khóa học bạn đã đăng</h2>
            {courses.length === 0 ? (
                <p style={{textAlign: "center"}}>Bạn chưa đăng khóa học nào.</p>
            ) : (
                <div className="course-list">
                    {courses.map((course) => (
                        <div className="course-item" key={course.course_id}>
                            <img src={course.cover_image} alt={course.title} className="course-image" />
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <p><strong>Giá:</strong> {course.price} $</p>
                                <p><strong>Trạng thái:</strong> {course.status}</p>
                            </div>
                            <div className="course-actions">
                                <button onClick={() => 
                                    navigate(
                                        `/lesson/${course.title.replace(/#/g, '').replace(/\s+/g, '-').toLowerCase()}/create?course_id=${course.course_id}`
                                    )}>Đăng bài học
                                </button>
                                <button onClick={() => 
                                    navigate(
                                        `/lesson/${course.title.replace(/#/g, '').replace(/\s+/g, '-').toLowerCase()}/me/list?course_id=${course.course_id}`
                                    )}>Chi tiết
                                </button>
                                <button onClick={() => navigate('/course/update')}>Sửa</button>
                                <button onClick={() => navigate('/course/delete')}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserCourses;
