import React from 'react';
import { Line as LineChart } from 'react-chartjs';

export default function Chart(props) {
  let { ticker, priceData, dateData, windowLoadWidth } = props;
  const mobile = windowLoadWidth > 500 ? false : true;

  const chartOptions = {
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
    props.running ?
      <LineChart
        data={data}
        options={chartOptions}
        width={mobile ? windowLoadWidth * .60 : windowLoadWidth * .80}
        height={mobile ? windowLoadWidth * .70 : windowLoadWidth * .39}
        redraw={false}
        className="stock-line-chart-active" />
      :
      <LineChart
        data={data}
        options={chartOptions}
        width={mobile ? windowLoadWidth * .60 : windowLoadWidth * .80}
        height={mobile ? windowLoadWidth * .70 : windowLoadWidth * .39}
        redraw={false}
        className="stock-line-chart-final" />
  )
}