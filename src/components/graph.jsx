import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ eventData }) => {
  const chartRef = useRef(null);
  const myChart = useRef(null); // Use useRef to preserve the value across renders

  useEffect(() => {
    if (!chartRef.current || !eventData) return;

    // Destroy previous chart instance if it exists
    if (myChart.current) {
      myChart.current.destroy();
    }

    // Create new chart instance
    myChart.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: eventData[0].labels, // Use labels from the first event for line chart
        datasets: eventData.map(event => ({
          label: event.eventName,
          data: event.registrations,
           // Plot registrations for each event on the line chart
          fill: false,
          borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          tension: 0.1
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [eventData]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default LineChart;
