import SideBarOption from "./sidebar-option";
import communityIcon from "../assets/community.png"
import dashboardIcon from "../assets/dashboard_icon.png"
import activityIcon from "../assets/activity_icon.png"
import avatarProfileIcon from '../assets/avatar_profile_icon.png'

const SideBar = () => {
    return (
        <div className="sidebar">
            <SideBarOption icon={dashboardIcon} title={"Dashboard"} redirect={""} />
            <SideBarOption icon={activityIcon} title={"Activities"} redirect={"activities/view"} />
            <SideBarOption icon={avatarProfileIcon} title={"People"} redirect={"beneficiary/add"} />
            <SideBarOption icon={communityIcon} title={"Community"} redirect={"activities/view"} />
        </div>
    )
}

export default SideBar;