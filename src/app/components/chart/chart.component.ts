import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as chartTypes from '../../models/chart.type';
import { RadarChartModel } from '../../models/radar.chart.model';
import { ChartFieldModel } from '../../models/chart.field.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  @Input() chartType: string;
  @ViewChild('canvas') canvas: ElementRef;
  chart = [];
  constructor() { }

  ngOnInit() {
  }

  handleData() {
    switch (this.chartType) {
      case chartTypes.radar:
        this.handleRadar();
        break;
      case chartTypes.bar:
        this.handleBar();
        break;
      case chartTypes.hBar:
        this.handleHorizontalBar();
        break;
      default:
        return;
    }
  }

  handleRadar() {
    const labels = this.getRadarLabels();
    const values = this.getRadarValues();
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          borderColor: 'blue',
          backgroundColor: 'rgb(160, 142, 248, 0.5)',
          fill: true
        }],
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  getRadarLabels(): string[] {
    return this.chartData.parts.map((element: ChartFieldModel) => {
      return element.label;
    });
  }

  getRadarValues(): number[] {
    return this.chartData.parts.map((element: ChartFieldModel) => {
      return element.value;
    });
  }

  handleBar() {

  }

  handleHorizontalBar() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.chartData.currentValue) {
      this.handleData();
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
