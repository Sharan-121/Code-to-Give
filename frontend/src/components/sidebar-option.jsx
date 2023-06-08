import { useNavigate } from "react-router-dom";

const SideBarOption = (props) => {

    const navigate = useNavigate();

	function navigatePage(event){
		event.preventDefault();
        navigate(props.redirect);
	}

    return (
        <div onClick={ navigatePage } className="sidebar-option">
            <img src={ props.icon } />
            <span>{ props.title }</span>
        </div>
    )
}

export default SideBarOption;

