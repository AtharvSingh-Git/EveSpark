import React, { useState, useEffect } from 'react';

function Ranker({ data }) {
  const [rankers, setRankers] = useState([]);

  useEffect(() => {
    setRankers(data);
  }, [data]);

  return (
    <div className="lboard">
      <h2 className="Lhead">LeaderBoard</h2>
      <ol className="Rlist">
        {rankers.map((ranker, index) => (
          <li key={index}>
            <div className="listele">
              <div className="rankidx"><h1>{index + 1}</h1></div>
              <div className="ranktxt" ><p>{ranker.club_name}</p></div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Ranker;
