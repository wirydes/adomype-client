import { Component, OnInit } from '@angular/core';
import { GraphicsService } from '../../services/graphics.service';
import { SurveyDropDownModel } from '../../models/survey.dropdown.model';
import { BaseComponent } from '../../shared/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartsConfigModel } from '../../models/charts.config.model';
import * as chartTypes from '../../models/chart.type';

const titleStrategicProces = 'Situacion actual de los procesos estrategicos';
const titleSupportProcess = 'Gestionar Recursos';
@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent extends BaseComponent implements OnInit {
  types = chartTypes;
  dropdownInfo: SurveyDropDownModel[] = [];
  form: FormGroup;
  chartInfo: ChartsConfigModel;
  supportProcess = titleSupportProcess;
  strategicProcess = titleStrategicProces;
  constructor(private graphicsService: GraphicsService, private toastrService: ToastrService, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      token: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.chartInfo = null;
    const token = this.form.get('token').value;
    this.onSubscribe.push(this.graphicsService.getSurveyChartByToken(token).subscribe((data) => {
      this.chartInfo = data;
    }, (error) => {
      this.toastrService.error('Token invalido', 'Error!');
    }));
  }

  isDisabled() {
    const id = this.form.get('token').value;

    return !id;
  }

}
