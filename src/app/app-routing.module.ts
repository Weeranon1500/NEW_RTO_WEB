import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyreportComponent } from './daily-report/dailyreport/dailyreport.component';
import { DashboardeventComponent } from './event-page/dashboardevent/dashboardevent.component';
import { DashboardComponent } from './device/dashboard/dashboard.component';
import { DashboardtrackingComponent } from './tracking-page/dashboardtracking/dashboardtracking.component';

const routes: Routes = [
  { path: 'device', component: DashboardComponent},
  { path: 'event', component: DashboardeventComponent},
  { path: 'track', component: DashboardtrackingComponent},
  { path: 'report', component: DailyreportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
