import React from 'react';
import { Line as LineChart } from 'react-chartjs';


export default function Chart(props) {
  let { ticker, priceData } = props;
  const chartOptions = { //
    showScale: false
  }
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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