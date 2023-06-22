import React from "react";
import Sidebar from "../../components/admin/sidebar/sidebar";
import Chart from "../../components/admin/Chart/Chart";
import Piechart from "../../components/admin/Piechart/Piechart";
import DashboardBox from "../../components/admin/DashboardBox/DashboardBox";

function adminDashboard() {
  return (
    <div className="container">
      <Sidebar />
      <DashboardBox />
      <div className="d-flex justify-content-between  align-items-center " >
        <div className="w-50">
          {" "}
          <Chart />
        </div>
        <div>
          {" "}
          
          <Piechart />
          <div>
            <div className="d-flex"><div style={{height:"20px",width:"20px",backgroundColor:"#00c49f"}}></div> 
            <span style={{fontSize:"15px"}} className="mx-2">Bollywood</span></div>
          </div>
          <div>
            <div className="d-flex"><div style={{height:"20px",width:"20px",backgroundColor:"#0088fe"}}></div> 
            <span style={{fontSize:"15px"}} className="mx-2">Kids</span></div>
          </div>
          <div>
            <div className="d-flex"><div style={{height:"20px",width:"20px",backgroundColor:"#ffbb28"}}></div> 
            <span style={{fontSize:"15px"}} className="mx-2">Contemporary</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default adminDashboard;
