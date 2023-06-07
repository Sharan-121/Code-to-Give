import SideBarOption from "./sidebar-option";
import communityIcon from "../assets/community_icon.png";
import dashboardIcon from "../assets/dashboard_icon.png";
import activityIcon from "../assets/activity_icon.png";
import avatarProfileIcon from '../assets/avatar_profile_icon.png';
import locationIcon from '../assets/location_icon.png';

const SideBar = () => {
    return (
        <div className="sidebar">
            <SideBarOption icon={dashboardIcon} title={"Dashboard"} redirect={""} />
            <SideBarOption icon={activityIcon} title={"Activities"} redirect={"activities/view"} />
            <SideBarOption icon={avatarProfileIcon} title={"People"} redirect={"beneficiary/add"} />
            <SideBarOption icon={communityIcon} title={"Communities"} redirect={"communities/view"} />
            <SideBarOption icon={communityIcon} title={"Sessions"} redirect={"sessions/add"} />
            <SideBarOption icon={avatarProfileIcon} title={"Attendance"} redirect={"attendance/add"} />
            <SideBarOption icon={locationIcon} title={"Locations"} redirect={"locations/view"} />
        </div>
    )
}

export default SideBar;