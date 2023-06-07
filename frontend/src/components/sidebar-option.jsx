import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBarOption = (props) => {

    const navigate = useNavigate();
    let [select, setSelect] = useState(0)

    useEffect(() => {
        let currentLocation = window.location.href;
        currentLocation = currentLocation.replace('http://localhost:5173/home/', '');
        if (currentLocation == props.redirect) {
            setSelect(1);
        }
        else {
            setSelect(0);
        }
    }, []);


    function navigatePage(event) {
        event.preventDefault();
        navigate(props.redirect);
    }

    return (
        <div onClick={navigatePage} className="sidebar-option" style={{ bacgroundColor: select ? "dodgerblue" : "white" }}>
            <img src={props.icon} />
            <span>{props.title}</span>
        </div>
    )
}

export default SideBarOption;