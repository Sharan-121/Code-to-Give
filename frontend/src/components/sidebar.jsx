import SideBarOption from "./sidebar-option";

import dashboardIcon from "../assets/dashboard_icon.png"
import activityIcon from "../assets/activity_icon.png"
import avatarProfileIcon from '../assets/avatar_profile_icon.png'

const SideBar = () => {
    return (
        <div className="sidebar">
            <SideBarOption icon={dashboardIcon} title={"Dashboard"} />
            <SideBarOption icon={activityIcon} title={"Activities"} />
            <SideBarOption icon={avatarProfileIcon} title={"People"} />
        </div>
    )
}

export default SideBar;