import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
// Access
import Login from './pages/access/Login';
import Register from './pages/access/Register';
import PasswordReset from './pages/access/PasswordReset';
import PasswordRecovery from './pages/access/PasswordRecovery';
import Logout from './pages/access/Logout';

// UserArea
import User from './pages/userArea/User';
import Profile from './pages/userArea/pages/Profile';
import Settings from './pages/userArea/pages/Settings';
import Bonuses from './pages/userArea/pages/Bonuses';
import Transactions from './pages/userArea/pages/Transactions';

// Components
import Topbar from './components/Topbar';
import Lateralbar from './components/Lateralbar';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

const App = () => {
    const isAuthenticated = () => {
        return !!sessionStorage.getItem('token');
      };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Home Zone */}
                    <Route path="/" element={<><Home /><Topbar /><Footer/></>} />

                    {/* Access Zone */}
                    <Route path="/access">
                        <Route path="login" element={isAuthenticated() ? <Navigate to="/account/user" /> : <Login />} />
                        <Route path="register" element={isAuthenticated() ? <Navigate to="/account/user" /> : <Register />} />
                        <Route path="passwordrecovery" element={<PasswordRecovery />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>

                    <Route path="/reset/:token" element={<PasswordReset />} />

                    {/* Account Zone */}
                    <Route path="/account" element={<PrivateRoute />}>
                        <Route path="user" element={<><Lateralbar /><User /></>} />
                        <Route path="profile" element={<><Lateralbar /><Profile /></>} />
                        <Route path="settings" element={<><Lateralbar /><Settings /></>} />
                        <Route path="bonuses" element={<><Lateralbar /><Bonuses /></>} />
                        <Route path="transactions" element={<><Lateralbar /><Transactions /></>} />
                    </Route>

                    {/* Casino Zone (Placeholder for future implementation) */}
                    <Route path="/casino" element={<><Topbar /><Footer/></>} >
                        {/* <Route index element={<Casino />} /> */}
                        {/* Add more casino routes as needed */}
                    </Route>

                    {/* Admin Zone (Placeholder for future implementation) */}
                    <Route path="/admin" element={<PrivateRoute />}>
                        {/* <Route index element={<AdminDashboard />} /> */}
                        {/* Add more admin routes as needed */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;