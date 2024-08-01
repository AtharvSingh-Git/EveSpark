import React from 'react';
import './BarGraph.css';


function BarGraph({ data }) {
 
  const maxEngagement = Math.max(...data.map(item => item.engagement));

  return (
    <div className="bar-graph">
      {data.map(item => (
        <div key={item.branch} className="bar" style={{display:'flex', flexDirection:'row',gap:'50px'}}>
          <div className="bar-label">{item.branch}</div>
          <div
            className="bar-fill"
            style={{ width: `${(item.engagement / maxEngagement) * 100}%` }}
          >
            {item.engagement}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BarGraph;
