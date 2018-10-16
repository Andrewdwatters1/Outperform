import React from 'react';
import { Line as LineChart } from 'react-chartjs';

export default function Chart(props) {
  let { ticker, priceData } = props;
  const chartOptions = { //
    showScale: false,
    tooltipEvents: []
  }
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
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
            width={window.innerWidth * .5}
            height={window.innerHeight * .8}
            redraw={false}
            className="stock-line-chart-active" />
          <div
            style={{
              height: `${window.innerHeight * .8}px`,
              width: '10vw',
              position: 'absolute',
              right: '0',
              bottom: '0',
              display: 'flex',
              flexDirection: 'column',
              top: '120vh',
              justifyContent: 'space-between'
            }}>
            <i class="fas fa-arrow-left" style={{fontSize: '2.5em'}}></i>
            <i class="fas fa-arrow-left" style={{fontSize: '2.5em'}}></i>
            <i class="fas fa-arrow-left" style={{fontSize: '2.5em'}}></i>
            <i class="fas fa-arrow-left" style={{fontSize: '2.5em'}}></i>
          </div>
        </div>
      </div>
      :
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
            width={window.innerWidth * .8}
            height={window.innerHeight * .7}
            redraw={false}
            className="stock-line-chart-final" />
        </div>
      </div>
  )
}