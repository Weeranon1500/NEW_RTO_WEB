import { Component, Input, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { Chart, Device, } from '../../models/model'
import { interval } from 'rxjs';
import * as ApexCharts from 'apexcharts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common'


declare let html2canvas: any;

@Component({
  selector: 'app-dashboardevent',
  templateUrl: './dashboardevent.component.html',
  styleUrls: ['./dashboardevent.component.css']
})
export class DashboardeventComponent implements OnInit {

  save(fileName: string){
    // First we get our section to save from dom


    // We pass that section to html2Canvase
      html2canvas(document.querySelector('#BlockCapture'), {allowTaint: false, useCORS: true}).then((canvas: { toDataURL: () => string; }) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
    });
  }

  export(fileName: string){
    // First we get our section to save from dom


    // We pass that section to html2Canvase
      html2canvas(document.querySelector('#BlockCapture2'), {allowTaint: false, useCORS: true}).then((canvas: { toDataURL: () => string; }) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
    });
  }

  canvas:any;
  

  public DateTimeCalendar!: Date;
  jsonURL = 'assets/config.json';

  public EventHistoryTransfer: any = [];
  public limitDate = new Date();
  
  deviceTypeLength: boolean = false;
  totalDevices: any
  problemDevices: any

  //Map
  ListLatLon: any[] = []
  LatLonFocus!: any
  switchMap = false;

  //Total Devices Type
  totalDevicesType!: Device[]
  itemTotalDevicesType: any[] = []

  //Status Online Offline
  serverOnline: any
  serverOffline: any
  serverTotal: any

  workstationOnline: any
  workstationOffline: any
  workstationTotal: any

  nvrOnline: any
  nvrOffline: any
  nvrTotal: any

  cctvOnline: any
  cctvOffline: any
  cctvtampering: any
  cctvTotal: any

  switchNetworkOnline: any
  switchNetworkOffline: any
  switchNetworkTotal: any

  //Progress bar
  mode2: ProgressBarMode = 'determinate';
  valueSever = 60;
  items: any[] = ['1', '2', '3', '4']; //test

  //Progress spinner
  mode: ProgressSpinnerMode = 'determinate';
  diameterOnline: any;
  diameterOffline: any
  strokeWidth: any;

  diameterOnlineServer: any;
  diameterOfflineServer: any
  strokeWidthServer: any;

  diameterOnlineWorkstation: any;
  diameterOfflineWorkstation: any
  strokeWidthWorkstation: any;

  diameterOnlineNvr: any;
  diameterOfflineNvr: any
  strokeWidthNvr: any;

  diameterOnlineSwitchNetwork: any;
  diameterOfflineSwitchNetwork: any
  strokeWidthSwitchNetwork: any;

  diameterOnlineCctv: any;
  diameterOfflineCctv: any;
  diameterTamperingCctv: any;
  strokeWidthCctv: any;

  valueServerTotal : number = 0;
  valueServerOnline: number = 0;
  valueServerOffline: number = 0;

  valueWorkstationOnline: number = 0;
  valueWorkstationOffline: number = 0;

  valuenvrTotal : number = 0;
  valueNvrOnline: number = 0;
  valueNvrOffline: number = 0;

  valueCctvTotal : number = 0;
  valueCctvOnline: number = 0;
  valueCctvOffline: number = 0;
  valueCctvTampering: number = 0;

  valueSwitchNetworkTotal: number = 0;
  valueSwitchNetworkOnline: number = 0;
  valueSwitchNetworkOffline: number = 0;

  StatusOpen :any;
  StatusClose :any;
  StatusInprocess : any;
  // Pie Chart
  public optionsPie: any
  Device: any
  Problem: any
  width: any

  //Line Chart
  public optionsLine: any
  fontSize: any
  markersSize: any

  public RadialchartOptions:any
  public DonutchartOptions:any
  public LinechartOptions:any
  public BarchartOptions:any


  //select location
  currentLocationID: string = ''
  selectedLocationModel: any = 'ทั้งหมด'
  selectedLocation: any[] = [
    { id: '', name: 'ทั้งหมด' }
  ]


  currentLocationSite: any = [] 
  currentLocationValue: any = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15] 
  selectedSiteLocationModel: any = 'ทั้งหมด'
  selectedSiteLocation: any[] = [
  /*{id: 1, name: "การ์เด้น โฮม วิลเลจ", group: "ทั้งหมด"},
  {id: 2, name: "ซิงค์", group: "ทั้งหมด"},
  {id: 3, name: "บริษัท ไอเอฟเอส ฟาซิลิตี้ เซอร์วิสเซส จำกัด", group: "ทั้งหมด"},
  {id: 4, name: "บริษัท สกาย ไอซีที จำกัด (มหาชน)", group: "ทั้งหมด"},
  {id: 5, name: "เนอวานา อิลิเม้นท์ บางนา", group: "ทั้งหมด"},
  {id: 6, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ธนบุรี", group: "ทั้งหมด"},
  {id: 8, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ฉะเชิงเทรา", group: "ทั้งหมด"},
  {id: 9, name: "อายิโนะโมะโต๊ะเซลส์ สาขา รามอินทรา", group: "ทั้งหมด"},
  {id: 10, name: "อาคารทดสอบตรวจจับใบหน้า", group: "ทั้งหมด"},
  {id: 11, name: "อายิโนะโมะโต๊ะเซลส์ สาขา บางปู", group: "ทั้งหมด"},
  {id: 12, name: "อายิโนะโมะโต๊ะเซลส์ สาขา นนทบุรี", group: "ทั้งหมด"},
  {id: 13, name: "อายิโนะโมะโต๊ะเซลส์ สาขา พัฒนาการ", group: "ทั้งหมด"},
  {id: 14, name: "อายิโนะโมะโต๊ะเซลส์ สาขา หาดใหญ่", group: "ทั้งหมด"}*/
  ]
  selectedSiteLocationName:any []=[]

  currentLocationSite2: any = [] 
  currentLocationValue2: any = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15]
  selectedSiteLocationModel2: any = 'ทั้งหมด'
  selectedSiteLocation2: any[] = [
  /*{id: 1, name: "การ์เด้น โฮม วิลเลจ", group: "ทั้งหมด"},
  {id: 2, name: "ซิงค์", group: "ทั้งหมด"},
  {id: 3, name: "บริษัท ไอเอฟเอส ฟาซิลิตี้ เซอร์วิสเซส จำกัด", group: "ทั้งหมด"},
  {id: 4, name: "บริษัท สกาย ไอซีที จำกัด (มหาชน)", group: "ทั้งหมด"},
  {id: 5, name: "เนอวานา อิลิเม้นท์ บางนา", group: "ทั้งหมด"},
  {id: 6, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ธนบุรี", group: "ทั้งหมด"},
  {id: 8, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ฉะเชิงเทรา", group: "ทั้งหมด"},
  {id: 9, name: "อายิโนะโมะโต๊ะเซลส์ สาขา รามอินทรา", group: "ทั้งหมด"},
  {id: 10, name: "อาคารทดสอบตรวจจับใบหน้า", group: "ทั้งหมด"},
  {id: 11, name: "อายิโนะโมะโต๊ะเซลส์ สาขา บางปู", group: "ทั้งหมด"},
  {id: 12, name: "อายิโนะโมะโต๊ะเซลส์ สาขา นนทบุรี", group: "ทั้งหมด"},
  {id: 13, name: "อายิโนะโมะโต๊ะเซลส์ สาขา พัฒนาการ", group: "ทั้งหมด"},
  {id: 14, name: "อายิโนะโมะโต๊ะเซลส์ สาขา หาดใหญ่", group: "ทั้งหมด"}*/
  ]
  selectedSiteLocationName2:any []=[]

  
  
  
  

  currentDateTime: number = 1;
  selectedDateTimeModel: any = '1 month'
  selectedDateTime: any[] = [
    { value: '0', name: '< 1 month' },
    { value: '1', name: '1 month' },
    { value: '3', name: '3 months' },
    { value: '6', name: '6 months' },
    { value: '12', name: '12 months' }
  ]
  

  currentDeviceValue: any = [1,2,3,4] ;
  selectedDeviceModel: any = '';
  selectedDevice: any[] = [
    { value: '1', name: 'Server', group: 'ทั้งหมด' },
    { value: '2', name: 'NVR ' , group: 'ทั้งหมด' },
    { value: '3', name: 'Network Switch' , group: 'ทั้งหมด' },
    { value: '4', name: 'Camera' , group: 'ทั้งหมด' }
  ]

  currentEventValue: any = "90" ;
  currentEventCheck: any;
  selectedEventModel: any = 'Intrusion';
  selectedEvent: any[] = [
    { value: '90', name: 'Intrusion', group: 'เหตุการณ์ทั้งหมด' },
    { value: '53', name: 'Fire Alarm ' , group: 'เหตุการณ์ทั้งหมด' },
    { value: '244', name: 'Emergency Call' , group: 'เหตุการณ์ทั้งหมด' },
    { value: '107', name: 'Face Recognition' , group: 'เหตุการณ์ทั้งหมด' },
    { value: '104', name: 'LPR Backlist' , group: 'เหตุการณ์ทั้งหมด' }
  ]

  timeInterval: any

  ///got the token from url ///
  Token!: string;
  RefreshToken!: string;

  ///Calendar////
  currentCalendar : any;



  @ViewChild("screen", { static: true }) screen: any;


  constructor(private service: ServiceDevicesService,private route: ActivatedRoute,public datepipe: DatePipe) {

  }

  ngOnInit(): void {
 
    this.route.queryParams.subscribe(
      params => {
        this.Token=  params['Token'];
        this.RefreshToken=  params['RefreshToken'];
        console.log('Got the Token: ', params['Token']);     
        console.log('Got the Refresh: ', params['RefreshToken']);    
      }
    )

    setInterval(() => { this.timeInterval = this.showTime() }, 60000);

    this.setItemScreen();

    //Set ChartsNoAPI
    this.ChartsNoAPI();

    //Login for get token
    this.login();

    //this.listLocation();

    this.listLocationTSK();
    this.getDefaultCalendar();

    //this.getTSKsummarydashboard(this.currentLocationValue);

    this.getEventHours(this.currentLocationValue,this.currentDateTime)
    this.getEventMonthly(this.currentLocationValue,this.currentDateTime)
    this.getEventStatus(this.currentLocationValue,this.currentDateTime)
    this.getEventHistory(this.currentEventValue,this.currentCalendar)

    this.currentCalendar = new Date();
    let DateConvert =this.datepipe.transform(this.currentCalendar, 'yyyy-MM-dd');
    this.currentCalendar = DateConvert;
    this.DateTimeCalendar = this.currentCalendar;
  
    //Set data first time ran app
    //this.getDataDeviceType(this.currentLocationID);
    //this.getLineChart(this.currentLocationID, this.currentDateTime,this.currentDeviceValue);
    //this.getHeatmap(this.currentLocationID, this.currentDateTime);
    
    //set time interval every 1 min, call api for update dashboard 
    this.updateDataByTimeInterval();

    //console.log("Checking =",this.EventHistoryTransfer)

  }


  //log change Time//
  changeDateTime(valueDate: any) {
    this.currentDateTime = valueDate;
    //this.getHeatmap(this.currentLocationID, valueDate);
    //this.getLineChart(this.currentLocationID, valueDate, this.currentDeviceValue);
    this.getEventHours(this.currentLocationValue,this.currentDateTime)
    this.getEventMonthly(this.currentLocationValue,this.currentDateTime)
    console.log("ValueDate = ",this.currentDateTime);
  }

  changeTimeCalendar(valueCalendar: Date) {
    this.currentCalendar = new Date(valueCalendar);
    let DateConvert =this.datepipe.transform(this.currentCalendar, 'yyyy-MM-dd');
    this.currentCalendar = DateConvert;
    //this.getHeatmap(this.currentLocationID, valueDate);
    //this.getLineChart(this.currentLocationID, valueDate, this.currentDeviceValue);

    //this.getEventHours(this.currentLocationValue,this.currentDateTime)
    //this.getEventMonthly(this.currentLocationValue,this.currentDateTime)
    this.getEventHistory(this.currentEventValue,this.currentCalendar)
    console.log("Date Time Calendar = ",this.currentCalendar);
  }

  getDefaultCalendar() {
    var date = new Date();
    var NowDayOfMouth;
    NowDayOfMouth = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    const NowDateLog = this.formatDate(NowDayOfMouth.toString());
    console.log("NowDateLog = ",NowDateLog);
    this.currentCalendar = NowDateLog;
  }

  MaxDateCalendar() {
    var date = new Date();
    var NowDayOfMouth;
    NowDayOfMouth = new Date(date.getFullYear(), date.getMonth() , date.getDate()+1);
    this.limitDate = NowDayOfMouth;
  }
  

  changeEventType(valueEvent: any) {
    this.EventImageCondition = 0;
    this.currentEventValue = valueEvent;
    
      if (this.currentEventValue == this.currentEventCheck){
        this.currentEventCheck = this.currentEventValue ;
        this.currentEventValue = "90";
      }
    this.currentEventCheck = this.currentEventValue;
    this.getEventHistory(this.currentEventValue,this.currentCalendar)
    console.log("Event value = ",this.currentEventValue);
  }


  changeDeviceShow(valueDevice: any) {
    
    this.currentDeviceValue = valueDevice;
    this.currentDeviceValue = this.currentDeviceValue.sort();
    if (this.currentDeviceValue == "ทั้งหมด"){
      this.currentDeviceValue = [1, 2, 3, 4];
    }
    if (this.currentDeviceValue == ""){
      this.currentDeviceValue = [1, 2, 3, 4];
    }
    //this.getHeatmap(this.currentLocationID, valueDate);
    //this.getLineChart(this.currentLocationID, valueDevice);
    ///this.getLineChart(this.currentLocationID, this.currentDateTime, this.currentDeviceValue);
    console.log("valueDevice Change = ",this.currentDeviceValue);
  }

/****************************************************************************************/
  changeLocation(LocationSite: any[]) {
    this.currentLocationValue = LocationSite;
    this.currentLocationValue = this.currentLocationValue.sort();
    if (this.currentLocationValue == "ทั้งหมด"){
      this.currentLocationValue = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }
    if (this.currentLocationValue == ""){
      this.currentLocationValue = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }
    else {
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }

    this.getEventHours(this.currentLocationValue,this.currentDateTime)
  
  }

  changeLocation2(LocationSite2: any[]) {
    this.currentLocationValue2 = LocationSite2;
    this.currentLocationValue2 = this.currentLocationValue2.sort();
    if (this.currentLocationValue2 == "ทั้งหมด"){
      this.currentLocationValue2 = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }
    if (this.currentLocationValue2 == ""){
      this.currentLocationValue2 = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }
    else {
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }

    this.getEventMonthly(this.currentLocationValue2,this.currentDateTime)

  
  }
 

  /*
  changeLocation(id: any) {
    this.currentLocationID = id;

    this.getHeatmap(id, this.currentDateTime);
    this.getLineChart(id, this.currentDateTime);
    this.getDataDeviceType(id);
  }
*/
/*
  async listLocation() {
    let res: any = await this.service.getAllLocation();
    if (res.status == 200) {
      let data = res.data;

      for (const item of data) {
        this.selectedLocation.push({ id: item.ID, name: item.LOCATION_NAME })
      }

    }
  }
*/
  async listLocationTSK() {
    let res: any = await this.service.getAllLocationTSK();
    //console.log("res listLocationTSK = ",res)
    if (res.status == 200) {
      let data = res.data;
      //console.log("data listLocationTSK = ",data)

      for (const item of data) {
        this.selectedSiteLocation.push({ id: item.ID, name: item.SITE_DISPLAY_NAME, group: 'ทั้งหมด' })
      }
    
    }
    this.selectedSiteLocationName = this.selectedSiteLocation;
    this.selectedSiteLocationName2 = this.selectedSiteLocation;
    console.log("location in selectedSiteLocationName =",this.selectedSiteLocationName);
  }


  setItemScreen() {

    this.diameterOnline = innerWidth > 2560 ? '300' : '120';
    this.diameterOffline = innerWidth > 2560 ? '230' : '80';
    this.strokeWidth = innerWidth > 2560 ? '20' : '10';
    this.fontSize = innerWidth > 2560 ? '25px' : '15px';
    this.fontSize = innerWidth > 1920 ? '25px' : '15px';
    this.fontSize = innerWidth > 1391 ? '15px' : '10px';
    this.markersSize = innerWidth > 2560 ? 6 : 3;
    this.markersSize = innerWidth > 1920 ? 6 : 3;
    this.markersSize = innerWidth > 1391 ? 3 : 1;

    this.diameterOnlineServer = innerWidth > 2560 ? '300' : '170';
    this.diameterOnlineServer = innerWidth > 1920 ? '300' : '170';
    this.diameterOnlineServer = innerWidth > 1391 ? '170' : '100';
    this.diameterOfflineServer = innerWidth > 2560 ? '230' : '130';
    this.diameterOfflineServer = innerWidth > 1920 ? '230' : '130';
    this.diameterOfflineServer = innerWidth > 1391 ? '130' : '80';
    this.strokeWidthServer = innerWidth > 2560 ? '20' : '6';
    this.strokeWidthServer = innerWidth > 1391 ? '6' : '4';

    this.diameterOnlineWorkstation = innerWidth > 2560 ? '300' : '170';
    this.diameterOnlineWorkstation = innerWidth > 1920 ? '300' : '170';
    this.diameterOnlineWorkstation = innerWidth > 1391 ? '170' : '100';
    this.diameterOfflineWorkstation = innerWidth > 2560 ? '230' : '130';
    this.diameterOfflineWorkstation = innerWidth > 1920 ? '230' : '130';
    this.diameterOfflineWorkstation = innerWidth > 1391 ? '130' : '80';
    this.strokeWidthWorkstation = innerWidth > 2560 ? '20' : '6';
    this.strokeWidthWorkstation = innerWidth > 1391 ? '6' : '4';

    this.diameterOnlineSwitchNetwork = innerWidth > 2560 ? '300' : '170';
    this.diameterOnlineSwitchNetwork = innerWidth > 1920 ? '300' : '170';
    this.diameterOnlineSwitchNetwork = innerWidth > 1391 ? '170' : '100';
    this.diameterOfflineSwitchNetwork = innerWidth > 2560 ? '230' : '130';
    this.diameterOfflineSwitchNetwork = innerWidth > 1920 ? '230' : '130';
    this.diameterOfflineSwitchNetwork = innerWidth > 1391 ? '130' : '80';
    this.strokeWidthSwitchNetwork = innerWidth > 2560 ? '20' : '6';
    this.strokeWidthSwitchNetwork = innerWidth > 1391 ? '20' : '4';

    this.diameterOnlineWorkstation = innerWidth > 2560 ? '300' : '170';
    this.diameterOfflineWorkstation = innerWidth > 2560 ? '230' : '130';
    this.strokeWidthWorkstation = innerWidth > 2560 ? '20' : '6';

    this.diameterOnlineNvr = innerWidth > 2560 ? '300' : '170';
    this.diameterOnlineNvr = innerWidth > 1920 ? '300' : '170';
    this.diameterOnlineNvr = innerWidth > 1391 ? '140' : '100';
    this.diameterOfflineNvr = innerWidth > 2560 ? '230' : '130';
    this.diameterOfflineNvr = innerWidth > 1920 ? '230' : '130';
    this.diameterOfflineNvr = innerWidth > 1391 ? '130' : '80';
    this.strokeWidthNvr = innerWidth > 2560 ? '20' : '6';
    this.strokeWidthNvr = innerWidth > 1391 ? '6' : '4';

    this.diameterOnlineCctv = innerWidth > 2560 ? '300' : '170';
    this.diameterOnlineCctv = innerWidth > 1920 ? '300' : '170';
    this.diameterOnlineCctv = innerWidth > 1391 ? '170' : '100';
    this.diameterOfflineCctv = innerWidth > 2560 ? '230' : '145';
    this.diameterOfflineCctv = innerWidth > 1920 ? '230' : '145';
    this.diameterOfflineCctv = innerWidth > 1391 ? '145' : '80';
    this.diameterTamperingCctv = innerWidth > 2560 ? '230' : '120';
    this.diameterTamperingCctv = innerWidth > 1920 ? '230' : '120';
    this.diameterTamperingCctv = innerWidth > 1391 ? '120' : '60';
    
    this.strokeWidthCctv = innerWidth > 2560 ? '20' : '6';
    this.strokeWidthCctv = innerWidth > 1391 ? '6' : '4';
  }

  async updateDataByTimeInterval() {
    const setInterval = interval(await this.service.getTimeInterval());
    setInterval.subscribe(x => {
      this.getEventHours(this.currentLocationValue,this.currentDateTime)
      this.getEventMonthly(this.currentLocationValue,this.currentDateTime)
      this.getEventStatus(this.currentLocationValue,this.currentDateTime)
      this.getEventHistory(this.currentEventValue,this.currentCalendar)
    })
  }

  showTime() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = '' + d.getHours(),
      min = '' + d.getMinutes(),
      sec = '' + d.getSeconds();
 
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (hour.length < 2)
      hour = '0' + hour;
    if (min.length < 2)
      min = '0' + min;
    if (sec.length < 2)
      sec = '0' + sec;

    let date = [year, month, day].join('-');
    let time = [hour, min, sec].join(':');

    return  date + ' ' + time;

  }

  formatDate(date: string) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  formatTime(date: string) {
    var d = new Date(date),
      hour = '' + d.getHours(),
      min = '' + d.getMinutes(),
      sec = '' + d.getSeconds();

    if (hour.length < 2)
      hour = '0' + hour;
    if (min.length < 2)
      min = '0' + min;
    if (sec.length < 2)
      sec = '0' + sec;

    return [hour, min, sec].join(':');
  }

  weekCountOfMouth(year: number, mouth: number) {
    // month_number is in the range 1..12

    var firstOfMonth = new Date(year, mouth - 1, +1, 1);
    var lastOfMonth = new Date(year, mouth, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);

  }

  ChartsNoAPI() {

    this.DonutchartOptions = {
      series: [],
      chart: {
        type: "donut",
        width: "70%",
        foreColor: '#ffffff',
        //background: "#ffffff"
        fontFamily: 'Prompt, sans-serif',
        fontWeight: '400',   
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val:any, opts:any) {
          return opts.w.config.series[opts.seriesIndex]
        }
      },
      labels: ["Open", "In Process", "Closed"],
      colors: ['#2D9AFF', '#826BF9', '#2CD9C5'],
      fill: {
        type: "solid",
        colors: ['#2D9AFF', '#826BF9', '#2CD9C5']
      },
      legend: {
        show: true,
        floating: false,
        fontSize: "16px",
        position: "top",
        offsetY: 1,
        labels: {
          useSeriesColors: false
        },
      },
      stroke: {
        width: 0
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.LinechartOptions = {
      series: [
        {
          name: "Intrusion",
          data: []
        },
        {
          name: "Fire Alarm",
          data: []
        },
        {
          name: "Emergency Call",
          data: []
        }
      ],
      chart: {
        height: 325,
        width: "93.5%",
        type: "line",
        background: '#292f33',
        foreColor: '#888888',
        fontFamily: 'Prompt, sans-serif',
        fontWeight: '400',   
        zoom: {
          enabled: false
        }
      },
      theme: {
        mode: 'dark', 
      },
      yaxis: {
        title: {
          text: "",
        }
      },
      zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: true,  
      },
      legend: {
        show: true,
        floating: false,
        fontSize: "16px",
        position: "top",
        offsetY: 1,
      },
      colors: ['#826BF9', '#2CD9C5','#2D9AFF'],
      fill: {
        type: "solid",
        colors: ['#826BF9', '#2CD9C5','#2D9AFF']
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#292F33" ], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Week1",
          "Week2",
          "Week3",
          "Week4",
          "Week5"
        ]
      }
    };

    this.BarchartOptions = {
      series: [
        {
          name: "Total",
          data: []
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        width: "93.5%",
        background: '#292f33',
        foreColor: '#888888',
        fontFamily: 'Prompt, sans-serif',
        fontWeight: '400',   
      },
      tooltip: {
        z: {
            formatter: undefined,
            title: 'Title: '
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories2: [
          "0",
          "",
          "2",
          "",
          "4",
          "",
          "6",
          "",
          "8",
          "",
          "10",
          "",
          "12",
          "",
          "14",
          "",
          "16",
          "",
          "18",
          "",
          "20",
          "",
          "22",
          "",
        ],
        categories: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
        ]
      },
      yaxis: {
        title: {
          text: "",
        }
      },
      zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: true,  
      },
      theme: {
        mode: 'dark', 
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.9,
          colorStops: [
            {
              offset: 1,        
              color: "#28b3e9",
              opacity: 0.8
            },
            {
              offset: 15,
              color: "#12E5DD",
              opacity: 1
            }
          ]
        }
      },
    };
  }
  //Login Normal Version//

  async login() {
    let res: any = await this.service.login();
    if (res.status == 200) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshtoken', res.data.refreshtoken);

    }
  }

//Login Token URL Version//
/*
  async login() {
  
      localStorage.setItem('token', this.Token);
      localStorage.setItem('refreshtoken', this.RefreshToken);

  }
*/ 
async getEventHistory(valueEvent: any, valueCalendar: any) {

  let res: any;
  res = await this.service.getEventHistory(valueEvent, valueCalendar);
  console.log("res EventHistory = ",res);
  this.service.responseTSKEventHistory = res;
  let resEvent = this.service.responseTSKEventHistory.data;
  //console.log("responseTSKLog EventHistory xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx = ",resEvent,Object.keys(resEvent).length)
  if(!Object.keys(resEvent).length) resEvent = [];
  //console.log("responseTSKLog EventHistory xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsdfdsfds = ",resEvent)
  this.EventHistoryTransfer = resEvent;
 // console.log("EventHistory Transfer = ",this.EventHistoryTransfer);
}




  async getEventHours(LocationSite:any, valueDate: number) {
    console.log("LocationSite in EventHours= ",LocationSite)
    console.log("valueDate in EventHours= ",valueDate)

    var date = new Date();
    console.log("New date = ",date);
    var firstDayOfMouth;
    firstDayOfMouth = new Date(date.getFullYear(), date.getMonth(), 1);
    //var lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var lastDayOfMouth;
    lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    //firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
  
  
    const startDateLog = this.formatDate(firstDayOfMouth.toString());
    const stopDateLog = this.formatDate(lastDayOfMouth.toString());
  
     console.log("startDate =",startDateLog);
     console.log("stopDate = ",stopDateLog);
    let res: any;
    res = await this.service.getEventHours(stopDateLog, LocationSite);
    console.log("res EventHours = ",res);
    this.service.responseTSKLogEvent = res;
    console.log("responseTSKLog EventHours = ",this.service.responseTSKLogEvent)
     
    
     var BarChart = new ApexCharts(
        document.querySelector("#Barchart"),
        this.BarchartOptions
      );
      
      BarChart.render();
    
      let LogEventHours: any = [];
      let LogEventAPI: number[] = [];
      let Event = this.service.responseTSKLogEvent.data.eventByHours.forEach(object=>{
      LogEventAPI.push(object.sum)});
      LogEventHours = LogEventAPI;
      console.log("LogEventHours Data = ",LogEventHours)

       
      BarChart.updateOptions({
        series: [
          {
            name: "Total",
            data: LogEventHours
          },
        ]
      })
     
  }

  async getEventStatus(LocationSite:any, valueDate: number) {
    console.log("LocationSite in DailyStatus= ",LocationSite)
    console.log("valueDate in DailyStatus= ",valueDate)
  
    var date = new Date();
    console.log("New date = ",date);
    var firstDayOfMouth;
    firstDayOfMouth = new Date(date.getFullYear(), date.getMonth(), 1);
    //var lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var lastDayOfMouth;
    lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    //firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
  
  
    const startDateLog = this.formatDate(firstDayOfMouth.toString());
    const stopDateLog = this.formatDate(lastDayOfMouth.toString());
  
     console.log("startDate DailyStatus =",startDateLog);
     console.log("stopDate DailyStatus = ",stopDateLog);
    let res: any;
    res = await this.service.getEventHours(stopDateLog, LocationSite);
    //console.log("res DailyStatus = ",res);
    this.service.responseTSKLogEvent = res;
    //console.log("responseTSKLog DailyStatus = ",this.service.responseTSKLogEvent)
      
      var RadialChart = new ApexCharts(
        document.querySelector("#Donutchart"),
        this.DonutchartOptions
      );
      
      RadialChart.render();
     
      let DailyStatusOpen = this.service.responseTSKLogEvent.data.dailySupportStatus.open
      let DailyStatusClose = this.service.responseTSKLogEvent.data.dailySupportStatus.close
      let DailyStatusInprocess = this.service.responseTSKLogEvent.data.dailySupportStatus.inprocess
      console.log("Daily Status Open = ",DailyStatusOpen)
      console.log("Daily Status Close = ",DailyStatusClose)
      console.log("Daily Status Inprocess = ",DailyStatusInprocess)
      this.StatusOpen = DailyStatusOpen ;
      this.StatusClose = DailyStatusClose;
      this.StatusInprocess = DailyStatusInprocess;

      if (this.StatusOpen == 0 && this.StatusClose == 0 && this.StatusInprocess ==0){
        RadialChart.updateOptions({
          series: [100],
          chart: {
            type: "donut",
            width: "70%",
            foreColor: '#ffffff',
            fontFamily: 'Prompt, sans-serif',
            fontWeight: '400',   
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: false,
                  total: {
                    showAlways: true,
                    show: true
                  }
                }
              }
            }
          },
          dataLabels: {
            style: {
              enabled: false,
              fontSize: '16px',
              fontFamily: 'Prompt, sans-serif',
              fontWeight: '400',
            },
            enabled: false,
            formatter: function (val:any, opts:any) {
              return opts.w.config.series[opts.seriesIndex]
            }
          },
          labels: ["Open", "In Process", "Closed"],
          colors: ['#2D9AFF', '#826BF9', '#2CD9C5'],
          fill: {
            type: "solid",
            colors: ['#30363B', '#826BF9', '#2CD9C5']
          },        
          tooltip: {
            enabled: false,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        })  
      }
      else{
        RadialChart.updateOptions({
          series: [this.StatusOpen,this.StatusInprocess,this.StatusClose],
          chart: {
            type: "donut",
            width: "70%",
            foreColor: '#ffffff',
            fontFamily: 'Prompt, sans-serif',
            fontWeight: '400',   
            
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    showAlways: true,
                    show: true
                  }
                }
              }
            }
          },
          dataLabels: {
            style: {
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
            },
            enabled: true,
            formatter: function (val:any, opts:any) {
              return opts.w.config.series[opts.seriesIndex]
            }
          },
          labels: ["Open", "In Process", "Closed"],
          colors: ['#2D9AFF', '#826BF9', '#2CD9C5'],
          fill: {
            type: "solid",
            colors: ['#2D9AFF', '#826BF9', '#2CD9C5']
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        })  
      }
    }
      


  async getEventMonthly(LocationSite:any,valueDate: number) {
    console.log("LocationSite in EventMonthly= ",LocationSite)
    console.log("valueDate in EventMonthly= ",valueDate)
  
    if (valueDate == 0){
    var firstDayOfMouth;
    var lastDayOfMouth;
    var date = new Date();
    console.log("New date = ",date);
    var d = new Date(),
    month = d.getMonth()+1;
    console.log("Month = ",month);
    firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
    var lastdayvalue;
    if ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      lastdayvalue = 31;
    }
    if ( month == 4 || month == 6 || month == 9 || month == 11 ) {
      lastdayvalue = 30;
    }
    if ( month == 2 ) {
      var f = new Date();
      lastdayvalue = f.getDate() ;
    }
    lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate) , lastdayvalue);

  
  
    const startDateLog = this.formatDate(firstDayOfMouth.toString());
    const stopDateLog = this.formatDate(lastDayOfMouth.toString());
  
      console.log("startDate EventWeekly =",startDateLog);
      console.log("stopDate EventWeekly = ",stopDateLog);
    let res: any;
    res = await this.service.getEventWeekly(startDateLog, stopDateLog, LocationSite);
    console.log("res EventWeekly = ",res);
    this.service.responseTSKLogMonthly = res;
    console.log("responseTSKLog EventWeekly = ",this.service.responseTSKLogMonthly)
      
      var LineChart = new ApexCharts(
        document.querySelector("#Linechart"),
        this.LinechartOptions
      );
  
      LineChart.render();
  
      let LogEventIntrusion: any = [];
      let LogEventFireAlarm: any = [];
      let LogEventEmergencyCall: any = [];
      
  
  
      let EventIntrusion: number[] = [];
      let Intrusion = this.service.responseTSKLogMonthly.data.find(x => x.type == "Intrusion Alarm")?.data.forEach(object=>{
        EventIntrusion.push(object.count)
        });
      LogEventIntrusion = EventIntrusion;
      if (LogEventIntrusion == ""){
        LogEventIntrusion = [0,0,0,0,0];
        console.log("LogEventIntrusion default = ",LogEventIntrusion);
      }
      else
      console.log("LogEventIntrusion = ",LogEventIntrusion);

      let EventFireAlarm: number[] = [];
      let FireAlarm = this.service.responseTSKLogMonthly.data.find(x => x.type == "Fire Alarm")?.data.forEach(object=>{
        EventFireAlarm.push(object.count)
        });
        LogEventFireAlarm = EventFireAlarm;
      if (LogEventFireAlarm == ""){
        LogEventFireAlarm = [0,0,0,0,0];
        console.log("LogEventFireAlarm default = ",LogEventFireAlarm);
      }
      else
      console.log("LogEventFireAlarm = ",LogEventFireAlarm);

      let EventEmergencyCall: number[] = [];
      let EmergencyCall = this.service.responseTSKLogMonthly.data.find(x => x.type == "Emergency Call")?.data.forEach(object=>{
        EventEmergencyCall.push(object.count)
        });
        LogEventEmergencyCall = EventEmergencyCall;
      if (LogEventEmergencyCall == ""){
        LogEventEmergencyCall = [0,0,0,0,0];
        console.log("LogEventEmergencyCall default = ",LogEventEmergencyCall);
      }
      else
      console.log("LogEventEmergencyCall = ",LogEventEmergencyCall);

      
    LineChart.updateOptions({
        series: [
          {
            name: "Intrusion",
            data: LogEventIntrusion
          },
          {
            name: "Fire Alarm",
            data: LogEventFireAlarm
          },
          {
            name: "Emergency Call",
            data: LogEventEmergencyCall
          }
        ]
      })
    }
    if (valueDate == 1){
      var date = new Date();
      console.log("New date = ",date);
      var d = new Date(),
      month = d.getMonth()+1;
      console.log("Month = ",month);
      firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
      var lastdayvalue;
      if ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        lastdayvalue = 31;
      }
      if ( month == 4 || month == 6 || month == 9 || month == 11 ) {
        lastdayvalue = 30;
      }
      if ( month == 2 ) {
        var f = new Date();
        lastdayvalue = f.getDate() ;
      }
      lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate) , lastdayvalue);
      
    
    
      const startDateLog = this.formatDate(firstDayOfMouth.toString());
      const stopDateLog = this.formatDate(lastDayOfMouth.toString());
    
      console.log("startDate EventMonthly =",startDateLog);
      console.log("stopDate EventMonthly = ",stopDateLog);
      let res: any;
      res = await this.service.getEventMonthly(startDateLog, stopDateLog, LocationSite);
      console.log("res EventMonthly = ",res);
      this.service.responseTSKLogWeekly = res;
      console.log("responseTSKLog EventMonthly = ",this.service.responseTSKLogWeekly)
    
        var LineChart = new ApexCharts(
          document.querySelector("#Linechart"),
          this.LinechartOptions
        );
    
        LineChart.render();

        let LogEventIntrusion: any = [];
        let LogEventFireAlarm: any = [];
        let LogEventEmergencyCall: any = [];
        
    
    
        let EventIntrusion: number[] = [];
        let EventIntrusionStore: number[] = [];
        let Intrusion = this.service.responseTSKLogWeekly.data.find(x => x.type == "Intrusion Alarm")?.data.forEach(object=>{
          EventIntrusion.push(object.count)
          });
          LogEventIntrusion = EventIntrusion;
        if (LogEventIntrusion == ""){
          LogEventIntrusion = [0,0,0];
          console.log("LogEventIntrusion default = ",LogEventIntrusion);
        }
        else{
          EventIntrusionStore.push(0);
          LogEventIntrusion = EventIntrusionStore.concat(EventIntrusion);
          console.log("LogEventIntrusion 1 = ",LogEventIntrusion);
          LogEventIntrusion[2]=0;
          console.log("LogEventIntrusion Final = ",LogEventIntrusion);
          }
        let EventFireAlarm: number[] = [];
        let EventFireAlarmStore: number[] = [];
        let FireAlarm = this.service.responseTSKLogWeekly.data.find(x => x.type == "Fire Alarm")?.data.forEach(object=>{
          EventFireAlarm.push(object.count)
          });
          LogEventFireAlarm = EventFireAlarm;
        if (LogEventFireAlarm == ""){
          LogEventFireAlarm = [0,0,0];
          console.log("LogEventFireAlarm default = ",LogEventFireAlarm);
        }
        else{
          EventFireAlarmStore.push(0);
          LogEventFireAlarm = EventFireAlarmStore.concat(EventFireAlarm);
          LogEventFireAlarm[2]=0;
          console.log("LogEventFireAlarm = ",LogEventFireAlarm);
        }
        let EventEmergencyCall: number[] = [];
        let EventEmergencyCallStore: number[] = [];
        let EmergencyCall = this.service.responseTSKLogWeekly.data.find(x => x.type == "Emergency Call")?.data.forEach(object=>{
          EventEmergencyCall.push(object.count)
          });
          LogEventEmergencyCall = EventEmergencyCall;
        if (LogEventEmergencyCall == ""){
          LogEventEmergencyCall = [0,0,0];
          console.log("LogEventEmergencyCall default = ",LogEventEmergencyCall);
        }
        else{
        EventEmergencyCallStore.push(0);
        LogEventEmergencyCall = EventEmergencyCallStore.concat(EventEmergencyCall);
        LogEventEmergencyCall[2]=0;
        console.log("LogEventEmergencyCall = ",LogEventEmergencyCall);
        }
        LineChart.updateOptions({
          series: [
            {
              name: "Intrusion",
              data: LogEventIntrusion
            },
            {
              name: "Fire Alarm",
              data: LogEventFireAlarm
            },
            {
              name: "Emergency Call",
              data: LogEventEmergencyCall
            }
          ]
        })
        var date = new Date();
        console.log("switch Date = ",date.getMonth()+1)
        if (valueDate == 1) {
          switch (date.getMonth()+1) { //Note: 0=January, 1=February etc.
            case 1:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Nov",
                        "Dec",
                        "Jan",
                      ],
                    },
                  })
                  break;
                case 2:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Dec",
                        "Jan",
                        "Feb",
                      ],
                    },
                  })
                  break;
                case 3:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                      ],
                    },
                  })
                  break;
                case 4:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Feb",
                        "Mar",
                        "Apr",
                      ],
                    },
                  })
                  break;
                case 5:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Mar",
                        "Apr",
                        "May",
                      ],
                    },
                  })
                  break;
                case 6:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Apr",
                        "May",
                        "Jun",
                      ],
                    },
                  })
                  break;
                case 7:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "May",
                        "Jun",
                        "Jul",
                      ],
                    },
                  })
                  break;
                case 8:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Jun",
                        "Jul",
                        "Aug",
                      ],
                    },
                  })
                  break;
                case 9:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Jul",
                        "Aug",
                        "Sep",
                      ],
                    },
                  })
                  break;
                case 10:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Aug",
                        "Sep",
                        "Oct",
                      ],
                    },
                  })
                  break;
                case 11:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Sep",
                        "Oct",
                        "Nov",
                      ],
                    },
                  })
                  break;
                case 12:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                  })
                  break;
            }
          }
          
      }  
      if (valueDate == 3){
        var date = new Date();
        console.log("New date = ",date);
        var d = new Date(),
        month = d.getMonth()+1;
        console.log("Month = ",month);
        firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
        var lastdayvalue;
        if ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          lastdayvalue = 31;
        }
        if ( month == 4 || month == 6 || month == 9 || month == 11 ) {
          lastdayvalue = 30;
        }
        if ( month == 2 ) {
          var f = new Date();
          lastdayvalue = f.getDate() ;
        }
        lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() -2, lastdayvalue);
        
      
      
        const startDateLog = this.formatDate(firstDayOfMouth.toString());
        const stopDateLog = this.formatDate(lastDayOfMouth.toString());
      
        console.log("startDate EventMonthly =",startDateLog);
        console.log("stopDate EventMonthly = ",stopDateLog);
        let res: any;
        res = await this.service.getEventMonthly(startDateLog, stopDateLog, LocationSite);
        console.log("res EventMonthly = ",res);
        this.service.responseTSKLogWeekly = res;
        console.log("responseTSKLog EventMonthly = ",this.service.responseTSKLogWeekly)
      
          var LineChart = new ApexCharts(
            document.querySelector("#Linechart"),
            this.LinechartOptions
          );
      
          LineChart.render();
  
          let LogEventIntrusion: any = [];
          let LogEventFireAlarm: any = [];
          let LogEventEmergencyCall: any = [];
          
      
      
          let EventIntrusion: number[] = [];
          let EventIntrusionStore: number[] = [];
          let Intrusion = this.service.responseTSKLogWeekly.data.find(x => x.type == "Intrusion Alarm")?.data.forEach(object=>{
            EventIntrusion.push(object.count)
            });
            LogEventIntrusion = EventIntrusion.slice(0,3);
          if (LogEventIntrusion == ""){
            LogEventIntrusion = [0,0,0];
            console.log("LogEventIntrusion default = ",LogEventIntrusion);
          }
          else{
            console.log("LogEventIntrusion Final = ",LogEventIntrusion);
            }
          let EventFireAlarm: number[] = [];
          let EventFireAlarmStore: number[] = [];
          let FireAlarm = this.service.responseTSKLogWeekly.data.find(x => x.type == "Fire Alarm")?.data.forEach(object=>{
            EventFireAlarm.push(object.count)
            });
            LogEventFireAlarm = EventFireAlarm.slice(0,3);
          if (LogEventFireAlarm == ""){
            LogEventFireAlarm = [0,0,0];
            console.log("LogEventFireAlarm default = ",LogEventFireAlarm);
          }
          else{
            console.log("LogEventFireAlarm = ",LogEventFireAlarm);
          }
          let EventEmergencyCall: number[] = [];
          let EventEmergencyCallStore: number[] = [];
          let EmergencyCall = this.service.responseTSKLogWeekly.data.find(x => x.type == "Emergency Call")?.data.forEach(object=>{
            EventEmergencyCall.push(object.count)
            });
            LogEventEmergencyCall = EventEmergencyCall.slice(0,3);
          if (LogEventEmergencyCall == ""){
            LogEventEmergencyCall = [0,0,0];
            console.log("LogEventEmergencyCall default = ",LogEventEmergencyCall);
          }
          else{
          console.log("LogEventEmergencyCall = ",LogEventEmergencyCall);
          }
          LineChart.updateOptions({
            series: [
              {
                name: "Intrusion",
                data: LogEventIntrusion
              },
              {
                name: "Fire Alarm",
                data: LogEventFireAlarm
              },
              {
                name: "Emergency Call",
                data: LogEventEmergencyCall
              }
            ]
          })
          var date = new Date();
          console.log("switch Date = ",date.getMonth()+1)
          if (valueDate == 3) {
            switch (date.getMonth()+1) { //Note: 0=January, 1=February etc.
              case 1:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                  },
                })
                break;
              case 2:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Nov",
                      "Dec",
                      "Jan",
                    ],
                  },
                })
                break;
              case 3:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Dec",
                      "Jan",
                      "Feb",
                    ],
                  },
                })
                break;
              case 4:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                    ],
                  },
                })
                break;
              case 5:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Feb",
                      "Mar",
                      "Apr",
                    ],
                  },
                })
                break;
              case 6:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Mar",
                      "Apr",
                      "May",
                    ],
                  },
                })
                break;
              case 7:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Apr",
                      "May",
                      "Jun",
                    ],
                  },
                })
                break;
              case 8:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "May",
                      "Jun",
                      "Jul",
                    ],
                  },
                })
                break;
              case 9:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Jun",
                      "Jul",
                      "Aug",
                    ],
                  },
                })
                break;
              case 10:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Jul",
                      "Aug",
                      "Sep",
                    ],
                  },
                })
                break;
              case 11:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Aug",
                      "Sep",
                      "Oct",
                    ],
                  },
                })
                break;
              case 12:
                LineChart.updateOptions({
                  xaxis: {
                    categories: [
                      "Sep",
                      "Oct",
                      "Nov",
                    ],
                  },
                })
                break;
              }
            }        
        }  
        if (valueDate == 6){
          var date = new Date();
          console.log("New date = ",date);
          var d = new Date(),
          month = d.getMonth()+1;
          console.log("Month = ",month);
          firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
          var lastdayvalue;
          if ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            lastdayvalue = 31;
          }
          if ( month == 4 || month == 6 || month == 9 || month == 11 ) {
            lastdayvalue = 30;
          }
          if ( month == 2 ) {
            var f = new Date();
            lastdayvalue = f.getDate() ;
          }
          lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - 1, lastdayvalue);
          
        
        
          const startDateLog = this.formatDate(firstDayOfMouth.toString());
          const stopDateLog = this.formatDate(lastDayOfMouth.toString());
        
          console.log("startDate EventMonthly =",startDateLog);
          console.log("stopDate EventMonthly = ",stopDateLog);
          let res: any;
          res = await this.service.getEventMonthly(startDateLog, stopDateLog, LocationSite);
          console.log("res EventMonthly = ",res);
          this.service.responseTSKLogWeekly = res;
          console.log("responseTSKLog EventMonthly = ",this.service.responseTSKLogWeekly)
        
            var LineChart = new ApexCharts(
              document.querySelector("#Linechart"),
              this.LinechartOptions
            );
        
            LineChart.render();
    
            let LogEventIntrusion: any = [];
            let LogEventFireAlarm: any = [];
            let LogEventEmergencyCall: any = [];
            
        
        
            let EventIntrusion: number[] = [];
            let EventIntrusionStore: number[] = [];
            let Intrusion = this.service.responseTSKLogWeekly.data.find(x => x.type == "Intrusion Alarm")?.data.forEach(object=>{
              EventIntrusion.push(object.count)
              });
              LogEventIntrusion = EventIntrusion;
            if (LogEventIntrusion == ""){
              LogEventIntrusion = [0,0,0,0,0,0];
              console.log("LogEventIntrusion default = ",LogEventIntrusion);
            }
            else{
              console.log("LogEventIntrusion Final = ",LogEventIntrusion);
              }
            let EventFireAlarm: number[] = [];
            let EventFireAlarmStore: number[] = [];
            let FireAlarm = this.service.responseTSKLogWeekly.data.find(x => x.type == "Fire Alarm")?.data.forEach(object=>{
              EventFireAlarm.push(object.count)
              });
              LogEventFireAlarm = EventFireAlarm;
            if (LogEventFireAlarm == ""){
              LogEventFireAlarm = [0,0,0,0,0,0];
              console.log("LogEventFireAlarm default = ",LogEventFireAlarm);
            }
            else{
              console.log("LogEventFireAlarm = ",LogEventFireAlarm);
            }
            let EventEmergencyCall: number[] = [];
            let EventEmergencyCallStore: number[] = [];
            let EmergencyCall = this.service.responseTSKLogWeekly.data.find(x => x.type == "Emergency Call")?.data.forEach(object=>{
              EventEmergencyCall.push(object.count)
              });
              LogEventEmergencyCall = EventEmergencyCall;
            if (LogEventEmergencyCall == ""){
              LogEventEmergencyCall = [0,0,0,0,0,0];
              console.log("LogEventEmergencyCall default = ",LogEventEmergencyCall);
            }
            else{
            console.log("LogEventEmergencyCall = ",LogEventEmergencyCall);
            }
            LineChart.updateOptions({
              series: [
                {
                  name: "Intrusion",
                  data: LogEventIntrusion
                },
                {
                  name: "Fire Alarm",
                  data: LogEventFireAlarm
                },
                {
                  name: "Emergency Call",
                  data: LogEventEmergencyCall
                }
              ]
            })
            var date = new Date();
            console.log("switch Date = ",date.getMonth()+1)
            if (valueDate == 6) {
              switch (date.getMonth()+1) { //Note: 0=January, 1=February etc.
                case 1:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                      ],
                    },
                  })
                  break;
                case 2:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                      ],
                    },
                  })
                  break;
                case 3:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                        "Mar",
                      ],
                    },
                  })
                  break;
                case 4:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                      ],
                    },
                  })
                  break;
                case 5:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                      ],
                    },
                  })
                  break;
                case 6:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Dec",
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                      ],
                    },
                  })
                  break;
                case 7:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                      ],
                    },
                  })
                  break;
                case 8:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                      ],
                    },
                  })
                  break;
                case 9:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep"
                      ],
                    },
                  })
                  break;
                case 10:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct"
                      ],
                    },
                  })
                  break;
                case 11:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                      ],
                    },
                  })
                  break;
                case 12:
                  LineChart.updateOptions({
                    xaxis: {
                      categories: [
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                  })
                  break;
                }
              }        
          }
          if (valueDate == 12){
            var date = new Date();
            console.log("New date = ",date);
            var d = new Date(),
            month = d.getMonth()+1;
            console.log("Month = ",month);
            firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
            var lastdayvalue;
            if ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              lastdayvalue = 31;
            }
            if ( month == 4 || month == 6 || month == 9 || month == 11 ) {
              lastdayvalue = 30;
            }
            if ( month == 2 ) {
              var f = new Date();
              lastdayvalue = f.getDate() ;
            }
            lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - 1, lastdayvalue);
            
          
          
            const startDateLog = this.formatDate(firstDayOfMouth.toString());
            const stopDateLog = this.formatDate(lastDayOfMouth.toString());
          
            console.log("startDate EventMonthly =",startDateLog);
            console.log("stopDate EventMonthly = ",stopDateLog);
            let res: any;
            res = await this.service.getEventMonthly(startDateLog, stopDateLog, LocationSite);
            console.log("res EventMonthly = ",res);
            this.service.responseTSKLogWeekly = res;
            console.log("responseTSKLog EventMonthly = ",this.service.responseTSKLogWeekly)
          
              var LineChart = new ApexCharts(
                document.querySelector("#Linechart"),
                this.LinechartOptions
              );
          
              LineChart.render();
      
              let LogEventIntrusion: any = [];
              let LogEventFireAlarm: any = [];
              let LogEventEmergencyCall: any = [];
              
          
          
              let EventIntrusion: number[] = [];
              let EventIntrusionStore: number[] = [];
              let Intrusion = this.service.responseTSKLogWeekly.data.find(x => x.type == "Intrusion Alarm")?.data.forEach(object=>{
                EventIntrusion.push(object.count)
                });
                LogEventIntrusion = EventIntrusion;
              if (LogEventIntrusion == ""){
                LogEventIntrusion = [0,0,0,0,0,0,0,0,0,0,0,0];
                console.log("LogEventIntrusion default = ",LogEventIntrusion);
              }
              else{
                console.log("LogEventIntrusion Final = ",LogEventIntrusion);
                }
              let EventFireAlarm: number[] = [];
              let EventFireAlarmStore: number[] = [];
              let FireAlarm = this.service.responseTSKLogWeekly.data.find(x => x.type == "Fire Alarm")?.data.forEach(object=>{
                EventFireAlarm.push(object.count)
                });
                LogEventFireAlarm = EventFireAlarm;
              if (LogEventFireAlarm == ""){
                LogEventFireAlarm = [0,0,0,0,0,0,0,0,0,0,0,0];
                console.log("LogEventFireAlarm default = ",LogEventFireAlarm);
              }
              else{
                console.log("LogEventFireAlarm = ",LogEventFireAlarm);
              }
              let EventEmergencyCall: number[] = [];
              let EventEmergencyCallStore: number[] = [];
              let EmergencyCall = this.service.responseTSKLogWeekly.data.find(x => x.type == "Emergency Call")?.data.forEach(object=>{
                EventEmergencyCall.push(object.count)
                });
                LogEventEmergencyCall = EventEmergencyCall;
              if (LogEventEmergencyCall == ""){
                LogEventEmergencyCall = [0,0,0,0,0,0,0,0,0,0,0,0];
                console.log("LogEventEmergencyCall default = ",LogEventEmergencyCall);
              }
              else{
              console.log("LogEventEmergencyCall = ",LogEventEmergencyCall);
              }
              LineChart.updateOptions({
                series: [
                  {
                    name: "Intrusion",
                    data: LogEventIntrusion
                  },
                  {
                    name: "Fire Alarm",
                    data: LogEventFireAlarm
                  },
                  {
                    name: "Emergency Call",
                    data: LogEventEmergencyCall
                  }
                ]
              })
              var date = new Date();
              console.log("switch Date = ",date.getMonth()+1)
              if (valueDate == 12) {
                switch (date.getMonth()+1) { //Note: 0=January, 1=February etc.
                  case 1:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                        ],
                      },
                    })
                    break;
                  case 2:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
    
                        ],
                      },
                    })
                    break;
                  case 3:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
    
                        ],
                      },
                    })
                    break;
                  case 4:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
    
                        ],
                      },
                    })
                    break;
                  case 5:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
    
                        ],
                      },
                    })
                    break;
                  case 6:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
    
                        ],
                      },
                    })
                    break;
                  case 7:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
    
                        ],
                      },
                    })
                    break;
                  case 8:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
    
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
    
                        ],
                      },
                    })
                    break;
                  case 9:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
    
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
    
                        ],
                      },
                    })
                    break;
                  case 10:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
    
                          "Oct",
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
    
                        ],
                      },
                    })
                    break;
                  case 11:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
    
                          "Nov",
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
    
                        ],
                      },
                    })
                    break;
                  case 12:
                    LineChart.updateOptions({
                      xaxis: {
                        categories: [
    
                          "Dec",
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",    
                        ],
                      },
                    })
                    break;
                  }
                }        
            }  
  }

  EventDate!:string;
  EventSite!:string;
  EventName!:string;
  EmergencyName!:string;
  EmergencyPhone!:string;
  ImageEvent!:string;
  ImageEvent1!:string;
  ImageEvent2!:string;
  ImageEvent3!:string;
  Facename!:string;
  ImageCount!:any;
  EventImageCondition:any = 0;
  onClickEventData(eventshow:any){
    this.EventImageCondition = 1;
    console.log("event child = "  ,eventshow)
    this.EventSite = eventshow.SITE_NAME;
    this.EventDate = eventshow.STAMP_DATETIME;
    this.EventName = eventshow.EVENT_NAME;
    this.Facename = eventshow.FACE_NAME;
    this.EmergencyName = eventshow.PHONE_NAME;
    this.EmergencyPhone = eventshow.DEVICE_NAME;
    this.ImageCount = eventshow.url.length;
    this.ImageEvent = "";
    //console.log("Image Array = ", this.ImageCount);
    if (this.ImageCount == 0){
      this.EventImageCondition = 1;
      this.ImageEvent = eventshow.url[0];
    }
    if (this.ImageCount == 1){
      this.EventImageCondition = 1;
      this.ImageEvent = eventshow.url[0];
    }
    if (this.ImageCount == 2){
      this.EventImageCondition = 2;
      this.ImageEvent = eventshow.url;
      this.ImageEvent1 = eventshow.url[0];
      this.ImageEvent2 = eventshow.url[1];
    }
    if (this.ImageCount == 3){
      this.EventImageCondition = 2;
      this.ImageEvent = eventshow.url.slice(0,2);
      this.ImageEvent1 = eventshow.url[0];
      this.ImageEvent2 = eventshow.url[1];
      this.ImageEvent3 = eventshow.url[2];
    }
    else{
      this.ImageEvent = eventshow.url;
    }
    console.log("Image Count = ", this.ImageCount);
    console.log("Image Event = ", this.ImageEvent);


  }

/*****Ending Code Fly Wing *****/   
}
