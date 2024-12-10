import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CourseList.css';
import defaultImg from '../../assets/images/cover-eduverse.jpg';

const CourseList = () => {
    const [courses, setCourses] = useState([]); // State để lưu danh sách khóa học
    const [currentPage, setCurrentPage] = useState(1); // State để lưu trang hiện tại
    const itemsPerPage = 6; // Số lượng khóa học trên mỗi trang

    // Gọi API khi component được render
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses/list'); // Gọi API bằng axios
                setCourses(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchCourses(); // Gọi hàm lấy dữ liệu
    }, []);

    // Tính toán danh sách khóa học cần hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

    // Tính tổng số trang
    const totalPages = Math.ceil(courses.length / itemsPerPage);

    // Hàm thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className='course-list'>
            <div className='title-holder'>
                <h2>Danh sách khóa học</h2>
            </div>
            <div className="course-grid">
                {currentCourses.map((course) => (
                    <div className="course-card" key={course.course_id}>
                        <div className="image">
                            <img src={defaultImg} alt="Khóa học" className="course-img" />
                        </div>
                        <div className="content">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                        </div>
                        <div className="card-footer">
                            <span className="price">Gia: {course.price} &</span>
                            <Link to="/" className="btn">Học Ngay</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CourseList;
