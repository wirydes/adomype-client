import { Component, OnInit, Input } from '@angular/core';
import { MatureProfileChartModel } from 'src/app/models/mature.profile.chart.model';
import { ChartService } from 'src/app/services/chart.service';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  @Input() chartData: MatureProfileChartModel;
  sections: number[] = [];
  recomendations: {section: number, part: number, color: SafeStyle}[] = [];
  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.checkPart(1, 1);
    this.checkPart(1, 2);
    this.checkPart(1, 3);
    this.checkPart(2, 1);
    this.checkPart(2, 2);
    this.checkPart(2, 3);
    this.checkPart(3, 1);
    this.checkPart(3, 2);
    this.checkPart(3, 3);
    this.checkPart(4, 1);
    this.checkPart(4, 2);
    this.checkPart(5, 1);
    this.checkPart(5, 2);
    this.checkPart(6, 1);
    this.checkPart(6, 2);
    this.checkPart(7, 1);
    this.checkPart(7, 2);
    this.checkPart(7, 3);
    this.checkPart(7, 4);

  }

  checkPart(section: number, part: number): boolean {
    const sectionTitle = 'section';
    const sectionName = sectionTitle + section;
    const partValue = this.chartData[sectionName].parts.find((element, index) => {
      return (index + 1) === part;
    });

    if (!!partValue) {
      const value = parseInt(partValue.value, 10);
      const matureLv = this.chartService.getMatureLv(value);
      if (matureLv === 'Artesanal' || matureLv === 'Incipiente') {
        this.sections.push(section);
        this.recomendations.push({section, part, color: this.chartService.getColor(value + '')});
        return true;
      }
    }

    return false;
  }

  checkProcessTitle(section) {
    return this.sections.some((item) => {
      return item === section;
    });
  }

  checkRecomendation(section: number, part: number) {
    return this.recomendations.some((item) => {
      return item.section === section && item.part === part;
    });
  }

  getColor(section: number, part: number) {
    const selected = this.recomendations.find((item) => {
      return item.section === section && item.part === part;
    });

    if (selected) {
      return selected.color;
    }
  }





}
