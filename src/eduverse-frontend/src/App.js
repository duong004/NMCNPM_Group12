import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={HomePage} />
        <PublicRoute path="/courses" component={CoursesPage} />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} />
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PublicRoute path="/reset-password/:token" component={ResetPassword} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/admin" component={AdminPage} />
        <Route path="/maintenance" component={MaintenancePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;