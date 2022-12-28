import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RootDevices,
  Device,
  Summarize,
  Chart,
  Heatmap,
  TSKDeviceRoot,
  LogRootObject,
  LogMonthRootObject,
  LogHoursObject,
  LogWeeklyObject,
  LogMonthlyObject,
  EventHistoryObject,
  FRObject,
  LPRObject,
  FRRoute,
  LPRRoute,
  UserProfile,
  SiteReport
} from '../models/model'

@Injectable({
  providedIn: 'root'
})
export class ServiceDevicesService {
 

  private jsonURL = 'assets/config.json';

  responseDevicesType!: RootDevices;
  responseChart: Chart[] = [];
  responseHeatmap: Heatmap[] = [];
  responseTSKDevice!: TSKDeviceRoot;
  responseTSKLog!: LogRootObject;
  responseTSKLogMonth!: LogMonthRootObject;
  count!: number;
  id!: number;
  responseTSKLogEvent!: LogHoursObject;
  responseTSKLogWeekly!: LogWeeklyObject;
  responseTSKLogMonthly!: LogMonthlyObject;
  responseTSKEventHistory! : EventHistoryObject;
  responseTSKDataFR!: FRObject;
  responseTSKDataFRRoute!: FRRoute;
  responseTSKDataLPR!: LPRObject;
  responseTSKDataLPRRoute! : LPRRoute;
  UserProfiledData!:UserProfile;
  SiteReportData!:SiteReport;
  timer = 0;

  constructor(private http: HttpClient) {

  }

  
  async login() {
    let envKey = await this.getEnvbyAPI('authen');

    let res = await this.http.get(this.jsonURL).toPromise();
    let data: any = res;
    

     //let body = {
      // "LOGIN_USERNAME": data.LOGIN.USER,
       //"LOGIN_PASSWORD": data.LOGIN.PASS
     //};
    
     let body = {
        "LOGIN_USERNAME":"gfin@gfinthailand.com",
        "LOGIN_PASSWORD":"123456",
        "FIREBASE_TOKEN": ""
     };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    let port = '20130'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.post(env + "login", body, { headers }).toPromise();
    
  }

  async loginGSOC() {
    let envKey = await this.getEnvbyAPI('authen2');

    let res = await this.http.get(this.jsonURL).toPromise();
    let data: any = res;
    

     //let body = {
      // "LOGIN_USERNAME": data.LOGIN.USER,
       //"LOGIN_PASSWORD": data.LOGIN.PASS
     //};
    
     let body = {
        "LOGIN_USERNAME":"gfin@gfinthailand.com",
        "LOGIN_PASSWORD":"123456",
        "FIREBASE_TOKEN": ""
     };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    let port = '20130'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.post(env + "login", body, { headers }).toPromise();
    
  }


  async getTimeInterval() {
    let res = await this.http.get(this.jsonURL).toPromise();
    let data: any = res;
    return data.CONFIG.SET_TIME_INTERVAL;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  async apiCheckToken(): Promise<any> {
    await this.delay(1000);
    let envKey = await this.getEnvbyAPI('authen');

    let body = {
      authorization: localStorage.getItem('token'),
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let port = '20130'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.post(env + "authentication", body, { headers }).toPromise();
  }

  async apiCheckTokenGSOC(): Promise<any> {
    await this.delay(1000);
    //let envKey = await this.getEnvbyAPI('authen');

    let body = {
      authorization: localStorage.getItem('token'),
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let port = '20130'
    let env = 'http://' + '54.169.17.226' + ':' + port + '/';

    return this.http.post(env + "authentication", body, { headers }).toPromise();
  }

  async apiGetNewToken() {

    let token = await this.apiCheckToken()

    if (token.status != 200) {
      let newToken = await this.apiRefreshToken()
      if (newToken.status == 200) {
        localStorage.setItem('token', newToken.data.token);
        localStorage.setItem('refreshtoken', newToken.data.refresh_token);
      }
    }

  }

  
  async apiGetNewTokenGSOC() {

    let token = await this.apiCheckTokenGSOC()

    if (token.status != 200) {
      let newToken = await this.apiRefreshTokenGSOC()
      if (newToken.status == 200) {
        localStorage.setItem('token', newToken.data.token);
        localStorage.setItem('refreshtoken', newToken.data.refresh_token);
      }
    }

  }

  async apiRefreshToken(): Promise<any> {

    let envKey = await this.getEnvbyAPI('authen');

    let body = {
      JWT_REFRESH: localStorage.getItem('refreshtoken'),
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let port = '20130'
    let env = 'http://' + envKey + ':' + port + '/';
    return this.http.post(env + "authentication/refreshToken", body, { headers }).toPromise();
  }

  async apiRefreshTokenGSOC(): Promise<any> {

    //let envKey = await this.getEnvbyAPI('authen');

    let body = {
      JWT_REFRESH: localStorage.getItem('refreshtoken'),
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let port = '20130'
    let env = 'http://' + "54.169.17.226" + ':' + port + '/';
    return this.http.post(env + "authentication/refreshToken", body, { headers }).toPromise();
  }

  async getEnvbyAPI(params: string): Promise<string> {
    let res = await this.http.get(this.jsonURL).toPromise();
    let data: any = res;
    let env = '';
    switch (params) {
      case 'authen':
        env = data.ENV.URL_AUTHEN;
        break;
      case 'authen2':
        env = data.ENV.URL_AUTHEN_GSOC;
        break;
      case 'device':
        env = data.ENV.URL_DEVICE;
        break;
      case 'lineChart':
        env = data.ENV.URL_BARCHART;
        break;
      case 'heatmap':
        env = data.ENV.URL_HEATMAP;
        break;
      case 'location':
        env = data.ENV.URL_LOCATION;
        break;
      case 'listsite':
        env = data.ENV.URL_LISTSITE;
        break;
      case 'log':
        env = data.ENV.URL_LOG;
        break;
      case 'logMonth':
        env = data.ENV.URL_LOGMONTH;
        break;
     case 'EventHours':
        env = data.ENV.URL_EVENTHOURS;
        break;
      case 'EventWeekly':
        env = data.ENV.URL_EVENTWEEKLY;
        break;
      case 'EventHistory':
        env = data.ENV.URL_EVENTHISTORY;
        break;
      case 'DataFR':
        env = data.ENV.URL_FR;
        break;
      case 'Report':
        env = data.ENV.URL_REPORT;
        break;
      default:
        env = data.ENV.URL;
        break;
    }
    return env;
  }
  
/*
  async getSummarizeDeviceType() {
    let envKey = await this.getEnvbyAPI('device');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    // Server Gfin
    let port = '20147'
  
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<RootDevices>(env + 'andaman/summarize/device_type', { headers: headerDict }).toPromise();
  }
*/

  
  async getTSKsummarydashboardAll() {
    
    let envKey = await this.getEnvbyAPI('device');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    // Server Gfin
    let port = '20147'

    let env = 'http://' + envKey + ':' + port + '/';


    return this.http.get<TSKDeviceRoot>(env + 'tsk-dashboard/summarize/device_type', { headers: headerDict }).toPromise();
  }

  async getTSKsummarydashboard(LocationSite:any) {
    
    let envKey = await this.getEnvbyAPI('device');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    // Server Gfin
    let port = '20147'

    let env = 'http://' + envKey + ':' + port + '/';
    //console.log('locationSite in service',LocationSite)

    return this.http.get<TSKDeviceRoot>(env + 'tsk-dashboard/summarize/device_type/locations?site_ids='+LocationSite, { headers: headerDict }).toPromise();

  }

  async getLog(startDate: string, stopDate: string, LocationSite:any) {
    let envKey = await this.getEnvbyAPI('log');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let DeviceType:any = [1,2,3,5];
    let params = new HttpParams()
    
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('SITE_IDS', LocationSite)
      .set('DEVICE_TYPE',DeviceType);

    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<LogRootObject>(env + 'tsk-dashboard/status/weekly', { headers: headerDict, params: params }).toPromise();

  }

  async getLogMonth(startDate: string, stopDate: string, LocationSite:any) {
    let envKey = await this.getEnvbyAPI('logMonth');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let DeviceType:any = [1,2,3,5];
    let params = new HttpParams()
    
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('SITE_IDS', LocationSite)
      .set('DEVICE_TYPE',DeviceType);

    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<LogMonthRootObject>(env + 'tsk-dashboard/status/monthly', { headers: headerDict, params: params }).toPromise();

  }






  /////////////////////////////////////////////////////////////////
  async getSummarizeDeviceTypeByLocationID(locationID: string) {
    let envKey = await this.getEnvbyAPI('device');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }


    let params = new HttpParams()
      .set('location_id', locationID);

    // Server Gfin
    let port = '20147' 
    // Server Andaman
    // let port = '20147' 
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<RootDevices>(env + 'andaman/summarize/device_type/locations', { headers: headerDict, params: params }).toPromise();
  }


  async getLineChart(startDate: string, stopDate: string, locationID:string) {
    let envKey = await this.getEnvbyAPI('lineChart');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let params = new HttpParams()
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('LOCATION_ID', locationID);

    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<Chart>(env + 'andaman/dashboard/barchart', { headers: headerDict, params: params }).toPromise();

  }

  async getLineChartManyMouth(startDate: string, stopDate: string, locationID:string){
    let envKey = await this.getEnvbyAPI('lineChart');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let params = new HttpParams()
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('LOCATION_ID', locationID);

    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<Chart>(env + 'andaman/dashboard/barchart/mouth', { headers: headerDict, params: params }).toPromise();

  }

  async getHeatmap(startDate: string, stopDate: string, locationID: string) {
    let envKey = await this.getEnvbyAPI('heatmap');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let params = new HttpParams()
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('LOCATION_ID', locationID);

    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<Heatmap>(env + 'andaman/dashboard/heatmap', { headers: headerDict, params: params }).toPromise();
  }
  

  async getAllLocation() {
    let envKey = await this.getEnvbyAPI('location');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let port = '20132'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get(env + 'andaman/listlocation', { headers: headerDict }).toPromise();
  }

  async getAllLocationTSK () {
    let envKey = await this.getEnvbyAPI('listsite');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let port = '20132'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get(env + 'tsk-dashboard/listsite', { headers: headerDict }).toPromise();
  }

  async getEventHours(stopDate: string, LocationSite:any) {
    let envKey = await this.getEnvbyAPI('EventHours');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let params = new HttpParams()
    
      .set('DATE', stopDate)
      .set('SITE_IDS', LocationSite)


    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<LogHoursObject>(env + 'tsk-dashboard/event/hours', { headers: headerDict, params: params }).toPromise();

  }

  
  async getEventWeekly(startDate: string, stopDate: string, locationID: string) {
    let envKey = await this.getEnvbyAPI('EventWeekly');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let params = new HttpParams()
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('SITE_IDS', locationID);


    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<LogWeeklyObject>(env + 'tsk-dashboard/event/weekly', { headers: headerDict, params: params }).toPromise();

  }

  async getEventMonthly(startDate: string, stopDate: string, locationID: string) {
    let envKey = await this.getEnvbyAPI('EventWeekly');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let params = new HttpParams()
      .set('START_DATETIME', startDate)
      .set('STOP_DATETIME', stopDate)
      .set('SITE_IDS', locationID);


    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<LogMonthlyObject>(env + 'tsk-dashboard/event/monthly', { headers: headerDict, params: params }).toPromise();

  }

  async getEventHistory(valueEvent: string, valueCalendar: string) {
    let envKey = await this.getEnvbyAPI('EventHistory');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let params = new HttpParams()
      .set('DATE', valueCalendar)
      .set('EVENT_IDs', valueEvent);
  


    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.get<EventHistoryObject>(env + 'tsk-dashboard/event/histtory/dairy', { headers: headerDict, params: params }).toPromise();

  }

  async getDataFR(startRange:any,stopRange:any,EmployeeName:any,PageSelect:any) {
    let page = "1";
    let limit= "12";
    let envKey = await this.getEnvbyAPI('DataFR');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    if(EmployeeName == ''){
      let params = new HttpParams()
      .set('START_DATE', startRange)
      .set('STOP_DATE', stopRange)
      .set('PAGE',PageSelect)

      params = params.set('LIMIT',limit);   
      let port = '20139'
      let env = 'http://' + envKey + ':' + port + '/';

      return this.http.get<FRObject>(env + 'tsk-dashboard/tracking/fr/group', { headers: headerDict, params: params }).toPromise();
    }
    else{
      let params = new HttpParams()
      .set('START_DATE', startRange)
      .set('STOP_DATE', stopRange)
      .set('NAME',EmployeeName)
      .set('PAGE',PageSelect)

      
      params = params.set('LIMIT',limit);   
      let port = '20139'
      let env = 'http://' + envKey + ':' + port + '/';

     return this.http.get<FRObject>(env + 'tsk-dashboard/tracking/fr/group', { headers: headerDict, params: params }).toPromise();
    }
  }

  async getDataFRRoute(startRange:any,stopRange:any,firstname:any,lastname:any,PageSelect:any,LAST_ID:any) {
    if (PageSelect == undefined){
      PageSelect == 1;
    }
    let limit= "11";
    let envKey = await this.getEnvbyAPI('DataFR');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }


      let params = new HttpParams()
      .set('START_DATE', startRange)
      .set('STOP_DATE', stopRange)
      .set('FIRST_NAME',firstname)
      .set('LAST_NAME',lastname)
      .set('PAGE',PageSelect)
      .set('LIMIT',limit)

      if(LAST_ID != undefined){
        params = params.append('LAST_ID',LAST_ID);
      }

      let port = '20139'
      let env = 'http://' + envKey + ':' + port + '/';

      return this.http.get<FRRoute>(env + 'tsk-dashboard/tracking/fr/byname', { headers: headerDict, params: params }).toPromise();
    
  }

  async getDataLPR(startRange:any,stopRange:any,CarPlate:any,CarProvince:any,CarType:any,CarBrand:any,CarModel:any,CarColor:any,CarLocation:any,PageSelect:any) {
    let limit= "12";
    let CarPlateData = CarPlate;
    let envKey = await this.getEnvbyAPI('DataFR');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

      let params = new HttpParams()
      .set('START_DATE', startRange)
      .set('STOP_DATE', stopRange);

      if(CarPlate != ''){
        params = params.append('LPR_LICENSE',CarPlate);
      }
      if(CarProvince != ''){
        params = params.append('LPR_PROVINCE',CarProvince);
      }
      if(CarType != ''){
        params = params.append('LPR_TYPE_CAR',CarType);
      }
      if(CarBrand != ''){
        params = params.append('LPR_BRAND_CAR',CarBrand);
      }
      if(CarModel != ''){
        params = params.append('LPR_MODEL_CAR',CarModel);
      }
      if(CarColor != ''){
        params = params.append('LPR_COLOR_CAR',CarColor);
      }
      if(CarLocation != ''){
        params = params.append('LOCATION_ID',CarLocation);
      }
      if(PageSelect == ''){
        PageSelect = 1;
        params = params.append('PAGE',PageSelect);
      }
      
      if(PageSelect != ''){
        params = params.append('PAGE',PageSelect);
      }
      params = params.set('LIMIT',limit);   


      //console.log("Params =",params);
      let port = '20139'
      let env = 'http://' + envKey + ':' + port + '/';

      return this.http.get<LPRObject>(env + 'tsk-dashboard/tracking/lpr/group', { headers: headerDict, params: params }).toPromise();
    
  }

  async getDataLPRRoute(startRange:any,stopRange:any,plate:any,PageSelect:any,LAST_ID:any) {
    let limit= "12";
    let envKey = await this.getEnvbyAPI('DataFR');
    await this.apiGetNewToken();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }


      let params = new HttpParams()
      .set('START_DATE', startRange)
      .set('STOP_DATE', stopRange)
      .set('LPR_LICENSE',plate)
      .set('PAGE',PageSelect)
      .set('LIMIT',limit)

      if(LAST_ID != undefined){
        params = params.append('LAST_ID',LAST_ID);
      }

      let port = '20139'
      let env = 'http://' + envKey + ':' + port + '/';

      return this.http.get<LPRRoute>(env + 'tsk-dashboard/tracking/lpr/byplate', { headers: headerDict, params: params }).toPromise();
    
  }

  async getReport(START_DATE:any,STOP_DATE:any,START_TIME:any,STOP_TIME:any,LocationSite:any,Device:any,Event:any,Page:any,Word:any) {
    let envKey = await this.getEnvbyAPI('Report');
    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    if (START_TIME == undefined && STOP_TIME == undefined) {
      START_TIME = "00:00";
      STOP_TIME = "00:00";
    }

    if (LocationSite == "" ){
      LocationSite = "";

    }
    if (Device == ""){
      Device = "";
    }
    if (Event == ""){
      Event = "";
    }
    if (Page == undefined){
      Page = 1;
    }
    if (Word == undefined){
      Word = '';
    }
    
     let body = {
      "KEY_WORD": Word,
      "START_DATE": START_DATE,
      "START_TIME": START_TIME,
      "STOP_DATE": STOP_DATE,
      "STOP_TIME": STOP_TIME,
      "SITE_IDS": LocationSite,
      "DEVICE_IDS": Device,
      "EVENT_IDS": Event,
      "PAGE": Page,
      "LIMIT": 25,
     };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.post(env + "gsoc/exports/dairy", body, { headers: headerDict }).toPromise();
    
  }

  async getReportExport(START_DATE:any,STOP_DATE:any,START_TIME:any,STOP_TIME:any,LocationSite:any,Device:any,Event:any) {
    let envKey = await this.getEnvbyAPI('Report');
    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    if (START_TIME == undefined && STOP_TIME == undefined) {
      START_TIME = "00:00";
      STOP_TIME = "00:00";
    }

    if (LocationSite == "" ){
      LocationSite = "";

    }
    if (Device == ""){
      Device = "";
    }
    if (Event == ""){
      Event = "";
    }
    
     let body = {
      "START_DATE": START_DATE,
      "START_TIME": START_TIME,
      "STOP_DATE": STOP_DATE,
      "STOP_TIME": STOP_TIME,
      "SITE_IDS": LocationSite,
      "DEVICE_IDS": Device,
      "EVENT_IDS": Event
     };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    let port = '20139'
    let env = 'http://' + envKey + ':' + port + '/';

    return this.http.post(env + "gsoc/exports/dairy", body, { headers: headerDict }).toPromise();
    
  }

  async getUserProfile() {
    //let envKey = await this.getEnvbyAPI('location');
    await this.apiGetNewTokenGSOC();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let port = '20131'
    let env = 'http://' + '54.169.17.226' + ':' + port + '/';

      return this.http.get<UserProfile>(env + 'gsoc/user/profile', { headers: headerDict}).toPromise();
    
  }

  async getSiteReport(SITE_REPORT:any) {
    //let envKey = await this.getEnvbyAPI('location');
    await this.apiGetNewTokenGSOC();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let body = {
      "SITE_ID": SITE_REPORT,
     };

    let port = '20139'
    let env = 'http://' + '54.169.17.226' + ':' + port + '/';

      return this.http.post(env + 'gsoc/exports/sitelist', body, { headers: headerDict }).toPromise();
    
  }

  async getDeviceReport(DEVICE_REPORT:any) {
    //let envKey = await this.getEnvbyAPI('location');
    await this.apiGetNewTokenGSOC();

    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    let body = {
      "DEVICE_IDS": DEVICE_REPORT,
     };

    let port = '20139'
    let env = 'http://' + '54.169.17.226' + ':' + port + '/';

      return this.http.post(env + 'gsoc/exports/devicelist', body, { headers: headerDict }).toPromise();
    
  }

 



}
