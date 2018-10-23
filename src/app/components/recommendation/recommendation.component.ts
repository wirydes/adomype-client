import { Component, OnInit, Input } from '@angular/core';
import { MatureProfileChartModel } from 'src/app/models/mature.profile.chart.model';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  @Input() chartData: MatureProfileChartModel;
  constructor() { }

  ngOnInit() {
  }

}
