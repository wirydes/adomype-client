import { StudentHomeComponent } from './components/student-home/student-home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'home',
    component: StudentHomeComponent
},
{
    path: '',
    component: StudentHomeComponent
}
,
{
    path: 'diagnostico',
    component: StudentHomeComponent
}
];
