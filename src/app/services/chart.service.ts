import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private sanitizer: DomSanitizer) { }

  getPercentage(parts): string {
    let summary = 0;
    let i = 0;
    parts.forEach(element => {
      summary += element.value;
      i++;
    });
    const precision = this.getPrecision(summary);
    const result = (summary / i).toPrecision(precision);

    return result;
  }

  getPrecision(value: number): number {
    return value === 100 ? 3 : 2;
  }

  getAnimationOptionsConfig() {
    return {
      duration: 500,
      easing: 'easeOutQuart',
      onComplete: function () {
        const ctx = this.chart.ctx;
        const chart = this;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        if (!!this.data) {
          this.data.datasets.forEach((dataset, i) => {
            ctx.fillStyle = 'black';
            chart.getDatasetMeta(i).data.forEach((p, j) => {
              const value = this.data.datasets[i].data[j];
              if (value !== 0 && value !== null) {
                const precision = value === 100 ? 3 : 2;
                // const iX = p._model.x < 0 ? -10 : 10;
                // const iY = p._model.y < 0 ? -10 : 10;
                ctx.fillText(value.toPrecision(precision) + '%', p._model.x + 10 , p._model.y + 10);
              }
            });
          });
        }
      }
    };
  }

  getColor(sectionValue: string) {
    const value = parseFloat(sectionValue);

    if (value > 84) {
      return this.sanitizer.bypassSecurityTrustStyle('background-color: green;');
    }

    if (value > 61) {
      return this.sanitizer.bypassSecurityTrustStyle('background-color: yellow;');
    }

    if (value > 32) {
      return this.sanitizer.bypassSecurityTrustStyle('background-color: orange;');
    }

    return this.sanitizer.bypassSecurityTrustStyle('background-color: red;');
  }

  getMaturePercentage(value: number) {
    if (value > 84) {
      return 'Maduro';
    }

    if (value > 61) {
      return 'En desarrollo';
    }

    if (value > 32) {
      return 'Artesanal';
    }

    return 'Incipiente';
  }
}
