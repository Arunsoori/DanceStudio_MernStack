import React from "react";
import Sidebar from "../../components/admin/sidebar/sidebar";
import CourseList from "../../components/admin/courseList/courseList";

function courseListPage() {
  return (
    <div>
      <Sidebar />
      <CourseList />
    </div>
  );
}

export default courseListPage;
