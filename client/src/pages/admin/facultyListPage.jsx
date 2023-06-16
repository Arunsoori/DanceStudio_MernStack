import React from "react";
import Sidebar from "../../components/admin/sidebar/sidebar";
import FacultyList from "../../components/admin/facultyList/facultylist";


function FacultyListPage() {
  return (
    <div>
      <Sidebar />
      <FacultyList />
    </div>
  );
}

export default FacultyListPage;
