import React from 'react';
import { useNavigate } from 'react-router-dom';
import organizationLogo from '../../assets/organization_logo.svg';
import { FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

const StaffHeader = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleHelp = () => {
        navigate('/staff/faq')
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '16px',
    };

    const logoutIconStyle = {
        marginRight: '8px',
    };
    const helpIconStyle = {
        marginRight: '8px'
    }

    return (
        <div className="header" style={headerStyle}>
            <img src={organizationLogo} alt="Organization Logo" />
            <button className="help-button" onClick={handleHelp} >
                <FaQuestionCircle style={helpIconStyle} />
                Help
            </button>
            <button className='logout-button' onClick={handleLogout}>
                <FaSignOutAlt style={logoutIconStyle} />
                Logout
            </button>
        </div>
    );
};

export default StaffHeader;