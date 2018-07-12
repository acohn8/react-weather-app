import { VictoryBar, VictoryChart, VictoryTooltip } from 'victory';
import React from 'react';

const PrecipVBar = ({ forecast }) => {
  const data = forecast.map(el => ({
    date: el.time * 1000,
    precipitation: Math.round(el.precipProbability * 100),
    label: `${Math.round(el.precipProbability * 100)}%`,
  }));
  return (
    <VictoryChart
      scale={{ x: 'time' }}
      domainPadding={5}
      domain={{
        y: [0, 100],
      }}
    >
      <VictoryBar
        labelComponent={<VictoryTooltip />}
        data={data}
        x="date"
        y="precipitation"
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        cornerRadius={3}
        style={{ data: { fill: '#2085D0' } }}
      />
    </VictoryChart>
  );
};
export default PrecipVBar;
