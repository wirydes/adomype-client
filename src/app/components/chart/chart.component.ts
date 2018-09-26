import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  @Input() chartType: string;

  chart = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.chartData.currentValue) {
    // this.chart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: weatherDates,
    //     datasets: [
    //       {
    //         data: temp_max,
    //         borderColor: "#3cba9f",
    //         fill: false
    //       },
    //       {
    //         data: temp_min,
    //         borderColor: "#ffcc00",
    //         fill: false
    //       },
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [{
    //         display: true
    //       }],
    //       yAxes: [{
    //         display: true
    //       }],
    //     }
    //   }
    // });
    }
  }


}
