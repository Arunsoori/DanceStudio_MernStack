import { HiUsers } from "react-icons/hi";
import {BiLogOut} from "react-icons/bi"
import {HiUserGroup} from "react-icons/hi"
import {SiBytedance} from "react-icons/si"
import {MdEmojiEvents} from "react-icons/md"
import {FaChalkboardTeacher} from "react-icons/fa"
import {RxBorderWidth} from "react-icons/rx"
import {SiCoursera} from "react-icons/si"
import { MdDashboard } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./sidebar.css";

function Sidebar() {
const handleLogout = ()=>{

  console.log("handle");
localStorage.removeItem("adminjwt")
navigate('/admin')
}


  const navigate = useNavigate();
  return (
    <div>
      <SideNav
        className="sidenav"
        onSelect={(selected) => {
          navigate(selected);
        }}
      >
        <SideNav.Toggle className="toggle" />
        <SideNav.Nav defaultSelected="DashBoard">
          <NavItem eventKey="/admin/dashboard">
            <NavIcon>
              <MdDashboard size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <HiUsers size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Students</NavText>
            <NavItem eventKey="/admin/userList">
              <NavIcon></NavIcon>
              <NavText>Users List</NavText>
            </NavItem>
           
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <SiBytedance size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Courses</NavText>
            <NavItem eventKey="/admin/courseList">
              <NavIcon></NavIcon>
              <NavText>Course List</NavText>
            </NavItem>
            <NavItem eventKey="/admin/addCourse">
              <NavIcon></NavIcon>
              <NavText>Add Course</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <FaChalkboardTeacher size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Faculties</NavText>
            <NavItem eventKey="/admin/facultyList">
              <NavIcon></NavIcon>
              <NavText>Faculty List</NavText>
            </NavItem>
            <NavItem eventKey="/admin/addFaculty">
              <NavIcon></NavIcon>
              <NavText>Add Faculty</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <HiUserGroup size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Groups</NavText>
            <NavItem eventKey="/admin/grouplist">
              <NavIcon></NavIcon>
              <NavText>Group List</NavText>
            </NavItem>
            <NavItem eventKey="/admin/addgroup">
              <NavIcon></NavIcon>
              <NavText>Add Group</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <RxBorderWidth size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Orders</NavText>
            <NavItem eventKey="/admin/order">
              <NavIcon></NavIcon>
              <NavText>Order List</NavText>
            </NavItem>
            {/* <NavItem eventKey="/admin/addFaculty">
              <NavIcon></NavIcon>
              <NavText>Add Faculty</NavText>
            </NavItem> */}
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <MdEmojiEvents size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Events</NavText>
            <NavItem eventKey="/admin/addevent">
              <NavIcon></NavIcon>
              <NavText>Add Event</NavText>
            </NavItem>
          
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <BiLogOut size={20} className="sidebarIcon" />
            </NavIcon>
           
            <NavItem  eventKey="/admin"   onClick={handleLogout} >
              <NavIcon></NavIcon>
              <NavText >Logout</NavText>
            </NavItem>
          
          </NavItem>
          {/* <NavItem  onclick={logout} eventKey="/">
            <NavIcon>
              <FcManager size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Logout</NavText>
            <NavItem eventKey="/admin/facultyList">
              <NavIcon></NavIcon>
              <NavText>Faculty List</NavText>
            </NavItem>
            <NavItem eventKey="/admin/addFaculty">
              <NavIcon></NavIcon>
              <NavText>Add Faculty</NavText>
            </NavItem>
          </NavItem> */}
          
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

export default Sidebar;