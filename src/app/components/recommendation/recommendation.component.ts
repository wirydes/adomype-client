import { Component, OnInit, Input } from '@angular/core';
import { MatureProfileChartModel } from 'src/app/models/mature.profile.chart.model';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  @Input() chartData: MatureProfileChartModel;
  constructor(private chartService: ChartService) { }

  ngOnInit() {
  }

  checkPart(section: number, part: number): boolean {
    const sectionTitle = 'section';
    const sectionName = sectionTitle + section;
    const partValue = this.chartData[sectionName].parts.find((element, index) => {
      return (index + 1) === part;
    });

    if (partValue !== undefined) {
      const percentage = this.chartService.getMaturePercentage(parseFloat(partValue));
      if (percentage === 'Artesanal' || percentage === 'Incipiente') {
        return true;
      }
    }

    return false;
  }



}
