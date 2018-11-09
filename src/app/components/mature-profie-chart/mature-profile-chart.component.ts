import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { MatureProfileChartModel } from '../../models/mature.profile.chart.model';
import { ChartService } from '../../services/chart.service';

import { ProcessAdomype } from '../../models/process.adomype.model';
import { ChartFieldModel } from '../../models/chart.field.model';
import { DisplayInfoModel } from '../../models/display.info.model';
import { ArrayDisplayInfoModel } from '../../models/array.display.info.model';
@Component({
  selector: 'app-mature-profile-chart',
  templateUrl: './mature-profile-chart.component.html',
  styleUrls: ['./mature-profile-chart.component.css']
})
export class MatureProfileChartComponent implements OnInit, OnChanges {
  @Input() chartData: MatureProfileChartModel;
  @ViewChild('canvas') canvas: ElementRef;
  chart: Chart;
  sections: DisplayInfoModel[] = [];
  process = new ProcessAdomype();
  parts: ArrayDisplayInfoModel[] = [];
  partsNames: string[] = [];
  constructor(private chartService: ChartService) { }

  ngOnInit() {
  }

  handleBar() {
    this.getPartsName();
    this.getProcessValues();
    const options = this.getBarOptions();
    const datasets = this.getBarDataSets();
    const labels = this.getBarDataLabels();
    this.getSectionValues(labels);
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: datasets,
      },
      options: options
    });
  }

  getPartsName() {
   this.setParts(this.chartData.section1.parts, '1');
   this.setParts(this.chartData.section2.parts, '2');
   this.setParts(this.chartData.section3.parts, '3');
   this.setParts(this.chartData.section4.parts, '4');
   this.setParts(this.chartData.section5.parts, '5');
   this.setParts(this.chartData.section6.parts, '6');
   this.setParts(this.chartData.section7.parts, '7');
  }

  setParts(array: ChartFieldModel[], part: string) {
    const result: DisplayInfoModel[] = [];
    array.forEach((item, i) => {
      const partIndex = part + '.' + (i + 1);
      this.partsNames.push(partIndex + ' ' + item.label);
      result.push(this.getDisplayInfo(partIndex, '' + item.value));
    });
    this.parts.push({array: result});
  }

  getDisplayInfo(label: string, value: string): DisplayInfoModel {
    const model = new DisplayInfoModel();
    model.label = label;
    model.value = value;

    return model;
  }

  getProcessValues() {
    this.process.strategicProcess = this.chartService.getPercentage(this.chartData.section1.parts);
    this.process.supportProcess = this.chartService.getPercentage(this.chartData.section7.parts);
    const s2 = this.chartService.getPercentage(this.chartData.section2.parts);
    const s3 = this.chartService.getPercentage(this.chartData.section3.parts);
    const s4 = this.chartService.getPercentage(this.chartData.section4.parts);
    const s5 = this.chartService.getPercentage(this.chartData.section5.parts);
    const s6 = this.chartService.getPercentage(this.chartData.section6.parts);
    const keyProcess = (parseFloat(s2) + parseFloat(s3) + parseFloat(s4) + parseFloat(s5) + parseFloat(s6)) / 5;
    const precision = this.chartService.getPrecision(keyProcess);
    this.process.keyProcess = keyProcess.toPrecision(precision);
  }

  getBarOptions() {
    return {
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 9
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100
          }
        }]
      },
      legend: {
        display: false
      },
      animation: this.chartService.getAnimationOptionsConfig(),
      tooltips: { enabled: false }
    };
  }

  getBarDataLabels() {
    const array = [];

    array.push(this.chartData.section1.name);
    array.push(this.chartData.section2.name);
    array.push(this.chartData.section3.name);
    array.push(this.chartData.section4.name);
    array.push(this.chartData.section5.name);
    array.push(this.chartData.section6.name);
    array.push(this.chartData.section7.name);

    return array;
  }

  getBarDataSets() {
    const array = [];
    array.push({
      label: this.chartData.section1.name,
      data: [
        parseInt(this.chartData.section1.parts[0].value + '', 10),
        parseInt(this.chartData.section2.parts[0].value + '', 10),
        parseInt(this.chartData.section3.parts[0].value + '', 10),
        parseInt(this.chartData.section4.parts[0].value + '', 10),
        parseInt(this.chartData.section5.parts[0].value + '', 10),
        parseInt(this.chartData.section6.parts[0].value + '', 10),
        parseInt(this.chartData.section7.parts[0].value + '', 10),
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    array.push({
      label: this.chartData.section2.name,
      data: [
        parseInt(this.chartData.section1.parts[1].value + '', 10),
        parseInt(this.chartData.section2.parts[1].value + '', 10),
        parseInt(this.chartData.section3.parts[1].value + '', 10),
        parseInt(this.chartData.section4.parts[1].value + '', 10),
        parseInt(this.chartData.section5.parts[1].value + '', 10),
        parseInt(this.chartData.section6.parts[1].value + '', 10),
        parseInt(this.chartData.section7.parts[1].value + '', 10),
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    array.push({
      label: this.chartData.section3.name,
      data: [
        parseInt(this.chartData.section1.parts[2].value + '', 10),
        parseInt(this.chartData.section2.parts[2].value + '', 10),
        parseInt(this.chartData.section3.parts[2].value + '', 10),
        0,
        0,
        0,
        parseInt(this.chartData.section7.parts[2].value + '', 10),
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
        parseInt(this.chartData.section7.parts[3].value + '', 10),
      ],
      borderColor: 'blue',
      backgroundColor: 'rgb(107,142,35,0.6)',
      fill: true
    });

    return array;
  }

  getSectionValues(labels: string[]) {
    this.sections.push({ label: '1 ' + labels[0], value: this.chartService.getPercentage(this.chartData.section1.parts) });
    this.sections.push({ label: '2 ' + labels[1], value: this.chartService.getPercentage(this.chartData.section2.parts) });
    this.sections.push({ label: '3 ' + labels[2], value: this.chartService.getPercentage(this.chartData.section3.parts) });
    this.sections.push({ label: '4 ' + labels[3], value: this.chartService.getPercentage(this.chartData.section4.parts) });
    this.sections.push({ label: '5 ' + labels[4], value: this.chartService.getPercentage(this.chartData.section5.parts) });
    this.sections.push({ label: '6 ' + labels[5], value: this.chartService.getPercentage(this.chartData.section6.parts) });
    this.sections.push({ label: '7 ' + labels[6], value: this.chartService.getPercentage(this.chartData.section7.parts) });
  }

  getColor(sectionValue: string) {
    return this.chartService.getColor(sectionValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.chartData.currentValue) {
      this.handleBar();
    }
  }

  getDisplayValue(value) {
    return this.chartService.getDisplayValue(value);
  }


}
