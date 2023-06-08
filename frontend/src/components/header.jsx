import React from 'react';
import { useNavigate } from 'react-router-dom';
import organizationLogo from '../assets/organization_logo.svg';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
     const navigate = useNavigate();
    const handleLogout = () => {
       localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '16px', 
    };

    const logoutButtonStyle = {
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight:'10px'
    };

    const logoutIconStyle = {
        marginRight: '8px',
    };

    return (
        <div className="header" style={headerStyle}>
            <img src={organizationLogo} alt="Organization Logo" />
            <button style={logoutButtonStyle} onClick={handleLogout}>
                <FaSignOutAlt style={logoutIconStyle} />
                Logout
            </button>
        </div>
    );
};

export default Header;
