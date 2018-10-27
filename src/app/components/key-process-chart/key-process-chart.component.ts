import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartFieldModel } from '../../models/chart.field.model';
import { ChartService } from '../../services/chart.service';
import { ChartRowInfoModel } from 'src/app/models/chart.row.info.model';
import { MatureProfileChartModel } from 'src/app/models/mature.profile.chart.model';
const titleKeyProcess = 'Situacion actual de los procesos claves';
@Component({
  selector: 'app-key-process-chart',
  templateUrl: './key-process-chart.component.html',
  styleUrls: ['./key-process-chart.component.css']
})
export class KeyProcessChartComponent implements OnInit, OnChanges {
  @Input() chartData: MatureProfileChartModel;
  @ViewChild('canvas') canvas: ElementRef;
  chart = [];
  rows2: ChartRowInfoModel[] = [];
  rows3: ChartRowInfoModel[] = [];
  rows4: ChartRowInfoModel[] = [];
  rows5: ChartRowInfoModel[] = [];
  rows6: ChartRowInfoModel[] = [];
  resume = 0;
  resumeLabel = '';
  title = titleKeyProcess;
  section2Value = '';
  section3Value = '';
  section4Value = '';
  section5Value = '';
  section6Value = '';
  constructor(private chartService: ChartService) { }

  ngOnInit() {
  }


  fillTable(parts: ChartFieldModel[], rows: ChartRowInfoModel[]) {
    const length = parts.length;
    let section = 0;
    for (let i = 0; i < length; i++) {
      const row = {
        label: parts[i].label,
        value: '' + parseInt('' + parts[i].value, 10)
      };
      section += parts[i].value;
      rows.push(row);
    }
    section = section / length;
    const precision = this.chartService.getPrecision(section);

    return section.toPrecision(precision);
  }
  calculateResume() {
    this.resume = (parseInt(this.section2Value, 10) + parseInt(this.section3Value, 10) +
    parseInt(this.section4Value, 10) + parseInt(this.section5Value, 10) +
    parseInt(this.section6Value, 10)) / 5;
    const precision = this.chartService.getPrecision(this.resume);
    this.resumeLabel = '' + parseInt('' + this.resume, 10);
  }

  handleRadar() {
    this.section2Value = this.fillTable(this.chartData.section2.parts, this.rows2);
    this.section3Value = this.fillTable(this.chartData.section3.parts, this.rows3);
    this.section4Value = this.fillTable(this.chartData.section4.parts, this.rows4);
    this.section5Value = this.fillTable(this.chartData.section5.parts, this.rows5);
    this.section6Value = this.fillTable(this.chartData.section6.parts, this.rows6);
    this.calculateResume();
    const labels = this.getRadarLabels();
    const values = this.getRadarValues();
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
    const result: string[] = [];

    this.chartData.section2.parts.forEach((element) => {
      result.push(element.label);
    });
    this.chartData.section3.parts.forEach((element) => {
      result.push(element.label);
    });
    this.chartData.section4.parts.forEach((element) => {
      result.push(element.label);
    });
    this.chartData.section5.parts.forEach((element) => {
      result.push(element.label);
    });
    this.chartData.section6.parts.forEach((element) => {
      result.push(element.label);
    });
    return result;
  }

  getRadarValues(): number[] {
    const result: number[] = [];

    this.chartData.section2.parts.forEach((element) => {
      result.push(element.value);
    });
    this.chartData.section3.parts.forEach((element) => {
      result.push(element.value);
    });
    this.chartData.section4.parts.forEach((element) => {
      result.push(element.value);
    });
    this.chartData.section5.parts.forEach((element) => {
      result.push(element.value);
    });
    this.chartData.section6.parts.forEach((element) => {
      result.push(element.value);
    });
    return result;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.chartData.currentValue) {
      this.handleRadar();
    }
  }

  getColor(sectionValue: string) {
    return this.chartService.getColor(sectionValue);
  }


}
