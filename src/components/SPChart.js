import React from 'react';
import { Line as LineChart } from 'react-chartjs';


export default function SPChart(props) {
  let { ticker, priceData, dateData } = props;
  const chartOptions = { //
    showScale: false
  }
  const data = {
    labels: dateData,
    datasets: [
      {
        label: `Historical prices: ${ticker}`,
        fillColor: "rgba(255,7,5,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        // pointStrokeColor: "#fff",
        // pointHighlightFill: "#fff",
        // pointHighlightStroke: "rgba(151,187,205,1)",
        data: priceData
      },
    ]
  };
  return (
    <div>
      <LineChart data={data} options={chartOptions} width={window.innerWidth * .75} height={window.innerHeight * .5} redraw={false} />
    </div>
  )
}