import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const DemographicsChart = ({ male, female, binary }) => {
  const data = [
    { name: 'Female', value: female },
    { name: 'Male', value: male },
    { name: 'Non Binary', value: binary },
  ];

  return (
    <div>
      <BarChart width={300} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default DemographicsChart;
