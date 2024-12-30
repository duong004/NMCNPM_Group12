import React, { useState, useEffect } from 'react';
import { FaListUl, FaVideo } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LessonShow.css';

const LessonShow = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [materials, setMaterials] = useState({});
    const [assignments, setAssignments] = useState({});
    const [expandedLessons, setExpandedLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const courseId = urlParams.get("course_id");
                const response = await axios.get(
                    `http://localhost:5000/api/lessons/lessons/${courseId}`
                );
                setLessons(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài học: ", error);
            }
        };
        fetchLessons();
    }, []);

    // Lấy tài liệu của tất cả bài học khi lessons thay đổi
    useEffect(() => {
        const fetchAllMaterials = async () => {
            try {
                const materialsData = {};
                for (const lesson of lessons) {
                    const response = await axios.get(
                        `http://localhost:5000/api/materials/materials/${lesson.lesson_id}`
                    );
                    materialsData[lesson.lesson_id] = response.data;
                }
                setMaterials(materialsData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tài liệu:", error);
            }
        };

        if (lessons.length > 0) {
            fetchAllMaterials();
        }
    }, [lessons]);

    useEffect(() => {
        const fetchAllAssignments = async () => {
            try {
                const assignmentsData = {};
                for (const lesson of lessons) {
                    const response = await axios.get(
                        `http://localhost:5000/api/assignments/assignments/${lesson.lesson_id}`
                    );
                    assignmentsData[lesson.lesson_id] = response.data;
                }
                setAssignments(assignmentsData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài tập:", error);
            }
        };
    
        if (lessons.length > 0) {
            fetchAllAssignments();
        }
    }, [lessons]);

    const handleExpandLesson = (lessonId) => {
        setExpandedLessons(prevLessons => {
            if (prevLessons.includes(lessonId)) {
                return prevLessons.filter(id => id !== lessonId);
            } else {
                return [...prevLessons, lessonId];
            }
        });
    };

    const handleMaterialClick = (material, lesson) => {
        if (material.type === 'Tài liệu') {
            window.location.href = material.content_url; // Tải xuống tài liệu
        } else if (material.type === 'Video') {
            navigate(`/material/${lesson.title.replace(/#/g, '').replace(/\s+/g, '-').toLowerCase()}/show?material_id=${material.material_id}`);
        }
    };

    return (
        <div className="lessons-page">
            <h2><FaListUl /> Danh Sách Bài Học</h2>
            {/* <p className="course-content">{courseContent}</p> */}

            {lessons.length === 0 ? (
                <p className="no-lessons">Không có bài học nào trong khóa học này</p>
            ) : (
                <div className='lesson-list'>
                    {lessons.map((lesson) => (
                        <div key={lesson.lesson_id} className="lesson-item">
                            <div className="lesson-header" onClick={() => handleExpandLesson(lesson.lesson_id)}>
                                <div className='lesson-inf'>
                                    <span className="lesson-order">{lesson.lesson_order}.</span>
                                    <span className="lesson-title">{lesson.title}</span>
                                </div>
                                <span className="material-count">{materials[lesson.lesson_id]?.length || 0} tài liệu</span>
                            </div>
                            {expandedLessons.includes(lesson.lesson_id) && (
                                <div>
                                    <div className="assignment-list">
                                    <h2>Danh sách bài tập</h2>
                                        {assignments[lesson.lesson_id]?.length > 0 ? (
                                            assignments[lesson.lesson_id].map((assignment) => (
                                                <div
                                                    key={assignment.assignment_id}
                                                    className="assignment-item"
                                                >
                                                    <div className='assignment-item-content'>
                                                        <Link to={{
                                                            pathname: `/assignment/${lesson.title.replace(/#/g, '').replace(/\s+/g, '-').toLowerCase()}/show`,
                                                            search: `?assignment_id=${assignment.assignment_id}`
                                                        }}> 
                                                            {assignment.title}</Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Không có tài liệu nào.</p>
                                        )}
                                    </div>
                                    <div className="materials-list">
                                        {materials[lesson.lesson_id]?.length > 0 ? (
                                            materials[lesson.lesson_id].map((material) => (
                                                <div
                                                    key={material.material_id}
                                                    className="material-item"
                                                    onClick={() => handleMaterialClick(material, lesson)}
                                                >
                                                    <div className='material-item-content'>
                                                        {material.type === 'Video' ? (
                                                            <><FaVideo /> {material.title}</>
                                                        ) : (
                                                            <div className='material-item-content-container'>
                                                                <div className='material-item-content-item'>
                                                                    <><FaFileAlt /> {material.title}</>
                                                                </div>
                                                                <div className='material-item-content-item'>
                                                                    <Link to={{
                                                                        pathname: `/material/${lesson.title.replace(/#/g, '').replace(/\s+/g, '-').toLowerCase()}/show`,
                                                                        search: `?material_id=${material.material_id}`
                                                                    }} 
                                                                    className="show">Tải về</Link>
                                                                    <Link to={{
                                                                        pathname: `/material/${lesson.title.replace(/#/g, '').replace(/\s+/g, '-').toLowerCase()}/show`,
                                                                        search: `?material_id=${material.material_id}`
                                                                    }} 
                                                                    className="show">Xem trước</Link>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Không có tài liệu nào.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LessonShow;