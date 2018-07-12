import { VictoryBar, VictoryChart, VictoryAxis, VictoryArea } from 'victory';
import React from 'react';

const TempVBar = ({ forecast }) => {
  console.log(forecast);
  // const data = forecast.map(el => ({
  //   time: el.time,
  //   temp: el.temperature,
  // }));
  // console.log(data);
  return <div />;
};
// <VictoryChart domainPadding={20}>
//   {/* <VictoryAxis tickFormat={x => new Date(x)} /> */}
//   <VictoryBar
//     labels={d => `${d.y}°`}
//     barRatio={1.1}
//     data={data}
//     animate={{
//       duration: 2000,
//       onLoad: { duration: 1000 },
//     }}
//     cornerRadius={3}
//     // x="name"
//     // y="high"
//     style={{ data: { fill: 'orange' } }}
//   />
// </VictoryChart>
export default TempVBar;
