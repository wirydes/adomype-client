import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { SurveyDropDownModel } from '../../models/survey.dropdown.model';
import { BaseComponent } from '../../shared/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartsConfigModel } from '../../models/charts.config.model';
import * as chartTypes from '../../models/chart.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  types = chartTypes;
  dropdownInfo: SurveyDropDownModel[] = [];
  form: FormGroup;
  chartInfo: ChartsConfigModel;

  constructor(private graphicsService: GraphicsService, private toastrService: ToastrService, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      selected: [0]
    });
  }

  ngOnInit() {
    this.onSubscribe.push(this.graphicsService.getDropDownInfo().subscribe((data) => {
      this.dropdownInfo = data;
    }, (error) => {

      setTimeout(() => this.toastrService.error(error.message, 'Error'), 0);
    }));
  }

  onSubmit() {
    const id = this.form.get('selected').value;
    this.onSubscribe.push(this.graphicsService.getSurveyChartInfo(id).subscribe((data) => {
      this.chartInfo = data;
    }, (error) => {
      this.toastrService.error(error.message, 'Error');
    }));
  }

}
