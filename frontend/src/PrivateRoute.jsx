import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login.component';
import Home from './components/home.component';

const PrivateRoute = (props) => {
    return (
        <Routes>
            {props.isAuthenticated ? (
                <Route exact path="/home/*" element={<Home />} />
            ) : (
                <Route exact path="/login" element={<Login />} />
            )
            }
        </Routes>
    );
};

export default PrivateRoute;
