import React from 'react';
import { Line as LineChart } from 'react-chartjs';


export default function SPChart(props) {
  let { ticker, priceData, dateData } = props;
  const chartOptions = { //
    showScale: false,
    tooltipEvents: []
  }
  const data = {
    labels: dateData,
    datasets: [
      {
        label: `Historical prices: ${ticker}`,
        fillColor: "rgba(20, 20, 20, 0.65)",
        strokeColor: "rgba(0, 255, 255, 0.10)",
        pointColor: "rgba(248, 132, 0, 0.001)",
        pointStrokeColor: "rgba(0, 0, 0, 0.001",
        pointHighlightFill: "rgba(0, 0, 0, 0.001",
        pointHighlightStroke: "rgba(0, 0, 0, 0.001",
        data: priceData
      },
    ]
  };
  return (
    <div
      style={{
        height: `${window.innerHeight * .8}px`,
        width: `${window.innerWidth}px`,
        margin: '0 auto',
        backgroundColor: 'transparent',
        zIndex: 5
      }}>

      <div
        style={{
          height: `${window.innerHeight * .8}px`,
          width: `${window.innerWidth}px`,
          margin: '0 auto'
        }}>

        <LineChart
          data={data}
          options={chartOptions}
          width={window.innerWidth}
          height={window.innerHeight * .8}
          redraw={false}
          className="spy-line-chart" />
      </div>
    </div>
  )
}