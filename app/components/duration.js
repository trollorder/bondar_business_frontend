import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const TimeDurationChart = ({ timeDurationDict }) => {
  const [data, setData] = useState([
    { name: '5-10 minutes', value: timeDurationDict.fiveToTen },
    { name: '10-15 minutes', value: timeDurationDict.tenToFifteen },
    { name: '15-30 minutes', value: timeDurationDict.fifteenToThirty },
    { name: '30-45 minutes', value: timeDurationDict.thirtyToFortyFive },
    { name: '45-60 minutes', value: timeDurationDict.fortyFiveToSixty },
    { name: '60-75 minutes', value: timeDurationDict.sixtyToSeventyFive },
    { name: '75-90 minutes', value: timeDurationDict.seventyFiveToNinety },
    { name: '90++ minutes', value: timeDurationDict.ninetyPlus },
  ]);

  // Update data if props change (optional for dynamic data updates)
  useEffect(() => {
    setData([
      { name: '5-10 minutes', value: timeDurationDict.fiveToTen },
      { name: '10-15 minutes', value: timeDurationDict.tenToFifteen },
      { name: '15-30 minutes', value: timeDurationDict.fifteenToThirty },
      { name: '30-45 minutes', value: timeDurationDict.thirtyToFortyFive },
      { name: '45-60 minutes', value: timeDurationDict.fortyFiveToSixty },
      { name: '60-75 minutes', value: timeDurationDict.sixtyToSeventyFive },
      { name: '75-90 minutes', value: timeDurationDict.seventyFiveToNinety },
      { name: '90++ minutes', value: timeDurationDict.ninetyPlus },
    ]);
  }, [timeDurationDict]);

  return (
    <div style={{ width: '300px' }}> {/* Set a width for the chart container */}
      <BarChart width={350} height={300} data={data}>
        <XAxis dataKey="name" tickFormatter={(name) => name.slice(0, -3)} />  {/* Shorten labels */}
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TimeDurationChart;
