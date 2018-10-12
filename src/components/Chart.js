import React from 'react';
import { Line } from 'react-chartjs';

class Chart extends React.Component {
  constructor() {
    super()
    this.state = {
      testArr: [1, 2, 4, 6, 7, 2, 8, 23, 6, 7, 9, 9]
    }
  }
  render() {
    // const stockChartPrep = <canvas></canvas>
    // const stockChartContext = stockChartPrep.getContext("2d");
    // const stockChart = new Chart(stockChartContext).Line(data, chartOptions);

    const chartOptions = {
      showScale: true,
    }
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Date of price",
          fillColor: "rgba(255,7,5,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          // pointStrokeColor: "#fff",
          // pointHighlightFill: "#fff",
          // pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        // {
        //   label: "My First dataset",
        //   fillColor: "rgba(220,220,220,0.2)",
        //   strokeColor: "rgba(220,220,220,1)",
        //   pointColor: "rgba(220,220,220,1)",
        //   pointStrokeColor: "#fff",
        //   pointHighlightFill: "#fff",
        //   pointHighlightStroke: "rgba(220,220,220,1)",
        //   data: [65, 59, 80, 81, 56, 55, 40]
        // }
      ]
    };

    return (
      <div>
        {/* {stockChart} */}
        <Line data={data} options={chartOptions} width="600" height="250" redraw={false} />
      </div>
    )
  }
}

export default Chart;