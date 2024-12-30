// // Định nghĩa các route yêu cầu người dùng phải đăng nhập để truy cập. 
// // Nếu người dùng chưa đăng nhập, họ sẽ được chuyển hướng đến trang đăng nhập.

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;


//   const isAuthenticated = true; // Thay thế logic xác thực thực tế ở đây
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;