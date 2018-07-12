import { VictoryBar, VictoryChart, VictoryTooltip } from 'victory';
import React from 'react';

const TempVBar = ({ forecast }) => {
  const data = forecast.map(el => ({
    date: el.time * 1000,
    temperature: el.temperature,
    label: `${Math.round(el.temperature)}°`,
  }));
  return (
    <VictoryChart scale={{ x: 'time' }} domainPadding={5}>
      <VictoryBar
        labelComponent={<VictoryTooltip />}
        data={data}
        x="date"
        y="temperature"
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        cornerRadius={3}
        style={{ data: { fill: 'orange' } }}
      />
    </VictoryChart>
  );
};
export default TempVBar;
