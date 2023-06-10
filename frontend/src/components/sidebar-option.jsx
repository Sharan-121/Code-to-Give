import React from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';

const SidebarOption = ({ icon, title, redirect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === redirect;

  const navigatePage = (event) => {
    event.preventDefault();
    navigate(redirect);
  };

  return (
    <NavLink
      to={redirect}
      className={`sidebar-option ${isActive ? 'active' : ''}`}
      onClick={navigatePage}
      style={{ fontSize: '16px', fontFamily: 'Montserrat'}}
    >
      <span className="img">{icon}</span>
        <span className="span">{title}</span>
   </NavLink>
  );
};

export default SidebarOption;
