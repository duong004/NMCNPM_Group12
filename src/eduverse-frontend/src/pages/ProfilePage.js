
import React, {useContext }  from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { AuthContext } from '../contexts/AuthContext';
import './ProfilePage.css';
// import defaultAvatar from '../assets/images/default_user.jpg';
// import logo from '../assets/images/Footer-OrgLogo.jpg';

const ProfilePage = () => {
    const {user, userInfo, userAvatar} = useContext(AuthContext);
    if (!user || !userAvatar) {
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
            {userInfo.personalInfo.length > 0  && (
                <div>
                    <img src={userAvatar} alt="Avatar" className='profile-avatar' />
                    <p>Email: {user.email}</p>
                    <p>Họ tên: {userInfo.personalInfo[0].full_name}</p>
                    <p>Vai trò: {user.role}</p>
                    <p>Đã xác thực: {user.is_verified ? 'Có' : 'Không'}</p>
                    <p>Thời gian bắt đầu: {new Date(user.created_at).toLocaleString()}</p>
                    <p>Phone: {userInfo.personalInfo[0].phone}</p>
                    <p>Address: {userInfo.personalInfo[0].address}</p>
                    <p>Highest Education: {userInfo.personalInfo[0].highest_education}</p>
                    <p>Date of Birth: {new Date(userInfo.personalInfo[0].date_of_birth).toLocaleString()}</p>
                    <p>Gender: {userInfo.personalInfo[0].gender}</p>
                    <p>Nationality: {userInfo.personalInfo[0].nationality}</p>
                    <p>Bio: {userInfo.personalInfo[0].bio}</p>
                </div>
            )}
            {userInfo.personalInfo.length === 0 && (
                <div>
                    <img src={userAvatar} alt="Avatar" className='profile-avatar' />
                    <p>Email: {user.email}</p>
                    <p>Vai trò: {user.role}</p>
                    <p>Đã xác thực: {user.is_verified ? 'Có' : 'Không'}</p>
                    <p>Thời gian bắt đầu: {new Date(user.created_at).toLocaleString()}</p>
                    <p>No additional personal info available.</p>
                </div>
                    
            )}

            <div>
                <h3>Enrolled Courses:</h3>
                <ul>
                    {userInfo && renderCourses(userInfo.coursesEnrolled)}
                </ul>
            </div>
            <div>
                <h3>Notifications:</h3>
                <ul>
                    {userInfo && renderNotifications(userInfo.notifications)}
                </ul>
            </div>
            <div>
                <h3>Payments:</h3>
                <ul>
                    {userInfo && renderPayments(userInfo.payments)}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
