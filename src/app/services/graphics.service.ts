import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyDropDownModel } from '../models/survey.dropdown.model';
import { ChartsConfigModel } from '../models/charts.config.model';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {
  // update this to the real endpoint
  private url = 'http://localhost:3000/api/adomype';

  constructor(private http: HttpClient) { }

  getDropDownInfo(): Observable<SurveyDropDownModel[]> {
    return this.http.get<SurveyDropDownModel[]>(this.url + '/dropdown/info');
  }

  getSurveyChartInfo(id: number): Observable<ChartsConfigModel> {
    return this.http.get<ChartsConfigModel>(this.url + '/chart/config/' + id);
  }

  getSurveyChartByToken(token: string): Observable<ChartsConfigModel> {
    return this.http.get<ChartsConfigModel>(this.url + '/chart/' + token);
  }
}
