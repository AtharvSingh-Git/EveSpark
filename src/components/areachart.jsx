import React from 'react';
import { Line } from 'react-chartjs-2';

const AreaChart = ({ data }) => {
  // Extracting labels and data from the provided array
  const labels = data.map(item => item.month);
  const revenueData = data.map(item => item.revenue);

  // Define the chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)', // Area fill color
        borderColor: 'rgba(75,192,192,1)', // Line color
        borderWidth: 2,
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue ($)',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default AreaChart;
