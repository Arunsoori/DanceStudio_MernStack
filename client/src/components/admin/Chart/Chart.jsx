import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { orderData } from '../../../services/adminApi';
import moment from 'moment';

function Chart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderData(); // Fetch order data from your API
        const data = response.data.orderdata;

        // Group orders by week and count the number of orders in each week
        const groupedData = data.reduce((acc, item) => {
          const week = moment(item.orderdate).startOf('week').format('YYYY-MM-DD');
          acc[week] = acc[week] ? acc[week] + 1 : 1;
          return acc;
        }, {});

        // Transform the grouped data to match the format expected by the chart
        const transformedData = Object.entries(groupedData).map(([week, count]) => {
          const weekLabel = moment(week).format('MMMM Do [week]');
          return { name: weekLabel, uv: count };
        });

        setChartData(transformedData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate the current week of the month
  const currentWeekOfMonth = Math.ceil(moment().date() / 7);

  // Update the week label for the current week
  if (chartData.length > 0) {
    const currentWeekLabel = `Week ${currentWeekOfMonth} of ${moment().format('MMMM')}`;
    chartData[chartData.length - 1].name = currentWeekLabel;
  }

  return (
    <div className='ms-5'>
      <h2>Weekly Booking Chart</h2>
      <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default Chart;
