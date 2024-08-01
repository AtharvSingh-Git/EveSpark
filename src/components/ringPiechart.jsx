import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const RingPieChart = () => {
  const data = {
    labels: ['CSE','ECE','AI','Cloud Computing','EEE','Data Science','Ecomerce','Cyber Security','Mechanical'],
    datasets: [
      {
        data: [30, 50, 20,50,60,20,40,30], 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#874CCC','#FFD1E3','#795458','#481E14','#D1BB9E'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#874CCC','#FFD1E3','#795458','#481E14','#D1BB9E'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, 
    legend: {
      display: true,
      position: 'right', // Adjust legend position to the right
    },
  };

  return (
    <div style={{width:'1500px', height:'400px', display: 'flex', flexDirection: 'column', alignItems: 'center' , color:'CaptionText'}}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default RingPieChart;
