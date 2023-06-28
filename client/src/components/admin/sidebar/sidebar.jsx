import { HiUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./sidebar.css";

function Sidebar() {
// const logout = ()=>{
// localStorage.removeItem("adminjwt")
// navigate('/admin')
// }


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
            <NavItem eventKey="/admin/addStudents">
              <NavIcon></NavIcon>
              <NavText>Add Students</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <FcManager size={20} className="sidebarIcon" />
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
              <FcManager size={20} className="sidebarIcon" />
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
              <FcManager size={20} className="sidebarIcon" />
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
              <FcManager size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Events</NavText>
            <NavItem eventKey="/admin/addevent">
              <NavIcon></NavIcon>
              <NavText>Add Event</NavText>
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