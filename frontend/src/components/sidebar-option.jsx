const SideBarOption = (props) => {
    return (
        <div className="sidebar-option">
            <img src={ props.icon } />
            <span>{ props.title }</span>
        </div>
    )
}

export default SideBarOption;