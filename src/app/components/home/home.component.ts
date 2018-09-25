import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { SurveyDropDownModel } from '../../models/survey.dropdown.model';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  dropdownInfo: SurveyDropDownModel[] = [];
  constructor(private graphicsService: GraphicsService) {
    super();
  }

  ngOnInit() {
    this.onSubscribe.push(this.graphicsService.getDropDownInfo().subscribe((data) => {
      this.dropdownInfo = data;
    }, (error) => {
      //
    }));
  }

}
