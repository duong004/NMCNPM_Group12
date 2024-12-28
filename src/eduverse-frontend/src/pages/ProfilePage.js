// import React, { useEffect, useState } from 'react';
// import useUser from '../contexts/userContext';
// import axios from 'axios';
// import Header from '../components/Common/Header';
// import Footer from '../components/Common/Footer';

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

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Thông tin cá nhân</h1>
            <p>Email: {user.email}</p>
            <p>Họ tên: {user.name}</p>
            <p>Role: {user.is_verified}</p>
            <p>Thời gian bắt đầu: {user.created_at}</p>
            {/* Hiển thị các thông tin khác của người dùng */}
        </div>
    );
};

export default ProfilePage;
