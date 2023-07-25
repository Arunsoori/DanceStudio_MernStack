import React, { useEffect } from "react";
import Sidebar from "../../components/admin/sidebar/sidebar";
import Chart from "../../components/admin/Chart/Chart";
import Piechart from "../../components/admin/Piechart/Piechart";
import DashboardBox from "../../components/admin/DashboardBox/DashboardBox";
import { Dashboard } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

function adminDashboard() {
  const navigate= useNavigate()

  // useEffect(()=>{
  //   Dashboard().then((response)=>{
  //     console.log(response.data.status,"sttaus");
  //     // if(!response.data.status){
  //     //   navigate('/admin')
  //     // }
  //   })

  // },[])
  return (
    <div className="container">
      <Sidebar />
      <DashboardBox />
      <div className="d-flex justify-content-between " >
        <div className="w-50">
         
          <Chart />
        </div>
        <div>
        
          
          <Piechart />
   
        </div>
      </div>
    </div>
  );
}

export default adminDashboard;
