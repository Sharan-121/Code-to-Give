import SideBarOption from "./sidebar-option";
import communityIcon from "../assets/community_icon.png";
import dashboardIcon from "../assets/dashboard_icon.png";
import activityIcon from "../assets/activity_icon.png";
import avatarProfileIcon from '../assets/avatar_profile_icon.png';
import locationIcon from '../assets/location_icon.png';
import sessionIcon from '../assets/session_icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faList, faUser, faPeopleCarry, faFire, faCalendarPlus, faMap } from '@fortawesome/fontawesome-free-solid'

const SideBar = () => {
    return (
        <div className="sidebar">
            <SideBarOption icon={<FontAwesomeIcon icon={faTable} />} title={"Dashboard"} redirect={""} />
            <SideBarOption icon={<FontAwesomeIcon icon={faList} />} title={"Activities"} redirect={"activities/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faUser} />} title={"Beneficiaries"} redirect={"beneficiary/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faPeopleCarry} />} title={"Communities"} redirect={"communities/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faFire} />} title={"Sessions"} redirect={"sessions/add"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faCalendarPlus} />} title={"Attendance"} redirect={"attendance/add"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faMap} />} title={"Locations"} redirect={"locations/view"} />
        </div>
    )
}

export default SideBar;