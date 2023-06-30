import React, { useEffect } from "react";
import Sidebar from "../../components/admin/sidebar/sidebar";
import Chart from "../../components/admin/Chart/Chart";
import Piechart from "../../components/admin/Piechart/Piechart";
import DashboardBox from "../../components/admin/DashboardBox/DashboardBox";
import { Dashboard } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

function adminDashboard() {
  const navigate= useNavigate()

  useEffect(()=>{
    Dashboard().then((response)=>{
      console.log(response.data.status,"sttaus");
      if(!response.data.status){
        navigate('/admin')
      }
    })

  },[])
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
          <div>
            <div className="d-flex"><div style={{height:"20px",width:"20px",backgroundColor:"#FF8042"}}></div> 
            <span style={{fontSize:"15px"}} className="mx-2">1 to 1 Private</span></div>
          </div>
          <div>
            <div className="d-flex"><div style={{height:"20px",width:"20px",backgroundColor:"#f907d9"}}></div> 
            <span style={{fontSize:"15px"}} className="mx-2">Private group sessions</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default adminDashboard;
