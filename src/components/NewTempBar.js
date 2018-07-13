import {
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryLine,
  createContainer,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTheme,
} from 'victory';
import React from 'react';

class TempVBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom = domain => {
    this.setState({ selectedDomain: domain });
  };

  handleBrush = domain => {
    this.setState({ zoomDomain: domain });
  };

  render() {
    const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
    const tempData = this.props.forecast.map(el => ({
      x: el.time * 1000,
      y: el.temperature,
      l: `Temperature: ${Math.round(el.temperature)}°`,
    }));
    const precipData = this.props.forecast.map(el => ({
      x: el.time * 1000,
      y: Math.round(el.precipProbability * 100),
      l: `Precipitation: ${Math.round(el.precipProbability * 100)}%`,
    }));
    return (
      <div>
        <VictoryChart
          width={700}
          height={200}
          scale={{ x: 'time' }}
          theme={VictoryTheme.material}
          padding={{ top: 0, left: 50, right: 50, bottom: 35 }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              domain={{ y: [0, 110] }}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom}
              voronoiDimension="x"
              labels={d => `${d.l}`}
              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: 'white' }} />}
            />
          }
        >
          <VictoryLine
            interpolation="natural"
            data={tempData}
            style={{
              data: { stroke: 'orange' },
              strokeWidth: 10,
              strokeLinecap: 'round',
            }}
          />
          <VictoryBar data={precipData} cornerRadius={3} style={{ data: { fill: 'teal' } }} />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.material}
          domain={{ y: [0, 110] }}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={700}
          height={70}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush}
            />
          }
        >
          <VictoryAxis />
          <VictoryLine
            interpolation="natural"
            data={tempData}
            style={{
              data: { stroke: 'orange' },
              strokeWidth: 10,
              strokeLinecap: 'round',
            }}
          />
          <VictoryBar data={precipData} cornerRadius={3} style={{ data: { fill: 'teal' } }} />
        </VictoryChart>
      </div>
    );
  }
}
export default TempVBar;
