import SideBarOption from "./sidebar-option";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faList, faUser, faPeopleCarry, faFire, faCalendarPlus, faMap, faDownload, faImage } from '@fortawesome/fontawesome-free-solid'

const SideBar = () => {
    return (
        <div className="sidebar">
            <SideBarOption icon={<FontAwesomeIcon icon={faTable} />} title={"Dashboard"} redirect={"dashboard"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faList} />} title={"Activities"} redirect={"activities/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faUser} />} title={"Beneficiaries"} redirect={"beneficiary/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faPeopleCarry} />} title={"Communities"} redirect={"communities/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faFire} />} title={"Sessions"} redirect={"sessions/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faCalendarPlus} />} title={"Attendance"} redirect={"attendance/add"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faMap} />} title={"Locations"} redirect={"locations/view"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faDownload} />} title={"Download"} redirect={"download-data"} />
            <SideBarOption icon={<FontAwesomeIcon icon={faImage} />} title={"Scan documents"} redirect={"image-to-text"} />
        </div>
    )
}

export default SideBar;