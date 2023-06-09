import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarOption = (props) => {

    const navigate = useNavigate();
    let [select, setSelect] = useState(0);

    function navigatePage(event) {
        event.preventDefault();
        navigate(props.redirect);
    }

    return (
        <div onClick={navigatePage} className="sidebar-option"  style={{ fontSize: '16px', fontFamily: 'Montserrat'}}>
            <span className="img">{props.icon}</span>
            <span className="span">{props.title}</span>
        </div>
    )
}

export default SideBarOption;