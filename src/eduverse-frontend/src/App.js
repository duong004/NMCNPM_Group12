import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MeListCoursesPage from './pages/MeListCoursesPage';
import CoursesListPage from './pages/CoursesListPage';
import CoursesCreatePage from './pages/CoursesCreatePage';
import LessonCreatePage from './pages/LessonCreatePage';
import LessonShowPage from './pages/LessonShowPage';
import MeListLessonPage from './pages/MeListLessonPage';
import MaterialCreatePage from './pages/MaterialCreatePage';
import MaterialShowPage from './pages/MaterialShowPage';
import AssignmentCreatePage from './pages/AssignmentCreatePage';
import AssignmentShowPage from './pages/AssignmentShowPage';
import LoginPage from './components/Auth/Login';
import RegisterPage from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import PasswordResetSentPage from './components/Auth/PasswordResetSent';
import ResetPassword from './components/Auth/ResetPassword';
import PasswordResetSuccessPage from './components/Auth/PasswordResetSuccess';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';
import MyLearning from './pages/MyLearningPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/me/list" element={<MeListCoursesPage />} />
        <Route path="/course/list" element={<CoursesListPage />} />
        <Route path="/course/create" element={<CoursesCreatePage />} />
        <Route path="/lesson/:courseName/create" element={<LessonCreatePage />} />
        <Route path="/lesson/:courseName/show" element={<LessonShowPage />} />
        <Route path="/lesson/:courseName/me/list" element={<MeListLessonPage />} />
        <Route path="/material/:lessonName/create" element={<MaterialCreatePage />} />
        <Route path="/material/:lessonName/show" element={<MaterialShowPage />} />
        <Route path="/assignment/:lessonName/create" element={<AssignmentCreatePage />} />
        <Route path="/assignment/:lessonName/show" element={<AssignmentShowPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset-sent" element={<PasswordResetSentPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/password-reset-success" element={<PasswordResetSuccessPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/offline" element={<MaintenancePage />} />
        <Route path="/my-learning" component={MyLearning} />
      </Routes>
    </Router>
  );
};

export default App;


/*
import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/homepage' element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/