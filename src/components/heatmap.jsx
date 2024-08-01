import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function Heatmap({ data }) {
  // Transform event dates into an object with dates as keys and event counts as values
  const eventDataMap = data.reduce((map, event) => {
    const date = new Date(event.Date);
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    map[dateString] = (map[dateString] || 0) + 1;
    return map;
  }, {});

  // Convert the object into an array of objects with date and value properties
  const heatmapData = Object.keys(eventDataMap).map(date => ({
    date: new Date(date),
    count: eventDataMap[date],
  }));

  // Filter out any null or undefined values
  const filteredHeatmapData = heatmapData.filter(data => data.date !== null && data.date !== undefined);

  return (
    <ReactCalendarHeatmap
      startDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)} // Start date from one year ago
      endDate={new Date()} // End date is today
      values={filteredHeatmapData} // Pass the filtered heatmap data
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-github-${value.count}`;
      }}
      tooltipDataAttrs={value => {
        return {
          'data-tip': `${value.date.toLocaleDateString()}: ${value.count} events`,
        };
      }}
    />
  );
}

export default Heatmap;
