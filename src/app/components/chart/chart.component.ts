import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as chartTypes from '../../models/chart.type';
import { ChartFieldModel } from '../../models/chart.field.model';
import { ChartService } from '../../services/chart.service';
import { ChartRowInfoModel } from 'src/app/models/chart.row.info.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  @Input() chartType: string;
  @Input() title: string;
  @ViewChild('canvas') canvas: ElementRef;
  chart = [];
  rows: ChartRowInfoModel[] = [];
  resume = 0;
  resumeLabel = '';
  constructor(private chartService: ChartService) { }

  ngOnInit() {
  }

  handleData() {
    switch (this.chartType) {
      case chartTypes.radar:
        this.handleRadar();
        break;
      case chartTypes.hBar:
        this.handleHorizontalBar();
        break;
      default:
        return;
    }
  }

  fillTable(labels: string[], values: number[]) {
    const length = values.length;
    for (let i = 0; i < length; i++) {
      const row = {
        label: labels[i],
        value: '' + parseInt('' + values[i], 10)
      };
      this.resume += values[i];
      this.rows.push(row);
    }
    this.resume = this.resume / length;
    const precision = this.chartService.getPrecision(this.resume);
    this.resumeLabel = '' + parseInt('' + this.resume, 10);
  }

  handleRadar() {
    const labels = this.getRadarLabels();
    const values = this.getRadarValues();
    this.fillTable(labels, values);
    const options = this.getRadarOptions();
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          borderColor: 'rgb(30,144,255)',
          backgroundColor: 'rgb(160, 142, 248, 0.2)',
          pointBorderColor: 'blue',
          pointBackgroundColor: 'red',
          fill: true
        }],
      },
      options: options
    });
  }

  getRadarOptions() {
    return {
      legend: {
        display: false
      },
      scale: {
        ticks: {
          beginAtZero: true,
          max: 100
        }
      },
      animation: this.chartService.getAnimationOptionsConfig()
    };
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

  getBarDataSets() {
    const array = [];
    array.push({
      label: this.chartData.section1.name,
      data: [
        this.chartData.section1.parts[0].value,
        this.chartData.section2.parts[0].value,
        this.chartData.section3.parts[0].value,
        this.chartData.section4.parts[0].value,
        this.chartData.section5.parts[0].value,
        this.chartData.section6.parts[0].value,
        this.chartData.section7.parts[0].value,
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    array.push({
      label: this.chartData.section2.name,
      data: [
        this.chartData.section1.parts[1].value,
        this.chartData.section2.parts[1].value,
        this.chartData.section3.parts[1].value,
        this.chartData.section4.parts[1].value,
        this.chartData.section5.parts[1].value,
        this.chartData.section6.parts[1].value,
        this.chartData.section7.parts[1].value,
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    array.push({
      label: this.chartData.section3.name,
      data: [
        this.chartData.section1.parts[2].value,
        this.chartData.section2.parts[2].value,
        this.chartData.section3.parts[2].value,
        0,
        0,
        0,
        this.chartData.section7.parts[2].value,
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    array.push({
      label: this.chartData.section4.name,
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        this.chartData.section7.parts[3].value,
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    return array;
  }

  handleHorizontalBar() {
    const label = 'Nivel de Madurez:' + this.chartData.matureLv;
    const color = this.getHorizontalColor();
    const value1 = this.chartData.fullFinishPercentage;
    const value2 = this.chartData.unFinishPercentage;
    const options = this.getHorizontalBarOptions();
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: [label],
        datasets: [{
          label: '% de cumplimiento',
          data: [value1],
          borderColor: 'blue',
          backgroundColor: color,
          fill: true
        },
        {
          label: '% de incumplimiento',
          data: [value2],
          borderColor: 'blue',
          backgroundColor: 'rgb(128,128,128,0.6)',
          fill: true
        }
        ],
      },
      options: options
    });
  }

  getHorizontalBarOptions() {
    const theHelp = Chart.helpers;
    return {
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            min: 0,
            max: 100
          }
        }],
        yAxes: [{ stacked: true }]
      },
      animation: this.chartService.getAnimationOptionsConfig(),
      legend: {
        display: true,

        // generateLabels changes from chart to chart,  check the source,
        // this one is from the doughut :
        // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L42
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (slabel, i) {
                const meta = chart.getDatasetMeta(0);
                const ds = data.datasets[0];
                const arc = meta.data[i];
                const custom = arc && arc.custom || {};
                const getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
                const arcOpts = chart.options.elements.arc;
                const fill = custom.backgroundColor ? custom.backgroundColor :
                  getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                const stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                const bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                return {
                  // And finally :
                  text: ds.data[i].toPrecision(2) + ds.label,
                  fillStyle: fill,
                  strokeStyle: stroke,
                  lineWidth: bw,
                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                  index: i
                };
              });
            }
            return [];
          }
        }
      }
    };
  }
  getHorizontalColor() {
    switch (this.chartData.matureLv) {
      case 'Incipiente':
        return 'rgb(255,0,0,0.6)';
      case 'Artesanal':
        return 'rgb(255,165,0, 0.6)';
      case 'En desarrollo':
        return 'rgb(255,255,0,0.6 )';
      case 'Maduro':
        return 'rgb(0,128,0,0.6)';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.chartData.currentValue) {
      this.handleData();
    }
  }

  getColor(sectionValue: string) {
    return this.chartService.getColor(sectionValue);
  }


}
