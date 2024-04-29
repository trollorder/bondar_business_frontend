/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
	render() {
        const { timeDurationDict } = this.props;

		const options = {
			animationEnabled: true,
			theme: "light2",
			axisX: {
				reversed: true,
			},
			axisY: {
				// title: "Monthly Active Users",
				includeZero: true,
                lineThickness: 1,
				// labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
                    { y: timeDurationDict.fiveToTen, label: "5-10 minutes" },
                    { y: timeDurationDict.tenToFifteen, label: "10-15 minutes" },
                    { y: timeDurationDict.fifteenToThirty, label: "15-30 minutes" },
                    { y: timeDurationDict.thirtyToFortyFive, label: "30-45 minutes" },
                    { y: timeDurationDict.fortyFiveToSixty, label: "45-60 minutes" },
                    { y: timeDurationDict.sixtyToSeventyFive, label: "60-75 minutes" },
                    { y: timeDurationDict.seventyFiveToNinety, label: "75-90 minutes" },
                    { y: timeDurationDict.ninetyPlus, label: "90++ minutes" },
                ]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
export default App;