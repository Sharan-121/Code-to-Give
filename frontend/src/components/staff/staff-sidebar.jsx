import SideBarOption from "../sidebar-option";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faTable, faList, faUser, faPeopleCarry, faFire, faCalendarPlus, faMap, faDatabase, faImage } from '@fortawesome/fontawesome-free-solid'

const StaffSideBar = () => {
    return (
        <div className="sidebar">
            <SideBarOption icon={<FontAwesomeIcon icon={faUser} />} title={"Beneficiaries"} redirect={"beneficiary/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faFire} />} title={"Sessions"} redirect={"sessions/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faCalendarPlus} />} title={"Attendance"} redirect={"attendance/add"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faComment} />} title={"Feedback"} redirect={"feedback/add"} />
        </div>
    )
}

export default StaffSideBar;