import React from 'react';
import { Line as LineChart } from 'react-chartjs';

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPricePoints: 120,
      pricePointsPerScreen: 10,
      intervalBetweenIterations: 500,
    }
  }

  updateChartData() {

  }
  // componentDidMount() {
  //   setTimeout(() => {
  //     for(let i = 0; i < (this.state.totalPricePoints - this.state.pricePointsPerScreen); i++) {
  //       setTimeout(() => {
  //         randomStartingPoint++
  //       }, intervalBetweenIterations)
  //     }
  //   }, intervalBetweenIterations)
  // }
  render() {
    console.log(this.props)
    let { priceData, dateData, priceDataLength, ticker } = this.props;
    let { totalPricePoints, pricePointsPerScreen, intervalBetweenIterations } = this.state;
    let randomStartingPoint = Math.floor(Math.random() * (priceDataLength - totalPricePoints + 1) + totalPricePoints)
    const chartOptions = {
      showScale: true,
    }
    const data = {
      // labels: ['-13 weeks', '-12 weeks', '-11 weeks', '-10 weeks', '-9 weeks', '-8 weeks', '-7 weeks', '-6 weeks', '-5 weeks',  '-4 weeks', '-3 weeks', '-2 weeks', 'last week', 'today'],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // whatever
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
            .slice(randomStartingPoint, randomStartingPoint + pricePointsPerScreen)
            .map((e) => e = e['4. close'])
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
        <LineChart data={data} options={chartOptions} width={window.innerWidth * .8} height={window.innerHeight * .4} redraw={true} />
      </div>
    )
  }
}

export default Chart;