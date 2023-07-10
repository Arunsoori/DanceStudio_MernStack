import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import moment from 'moment';
import axios from 'axios';
import { orderData } from '../../../services/adminApi';
import './Chart.css';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const Chart = () => {
  const [data, setData] = useState([]);
  const [chartDimensions, setChartDimensions] = useState({ width: 1000, height: 600 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        orderData().then((response) => {
          const orders = response.data.orderdata;

          // Group orders by week and count the number of bookings in each week
          const groupedData = orders.reduce((acc, item) => {
            const weekStart = moment(item.orderdate).startOf('week');
            const weekEnd = moment(item.orderdate).endOf('week');
            const weekLabel = `${weekStart.format('MMMM')} ${weekStart.date()} - ${weekEnd.date()} week`;

            if (!acc[weekLabel]) {
              acc[weekLabel] = {
                name: weekLabel,
                bookings: 0,
              };
            }

            acc[weekLabel].bookings += 1;

            return acc;
          }, {});

          // Sort the grouped data by week
          const sortedData = Object.values(groupedData).sort((a, b) =>
            moment(a.name.split(' ')[0], 'MMMM').diff(moment(b.name.split(' ')[0], 'MMMM'))
          );

          setData(sortedData);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  useEffect(() => {
    const handleResize = () => {
      const chartContainer = document.getElementById('chart-container');
      if (chartContainer) {
        const containerWidth = chartContainer.offsetWidth;
        const chartWidth = containerWidth > 767 ? 1000 : containerWidth - 30;
        const chartHeight = containerWidth > 767 ? 600 : 400;

        setChartDimensions({ width: chartWidth, height: chartHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div>
        <h1>Weekly Booking</h1>
      
      <div id="chart-container" className="chart-container">
        <BarChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="bookings" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
      </div>
    </div>
  );
};

export default Chart;

