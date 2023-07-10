import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { orderData } from "../../../services/adminApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#f907d9"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Piechart = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderData();
        const coursePercentageData = response.data.coursepercentage;
        console.log(coursePercentageData, "coursepercngae");
        setCourseData(coursePercentageData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Enrolled Courses</h1>
      {courseData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={courseData}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentage"
          >
            {courseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <p>Loading data...</p>
      )}
      <div>
        <div>
          <div className="d-flex">
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#00c49f",
              }}
            ></div>
            <span style={{ fontSize: "15px" }} className="mx-2">
              Bollywood
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#0088fe",
              }}
            ></div>
            <span style={{ fontSize: "15px" }} className="mx-2">
              Kids
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#ffbb28",
              }}
            ></div>
            <span style={{ fontSize: "15px" }} className="mx-2">
              Contemporary
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#FF8042",
              }}
            ></div>
            <span style={{ fontSize: "15px" }} className="mx-2">
              1 to 1 Private
            </span>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div
              style={{
                height: "20px",
                width: "20px",
                backgroundColor: "#f907d9",
              }}
            ></div>
            <span style={{ fontSize: "15px" }} className="mx-2">
              Private group sessions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piechart;
