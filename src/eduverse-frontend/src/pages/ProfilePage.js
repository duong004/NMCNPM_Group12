// import React, { useEffect, useState } from 'react';
// import useUser from '../contexts/userContext';
// import axios from 'axios';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

// const ProfilePage = () => {
//     const { user, setUser } = useUser();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setLoading(false);
//                 return <div>Token is false.</div>;
//             }
//             try {
//                 const response = await axios.get('http://localhost:5000/api/profile', {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setUser(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, [setUser]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <div>Please log in to view your profile.</div>;
//     }

//     return (
//         <div>
//             <Header/>
//             <h1>Profile Page</h1>
//             <img src={user.avatar} alt="Avatar" />
//             <h2>{user.name}</h2>
//             <h3>Enrolled Courses:</h3>
//             <ul>
//                 {user.courses.map(course => (
//                     <li key={course.id}>{course.name}</li>
//                 ))}
//             </ul>
//             <Footer/>
//         </div>
//     );
// };

// export default ProfilePage;

// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(null);
    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem('user');
        const storedPersonalInfo = localStorage.getItem('userData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if( storedPersonalInfo ) {
            console.log(storedPersonalInfo);
            setPersonalInfo(JSON.parse(storedPersonalInfo));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }
    const renderCourses = (courses) => {
        return courses.map(course => (
            <li key={course.enrollment_id}>
                ID: {course.course_id}, Enrolled At: {new Date(course.enrolled_at).toLocaleString()}, Status: {course.status}
            </li>
        ));
    };

    const renderNotifications = (notifications) => {
        return notifications.map(notification => (
            <li key={notification.notification_id}>
                {notification.message} (Sent At: {new Date(notification.sent_at).toLocaleString()}, Read: {notification.is_read ? 'Yes' : 'No'})
            </li>
        ));
    };

    const renderPayments = (payments) => {
        return payments.map(payment => (
            <li key={payment.payment_id}>
                Course ID: {payment.course_id}, Amount: {payment.amount}, Payment Date: {new Date(payment.payment_date).toLocaleString()}
            </li>
        ));
    };

    return (
        <div>
            <Header />
            <h1>Thông tin cá nhân</h1>
            {personalInfo && personalInfo.personalInfo && (
                <div>
                    <img src={personalInfo.personalInfo[0].profile_picture} alt="Avatar" />
                    <p>Email: {user.email}</p>
                    <p>Họ tên: {personalInfo.personalInfo[0].full_name}</p>
                    <p>Vai trò: {user.role}</p>
                    <p>Đã xác thực: {user.is_verified ? 'Có' : 'Không'}</p>
                    <p>Thời gian bắt đầu: {new Date(user.created_at).toLocaleString()}</p>
                    <p>Phone: {personalInfo.personalInfo[0].phone}</p>
                    <p>Address: {personalInfo.personalInfo[0].address}</p>
                    <p>Highest Education: {personalInfo.personalInfo[0].highest_education}</p>
                    <p>Date of Birth: {new Date(personalInfo.personalInfo[0].date_of_birth).toLocaleString()}</p>
                    <p>Gender: {personalInfo.personalInfo[0].gender}</p>
                    <p>Nationality: {personalInfo.personalInfo[0].nationality}</p>
                    <p>Bio: {personalInfo.personalInfo[0].bio}</p>
                </div>
            )}
            {!personalInfo && <p>No additional personal info available.</p>}

            <div>
                <h3>Enrolled Courses:</h3>
                <ul>
                    {personalInfo && renderCourses(personalInfo.coursesEnrolled)}
                </ul>
            </div>
            <div>
                <h3>Notifications:</h3>
                <ul>
                    {personalInfo && renderNotifications(personalInfo.notifications)}
                </ul>
            </div>
            <div>
                <h3>Payments:</h3>
                <ul>
                    {personalInfo && renderPayments(personalInfo.payments)}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
