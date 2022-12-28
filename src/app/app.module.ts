import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxCaptureModule } from 'ngx-capture';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from './service/excel.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './device/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './service/loader.interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DashboardeventComponent } from './event-page/dashboardevent/dashboardevent.component';
import { HistoryComponent } from './history/history.component';
import { DashboardtrackingComponent } from './tracking-page/dashboardtracking/dashboardtracking.component';
import { FaceDatatableComponent } from './tracking-page/dashboardtracking/face-datatable/face-datatable.component';
import { LprDatatableComponent } from './tracking-page/dashboardtracking/lpr-datatable/lpr-datatable.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DailyreportComponent } from './daily-report/dailyreport/dailyreport.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardeventComponent,
    HistoryComponent,
    DashboardtrackingComponent,
    FaceDatatableComponent,
    LprDatatableComponent,
    DailyreportComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatIconModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxCaptureModule,
    LeafletModule,
    NgbModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    ScrollingModule,
    Ng2SearchPipeModule

  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
