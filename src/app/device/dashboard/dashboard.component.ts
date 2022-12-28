import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { Chart, Device, } from '../../models/model'
import { interval } from 'rxjs';
import * as ApexCharts from 'apexcharts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  jsonURL = 'assets/config.json';

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

  valueServerTotal: number = 0;
  valueServerOnline: number = 0;
  valueServerOffline: number = 0;

  valueWorkstationTotal: number = 0;
  valueWorkstationOnline: number = 0;
  valueWorkstationOffline: number = 0;

  valueNvrTotal: number = 0;
  valueNvrOnline: number = 0;
  valueNvrOffline: number = 0;

  valueCctvTotal: number = 0;
  valueCctvOnline: number = 0;
  valueCctvOffline: number = 0;
  valueCctvTampering: number = 0;

  valueSwitchNetworkTotal: number = 0;
  valueSwitchNetworkOnline: number = 0;
  valueSwitchNetworkOffline: number = 0;

  // Pie Chart
  public optionsPie: any;
  Device: any
  Problem: any
  width: any

  //Line Chart
  public optionsLine: any;
  fontSize: any
  markersSize: any

  public RadialchartOptions: any;

  currentLocationSite: any = []
  currentLocationValue: any = []
  selectedSiteLocationModel: any = ''
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
  selectedSiteLocationName: any[] = []

  currentDateTime: number = 1;
  selectedDateTimeModel: any = '1 month'
  selectedDateTime: any[] = [
    { value: '0', name: '< 1 Month' },
    { value: '1', name: '1 Month' },
    { value: '3', name: '3 Months' },
    { value: '6', name: '6 Months' },
    { value: '12', name: '12 Months' }
  ]

  currentDeviceValue: any = ["1", "2", "3", "4"];
  selectedDeviceModel: any = '';
  selectedDevice: any[] = [
    { value: '1', name: 'Server', group: 'ทั้งหมด' },
    { value: '2', name: 'NVR ', group: 'ทั้งหมด' },
    { value: '3', name: 'Networkswitch', group: 'ทั้งหมด' },
    { value: '4', name: 'Camera', group: 'ทั้งหมด' }
  ]

  timeInterval: any

  ///got the token from url ///
  Token!: string;
  RefreshToken!: string;


  constructor(private service: ServiceDevicesService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.selectedDeviceModel = ['1', '2', '3', '4'];

    // this.route.queryParams.subscribe(
    //   params => {
    //     this.Token = params['Token'];
    //     this.RefreshToken = params['RefreshToken'];
    //     console.log('Got the Token: ', params['Token']);
    //     console.log('Got the Refresh: ', params['RefreshToken']);
    //   }
    // )

    setInterval(() => { this.timeInterval = this.showTime() }, 60000);

    this.setItemScreen();

    //Set Default Charts
    this.ChartsNoAPI();

    //Login for get token
    this.login();


    this.listLocationTSK();

    this.getTSKsummarydashboard(this.currentLocationValue);
    this.getLog(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
    this.getLogMonth(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)


    //Set data first time ran app
    //this.getDataDeviceType(this.currentLocationID);
    //this.getLineChart(this.currentLocationID, this.currentDateTime,this.currentDeviceValue);
    //this.getHeatmap(this.currentLocationID, this.currentDateTime);

    //set time interval every 1 min, call api for update dashboard 
    //this.updateDataByTimeInterval();

  }

  //log change Time//
  changeDateTime(valueDate: any) {
    this.currentDateTime = valueDate;
    if (this.currentDateTime < 3) {
      this.getLog(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
    }
    else {
      this.getLogMonth(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
    }
    //console.log("Month Selected = ", this.currentDateTime);
  }

  changeDeviceShow(valueDevice: any) {

    this.currentDeviceValue = valueDevice;
    this.currentDeviceValue = this.currentDeviceValue.sort();
    if (this.currentDeviceValue == "ทั้งหมด") {
      this.currentDeviceValue = [1, 2, 3, 4];
    }
    if (this.currentDeviceValue == "") {
      this.currentDeviceValue = [];
    }
    this.getLog(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
    this.getLogMonth(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
    // console.log("value Device Change = ", this.currentDeviceValue);
  }

  /****************************************************************************************/
  changeLocation(LocationSite: any[]) {
    this.currentLocationValue = LocationSite;
    this.currentLocationValue = this.currentLocationValue.sort();
    if (this.currentLocationValue == "ทั้งหมด") {
      this.currentLocationValue = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }
    if (this.currentLocationValue == "") {
      this.currentLocationValue = "";
      this.getTSKsummarydashboard(this.currentLocationValue);
      this.getLog(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
      this.getLogMonth(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
      //console.log("Locationvalue Select Array = ",this.currentLocationValue);
    }
    else {
      this.getTSKsummarydashboard(this.currentLocationValue);
      this.getLog(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
      this.getLogMonth(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
    }


  }

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
    //console.log("Get LocationSite ID =", this.selectedSiteLocationName);
  }


  setItemScreen() {
    this.markersSize = innerWidth > 2560 ? 6 : 3;
    this.markersSize = innerWidth > 1920 ? 6 : 3;
    this.markersSize = innerWidth > 1391 ? 3 : 1;
  }

  async updateDataByTimeInterval() {
    const setInterval = interval(await this.service.getTimeInterval());
    setInterval.subscribe(x => {
      this.listLocationTSK();
      this.getTSKsummarydashboard(this.currentLocationValue);
      this.getLog(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)
      this.getLogMonth(this.currentLocationValue, this.currentDateTime, this.currentDeviceValue)


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

    return date + ' ' + time;

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

    this.optionsPie = {
      series: [0, 0],
      chart: {
        width: "70%",
        //width: this.width,
        // height: '100%',
        type: "pie"
      },
      labels: ["Device", "Problem Device"],
      legend: {
        show: false,
        fontSize: '100px',
      },
      colors: ['#45AEEF', '#C15748'],


      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
          }
        },
      }
    };

    this.optionsLine = {
      series: [],
      //colors:["#03A696","#9F56D5","#6081FF","#E3AC17"],
      chart: {
        height: '95%',
        background: '#292f33',
        fontFamily: 'Prompt, sans-serif',
        fontWeight: '400',
        type: "line",
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
        },
        fontSize: this.fontSize,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Log",
        align: "left",
        style: {
          fontSize: '20px',
          // fontWeight:  'bold',
          fontFamily: 'Prompt, sans-serif',
          fontWeight: '500',
          // color:  '#263238'
        },
      },
      markers: {
        size: this.markersSize,
      },
      noData: {
        text: 'No Data...'
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: this.fontSize,
          fontFamily: 'Roboto',
        },
      },
      xaxis: {
        categories: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
        ],
        labels: {
          style: {
            fontSize: this.fontSize,
            fontFamily: 'Roboto',
          }
        },
      },
      yaxis: {
        title: {
          text: "จำนวนที่เกิดขึ้น(ครั้ง)",
          style: {
            colors: [],
            fontSize: '16px',
            fontFamily: 'Prompt, sans-serif',
            fontWeight: '400',
          }
        },
        decimalsInFloat: false,
        labels: {
          style: {
            fontSize: this.fontSize,
            fontFamily: 'Roboto',
          }
        },
      },
      legend: {
        fontSize: this.fontSize,
      },
      responsive: [
        {
          breakpoint: 1391,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              fontSize: 10,
            }
          }
        }
      ],
      theme: {
        mode: 'dark',
        palette: 'palette1',

      }
    };

    this.RadialchartOptions = {
      series: [100,100],
      chart: {
        height: "250px",
        type: "radialBar"
      },
      colors: ['transparent', 'transparent'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "40px",
          },
          track: {
            background: 'transparent',
            opacity: 0.2,
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
          }
        }
      },
      labels: ["Online", "Offline"],
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


  async getLog(LocationSite: any, valueDate: number, valueDevice: string) {
    //console.log("LocationSite in Log= ", LocationSite)
    //console.log("valueDevice in Log= ", valueDevice)
    //console.log("valueDate in Log= ", valueDate)

    if (valueDate == 0) {
      console.log("///////////////////Active LOG 5 Week ///////////////////")
      var date = new Date();
      var firstDayOfMouth;
      firstDayOfMouth = new Date(date.getFullYear(), date.getMonth(), 1);
      //var lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      var lastDayOfMouth;
      lastDayOfMouth = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      //firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);


      const startDateLog = this.formatDate(firstDayOfMouth.toString());
      const stopDateLog = this.formatDate(lastDayOfMouth.toString());

      // console.log("startDate =", startDateLog);
      // console.log("stopDate = ", stopDateLog);
      let res: any;
      res = await this.service.getLog(startDateLog, stopDateLog, LocationSite);
      //if (res.status == 200) {
      this.service.responseTSKLog = res;
      //console.log("res check =",res.length)

      // console.log("responseTSKLog = ", this.service.responseTSKLog)

      var lineChart = new ApexCharts(
        document.querySelector("#lineChart"),
        this.optionsLine
      );

      lineChart.render();

      let LogServer: any = [];
      let LogNvr: any = [];
      let LogCamera: any = [];
      let LogSwitch: any = [];

      if (res.data.length == undefined || LocationSite.length == 0) {
        if (valueDevice == ''){
          lineChart.updateOptions({
            series: []
  
          })
          console.log("empty");
        }
        else{
        LogServer = [0, 0, 0, 0, 0];
        LogNvr = [0, 0, 0, 0, 0];
        LogCamera = [0, 0, 0, 0, 0];
        LogSwitch = [0, 0, 0, 0, 0];
        console.log("Log Server Week = ", LogServer);
        console.log("Log NVR Week = ", LogNvr);
        console.log("Log Camera Week = ", LogCamera);
        console.log("Log Swtich Week = ", LogSwitch);
        }

      }
      else {

        let ServerOffline: number[] = [];
        let ServerLog = this.service.responseTSKLog.data.find(x => x.NAME == "Server")?.log.forEach(object => {
          ServerOffline.push(object.offline)
        });
        LogServer = ServerOffline;

        let NVROffline: number[] = [];
        let NVRLog = this.service.responseTSKLog.data.find(x => x.NAME == "NVR")?.log.forEach(object => {
          NVROffline.push(object.offline)
        });
        LogNvr = NVROffline;

        let NetworkSwitchOffline: number[] = [];
        let NetworkSwitchLog = this.service.responseTSKLog.data.find(x => x.NAME == "Network Switch")?.log.forEach(object => {
          NetworkSwitchOffline.push(object.offline)
        });
        LogSwitch = NetworkSwitchOffline;

        let CameraOffline: number[] = [];
        let CameraLog = this.service.responseTSKLog.data.find(x => x.NAME == "Camera")?.log.forEach(object => {
          CameraOffline.push(object.offline)
        });
        LogCamera = CameraOffline;
        console.log("Log Data test1 = ", ServerOffline);
        console.log("Log Data test2 = ", NVROffline);
        console.log("Log Data test3 = ", NetworkSwitchOffline);
        console.log("Log Data test4 = ", CameraOffline);
      }

      //let LogDataCamera = TestLog.this.service;

      //}
      if (valueDevice == "1") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          }
          ]
        })
      }
      if (valueDevice == "1,2") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3,4") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          },
          {
            name: "Camera",
            data: LogCamera,
            color: "#E3AC17"
          }
          ],
        })
      }
      if (valueDevice == "2") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            }
          ]
        })
      }
      if (valueDevice == "2,3") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            }
          ]
        })
      }
      if (valueDevice == "2,3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "3") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF",
            }
          ]
        })
      }
      if (valueDevice == "3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
    }
    if (valueDate == 1) {
      console.log("///////////////////Active LOG 1 Month///////////////////")
      var date = new Date();
      var d = new Date(),
        month = d.getMonth() + 1;
      //console.log("Month = ", month);
      firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
      var lastdayvalue;
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        lastdayvalue = 31;
      }
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        lastdayvalue = 30;
      }
      if (month == 2) {
        var f = new Date();
        lastdayvalue = f.getDate();
      }
      lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), lastdayvalue);



      const startDateLog = this.formatDate(firstDayOfMouth.toString());
      const stopDateLog = this.formatDate(lastDayOfMouth.toString());

      // console.log("startDate =", startDateLog);
      // console.log("stopDate = ", stopDateLog);
      let res: any;
      res = await this.service.getLog(startDateLog, stopDateLog, LocationSite);
      if (res.length == 0) {
        return;
      }

      this.service.responseTSKLog = res;
      // console.log("responseTSKLog = ", this.service.responseTSKLog)

      var lineChart = new ApexCharts(
        document.querySelector("#lineChart"),
        this.optionsLine
      );

      lineChart.render();

      let LogServer: any = [];
      let LogNvr: any = [];
      let LogCamera: any = [];
      let LogSwitch: any = [];

      if (res.data.length == undefined || LocationSite.length == 0) {
        if (valueDevice == ''){
          lineChart.updateOptions({
            series: []
  
          })
          console.log("empty");
        }
        else {
        LogServer = [0, 0, 0, 0, 0];
        LogNvr = [0, 0, 0, 0, 0];
        LogCamera = [0, 0, 0, 0, 0];
        LogSwitch = [0, 0, 0, 0, 0];
        console.log("Log Server 1 Month = ", LogServer);
        console.log("Log NVR 1 Month = ", LogNvr);
        console.log("Log Camera 1 Month = ", LogCamera);
        console.log("Log Swtich 1 Month = ", LogSwitch);
        }
      }
      else {
        let ServerOffline: number[] = [];
        let ServerLog = this.service.responseTSKLog.data.find(x => x.NAME == "Server")?.log.forEach(object => {
          ServerOffline.push(object.offline)
        });
        LogServer = ServerOffline;

        let NVROffline: number[] = [];
        let NVRLog = this.service.responseTSKLog.data.find(x => x.NAME == "NVR")?.log.forEach(object => {
          NVROffline.push(object.offline)
        });
        LogNvr = NVROffline;

        let NetworkSwitchOffline: number[] = [];
        let NetworkSwitchLog = this.service.responseTSKLog.data.find(x => x.NAME == "Network Switch")?.log.forEach(object => {
          NetworkSwitchOffline.push(object.offline)
        });
        LogSwitch = NetworkSwitchOffline;

        let CameraOffline: number[] = [];
        let CameraLog = this.service.responseTSKLog.data.find(x => x.NAME == "Camera")?.log.forEach(object => {
          CameraOffline.push(object.offline)
        });
        LogCamera = CameraOffline;
        console.log("Log Server 1 Month = ", ServerOffline);
        console.log("Log NVR 1 Month = ", NVROffline);
        console.log("Log NetworkSwitch 1 Month = ", NetworkSwitchOffline);
        console.log("Log Camera 1 Month = ", CameraOffline);
        }

      if (valueDevice == "0") {
        lineChart.updateOptions({
          series: []

        })
      }
      if (valueDevice == "1") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          }
          ]
        })
      }
      if (valueDevice == "1,2") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3,4") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          },
          {
            name: "Camera",
            data: LogCamera,
            color: "#E3AC17"
          }
          ],
        })
      }
      if (valueDevice == "2") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            }
          ]
        })
      }
      if (valueDevice == "2,3") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            }
          ]
        })
      }
      if (valueDevice == "2,3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "3") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF",
            }
          ]
        })
      }
      if (valueDevice == "3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
    }
  }

  async getLogMonth(LocationSite: any, valueDate: number, valueDevice: string) {
    // console.log("LocationSite in LogMonth= ", LocationSite)
    // console.log("valueDevice in LogMonth= ", valueDevice)
    // console.log("valueDate in LogMonth= ", valueDate)


    if (valueDate == 3) {
      console.log("///////////////////Active LOG 3 Month///////////////////");
      var date = new Date();
      var d = new Date(),
        month = d.getMonth() + 1;
      //console.log("Month = ", month);
      var firstDayOfMouth;
      var lastDayOfMouth;
      firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
      var lastdayvalue;
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        lastdayvalue = 31;
      }
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        lastdayvalue = 30;
      }
      if (month == 2) {
        var f = new Date();
        lastdayvalue = f.getDate();
      }
      lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - 2, lastdayvalue);



      const startDateLog = this.formatDate(firstDayOfMouth.toString());
      const stopDateLog = this.formatDate(lastDayOfMouth.toString());

      console.log("startDate =", startDateLog);
      console.log("stopDate = ", stopDateLog);
      let res: any;
      res = await this.service.getLogMonth(startDateLog, stopDateLog, LocationSite);
      if (res.length == 0) {
        return;
      }
      //console.log("res log = ",res);
      //if (res.status == 200) {
      this.service.responseTSKLogMonth = res;
      console.log("responseTSK LogMonth = ", this.service.responseTSKLogMonth)

      var lineChart = new ApexCharts(
        document.querySelector("#lineChart"),
        this.optionsLine
      );

      lineChart.render();

      let LogServer: any = [];
      let LogNvr: any = [];
      let LogCamera: any = [];
      let LogSwitch: any = [];

      if (res.data.length == undefined || LocationSite.length == 0) {
        if (valueDevice == ''){
          lineChart.updateOptions({
            series: []
  
          })
          console.log("empty");
        }
        else{
        LogServer = [0, 0, 0];
        LogNvr = [0, 0, 0];
        LogCamera = [0, 0, 0];
        LogSwitch = [0, 0, 0];
        console.log("Log Server 3 Month = ", LogServer);
        console.log("Log Nvr 3 Month = ", LogNvr);
        console.log("Log Camera 3 Month = ", LogCamera);
        console.log("Log Switch 3 Month = ", LogSwitch);
        }
      }
      else {
        let ServerOffline: number[] = [];
        let ServerLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Server")?.log.forEach(object => {
          ServerOffline.push(object.offline)
        });
        LogServer = ServerOffline;

        let NVROffline: number[] = [];
        let NVRLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "NVR")?.log.forEach(object => {
          NVROffline.push(object.offline)
        });
        LogNvr = NVROffline;

        let NetworkSwitchOffline: number[] = [];
        let NetworkSwitchLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Network Switch")?.log.forEach(object => {
          NetworkSwitchOffline.push(object.offline)
        });
        LogSwitch = NetworkSwitchOffline;

        let CameraOffline: number[] = [];
        let CameraLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Camera")?.log.forEach(object => {
          CameraOffline.push(object.offline)
        });
        LogCamera = CameraOffline;

        console.log("Log Server 3 Month = ", LogServer);
        console.log("Log Nvr 3 Month = ", LogNvr);
        console.log("Log Camera 3 Month = ", LogCamera);
        console.log("Log Switch 3 Month = ", LogSwitch);
      }

      if (valueDevice == "0") {
        lineChart.updateOptions({
          series: []

        })
      }
      if (valueDevice == "1") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          }
          ]
        })
      }
      if (valueDevice == "1,2") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3,4") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          },
          {
            name: "Camera",
            data: LogCamera,
            color: "#E3AC17"
          }
          ],
        })
      }
      if (valueDevice == "2") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            }
          ]
        })
      }
      if (valueDevice == "2,3") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            }
          ]
        })
      }
      if (valueDevice == "2,3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "3") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF",
            }
          ]
        })
      }
      if (valueDevice == "3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      var date = new Date();
      console.log("switch Date = ", date.getMonth() + 1)
      if (valueDate == 3) {
        switch (date.getMonth() + 1) { //Note: 0=January, 1=February etc.
          case 1:
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
    if (valueDate == 6) {
      console.log("///////////////////Active LOG 6 Month///////////////////")
      var date = new Date();
      var d = new Date(),
        month = d.getMonth() + 1;
      console.log("Month = ", month);
      var firstDayOfMouth;
      var lastDayOfMouth;
      firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
      var lastdayvalue;
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        lastdayvalue = 31;
      }
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        lastdayvalue = 30;
      }
      if (month == 2) {
        var f = new Date();
        lastdayvalue = f.getDate();
      }
      lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - 1, lastdayvalue);



      const startDateLog = this.formatDate(firstDayOfMouth.toString());
      const stopDateLog = this.formatDate(lastDayOfMouth.toString());

      console.log("startDate =", startDateLog);
      console.log("stopDate = ", stopDateLog);
      let res: any;
      res = await this.service.getLogMonth(startDateLog, stopDateLog, LocationSite);
      if (res.length == 0) {
        return;
      }
      //console.log("res log = ",res);
      //if (res.status == 200) {
      this.service.responseTSKLogMonth = res;
      console.log("responseTSKLogMonth = ", this.service.responseTSKLogMonth)

      var lineChart = new ApexCharts(
        document.querySelector("#lineChart"),
        this.optionsLine
      );

      lineChart.render();

      let LogServer: any = [];
      let LogNvr: any = [];
      let LogCamera: any = [];
      let LogSwitch: any = [];


      if (res.data.length == undefined || LocationSite.length == 0) {
        if (valueDevice == ''){
          lineChart.updateOptions({
            series: []
  
          })
          console.log("empty");
        }
        else {
        LogServer = [0, 0, 0, 0, 0, 0, 0];
        LogNvr = [0, 0, 0, 0, 0, 0, 0];
        LogCamera = [0, 0, 0, 0, 0, 0, 0];
        LogSwitch = [0, 0, 0, 0, 0, 0, 0];
        console.log("Log Server 6 Month = ", LogServer);
        console.log("Log Nvr 6 Month = ", LogNvr);
        console.log("Log Camera 6 Month = ", LogCamera);
        console.log("Log Switch 6 Month = ", LogSwitch);
        }
      }
      else {
        let ServerOffline: number[] = [];
        let ServerLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Server")?.log.forEach(object => {
          ServerOffline.push(object.offline)
        });
        LogServer = ServerOffline;

        let NVROffline: number[] = [];
        let NVRLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "NVR")?.log.forEach(object => {
          NVROffline.push(object.offline)
        });
        LogNvr = NVROffline;

        let NetworkSwitchOffline: number[] = [];
        let NetworkSwitchLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Network Switch")?.log.forEach(object => {
          NetworkSwitchOffline.push(object.offline)
        });
        LogSwitch = NetworkSwitchOffline;

        let CameraOffline: number[] = [];
        let CameraLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Camera")?.log.forEach(object => {
          CameraOffline.push(object.offline)
        });
        LogCamera = CameraOffline;

        console.log("Log Server 6 Month = ", LogServer);
        console.log("Log Nvr 6 Month = ", LogNvr);
        console.log("Log Camera 6 Month = ", LogCamera);
        console.log("Log Switch 6 Month = ", LogSwitch);
      }

      if (valueDevice == "0") {
        lineChart.updateOptions({
          series: []

        })
      }
      if (valueDevice == "1") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          }
          ]
        })
      }
      if (valueDevice == "1,2") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3,4") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          },
          {
            name: "Camera",
            data: LogCamera,
            color: "#E3AC17"
          }
          ],
        })
      }
      if (valueDevice == "2") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            }
          ]
        })
      }
      if (valueDevice == "2,3") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            }
          ]
        })
      }
      if (valueDevice == "2,3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "3") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF",
            }
          ]
        })
      }
      if (valueDevice == "3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      var date = new Date();
      console.log("switch Date = ", date.getMonth() + 1)
      if (valueDate == 6) {
        switch (date.getMonth() + 1) {
          case 1:
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
    if (valueDate == 12) {
      console.log("///////////////////Active LOG 12 Month///////////////////")
      var date = new Date();
      var d = new Date(),
        month = d.getMonth() + 1;
      console.log("Month = ", month);
      var firstDayOfMouth;
      var lastDayOfMouth;
      firstDayOfMouth = new Date(date.getFullYear(), date.getMonth() - Number(valueDate), 1);
      var lastdayvalue;
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        lastdayvalue = 31;
      }
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        lastdayvalue = 30;
      }
      if (month == 2) {
        var f = new Date();
        lastdayvalue = f.getDate();
      }
      lastDayOfMouth = new Date(date.getFullYear(), date.getMonth() - 1, lastdayvalue);



      const startDateLog = this.formatDate(firstDayOfMouth.toString());
      const stopDateLog = this.formatDate(lastDayOfMouth.toString());

      console.log("startDate =", startDateLog);
      console.log("stopDate = ", stopDateLog);
      let res: any;
      res = await this.service.getLogMonth(startDateLog, stopDateLog, LocationSite);
      this.service.responseTSKLogMonth = res.data;
      console.log("response Log Month = ", this.service.responseTSKLogMonth)

      var lineChart = new ApexCharts(
        document.querySelector("#lineChart"),
        this.optionsLine
      );

      lineChart.render();

      let LogServer: any = [];
      let LogNvr: any = [];
      let LogCamera: any = [];
      let LogSwitch: any = [];

      if (res.data.length == undefined || LocationSite.length == 0) {
        if (valueDevice == ''){
          lineChart.updateOptions({
            series: []
  
          })
          console.log("empty");
        }
        else{
        LogServer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        LogNvr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        LogCamera = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        LogSwitch = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        console.log("Log Server 12 Month = ", LogServer);
        console.log("Log Nvr 12 Month = ", LogNvr);
        console.log("Log Camera 12 Month = ", LogCamera);
        console.log("Log Switch 12 Month = ", LogSwitch); 
        }
      }
      else {

        let ServerOffline: number[] = [];
        let ServerLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Server")?.log.forEach(object => {
          ServerOffline.push(object.offline)
        });
        LogServer = ServerOffline;

        let NVROffline: number[] = [];
        let NVRLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "NVR")?.log.forEach(object => {
          NVROffline.push(object.offline)
        });
        LogNvr = NVROffline;

        let NetworkSwitchOffline: number[] = [];
        let NetworkSwitchLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Network Switch")?.log.forEach(object => {
          NetworkSwitchOffline.push(object.offline)
        });
        LogSwitch = NetworkSwitchOffline;

        let CameraOffline: number[] = [];
        let CameraLog = this.service.responseTSKLogMonth.data.find(x => x.NAME == "Camera")?.log.forEach(object => {
          CameraOffline.push(object.offline)
        });
        LogCamera = CameraOffline;

        console.log("Log Server 12 Month = ", LogServer);
        console.log("Log Nvr 12 Month = ", LogNvr);
        console.log("Log Camera 12 Month = ", LogCamera);
        console.log("Log Switch 12 Month = ", LogSwitch);
      }

      if (valueDevice == "0") {
        lineChart.updateOptions({
          series: []

        })
      }
      if (valueDevice == "1") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          }
          ]
        })
      }
      if (valueDevice == "1,2") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          }
          ],
        })
      }
      if (valueDevice == "1,2,3,4") {
        lineChart.updateOptions({
          series: [{
            name: "Server",
            data: LogServer,
            color: "#03A696"
          },
          {
            name: "NVR",
            data: LogNvr,
            color: "#9F56D5"
          },
          {
            name: "Switch Network",
            data: LogSwitch,
            color: "#6081FF"
          },
          {
            name: "Camera",
            data: LogCamera,
            color: "#E3AC17"
          }
          ],
        })
      }
      if (valueDevice == "2") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            }
          ]
        })
      }
      if (valueDevice == "2,3") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            }
          ]
        })
      }
      if (valueDevice == "2,3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "NVR",
              data: LogNvr,
              color: "#9F56D5"
            },
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "3") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF",
            }
          ]
        })
      }
      if (valueDevice == "3,4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Switch Network",
              data: LogSwitch,
              color: "#6081FF"
            },
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      if (valueDevice == "4") {
        lineChart.updateOptions({
          series: [
            {
              name: "Camera",
              data: LogCamera,
              color: "#E3AC17"
            }
          ]
        })
      }
      var date = new Date();
      console.log("switch Date = ", date.getMonth() + 1)
      if (valueDate == 12) {
        switch (date.getMonth() + 1) {
          case 1:
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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
            lineChart.updateOptions({
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

  async getTSKsummarydashboard(LocationSite: any[]) {
    this.currentLocationValue = LocationSite;
    let res: any;
    res = await this.service.getTSKsummarydashboard(LocationSite);
    this.service.responseTSKDevice = res.data;
    // console.log("Device Response = ", this.service.responseTSKDevice)



    let Sumarizetotal = this.service.responseTSKDevice.summarize.total;
    let Sumarizeonline = this.service.responseTSKDevice.summarize.online;
    let Sumarizeoffline = this.service.responseTSKDevice.summarize.offline;
    this.problemDevices = Sumarizeoffline;
    this.totalDevices = Sumarizetotal;
    console.log("Total Device = ",this.totalDevices);

    let server = this.service.responseTSKDevice.devices.find(x => x.DEVICE_TYPE == "Server");
    this.serverOnline = server?.online;
    this.serverOffline = server?.offline;
    this.serverTotal = server?.total;
    console.log("this.serverTotal  = ",this.serverTotal );
    if (this.serverTotal == 0 && this.totalDevices == 0) {
      this.valueServerTotal = 0;
      this.valueServerOnline = 0;
      this.valueServerOffline = 0;
    }
    else {
      this.valueServerTotal = ((this.serverTotal) / (this.totalDevices)) * 100;
      if (this.valueServerTotal == NaN){
        this.valueServerTotal = 0;
      }
      if (this.serverTotal == 0){
        this.serverTotal = 1;
        this.valueServerOnline = (this.serverOnline * 100) / this.serverTotal;
        this.valueServerOffline = (this.serverOffline * 100) / this.serverTotal;
        this.serverTotal = 0;
      }
      else{
        this.valueServerOnline = (this.serverOnline * 100) / this.serverTotal;
        this.valueServerOffline = (this.serverOffline * 100) / this.serverTotal;
      }
      console.log("this.valueServerTotal  = ",this.valueServerTotal );
      console.log("this.valueServerOnline  = ",this.valueServerOnline );
      console.log("this.valueServerOffline  = ",this.valueServerOffline );
      /***0/0 ได้ค่า Nan */
    }
    console.log("this.valueServerOnline  = ",this.valueServerOnline );
    console.log("this.valueServerOffline  = ",this.valueServerOffline );


    let nvr = this.service.responseTSKDevice.devices.find(x => x.DEVICE_TYPE == "NVR");
    this.nvrOnline = nvr?.online;
    this.nvrOffline = nvr?.offline;
    this.nvrTotal = nvr?.total;
    if (this.nvrTotal == 0 && this.totalDevices == 0) {
      this.valueNvrTotal = 0;
      this.valueNvrOnline = 0;
      this.valueNvrOffline = 0;
    }
    else {
      this.valueNvrTotal = ((this.nvrTotal) / (this.totalDevices)) * 100;
      if (this.valueNvrTotal == NaN){
        this.valueNvrTotal = 0;
      }
      if (this.nvrTotal == 0){
        this.nvrTotal = 1;
        this.valueNvrOnline = (this.nvrOnline * 100) / this.nvrTotal;
        this.valueNvrOffline = (this.nvrOffline * 100) / this.nvrTotal;
        this.nvrTotal = 0;
      }
      this.valueNvrOnline = (this.nvrOnline * 100) / this.nvrTotal;
      this.valueNvrOffline = (this.nvrOffline * 100) / this.nvrTotal;
    }
    console.log("this.valueNvrTotal  = ",this.valueNvrTotal );
    console.log("this.valueNvrOnline  = ",this.valueNvrOnline );
    console.log("this.valueNvrOffline  = ",this.valueNvrOffline );
    // let workstation = this.service.responseTSKDevice.devices.find(x => x.DEVICE_TYPE == "Workstation");
    // this.workstationOnline = nvr?.online;
    // this.workstationOffline = nvr?.offline;
    // this.workstationTotal = nvr?.total;
    // this.valueWorkstationTotal = ((this.workstationTotal) / (this.totalDevices)) * 100;
    // this.valueWorkstationOnline = (this.workstationOnline * 100) / this.workstationTotal;
    // this.valueWorkstationOffline = (this.workstationOffline * 100) / this.workstationTotal;

    // if (this.valueWorkstationOffline == 0) {
    //   this.valueWorkstationOffline = NaN;
    // }
    // //this.valueNvrOnline = 100;
    // //this.valueNvrOffline = 100;

    let switchNetwork = this.service.responseTSKDevice.devices.find(x => x.DEVICE_TYPE == "Network Switch");
    this.switchNetworkOnline = switchNetwork?.online;
    this.switchNetworkOffline = switchNetwork?.offline;
    this.switchNetworkTotal = switchNetwork?.total;
    if (this.switchNetworkTotal == 0 && this.totalDevices == 0) {
      this.valueSwitchNetworkTotal = 0;
      this.valueSwitchNetworkOnline = 0;
      this.valueSwitchNetworkOffline = 0;
    }
    else {
      this.valueSwitchNetworkTotal = ((this.switchNetworkTotal) / (this.totalDevices)) * 100;
      if ( this.valueSwitchNetworkTotal == NaN){
        this.valueSwitchNetworkTotal = 0;
      }
      if (this.switchNetworkTotal == 0){
        this.switchNetworkTotal = 1;
        this.valueSwitchNetworkOnline = (this.switchNetworkOnline * 100) / this.switchNetworkTotal;
        this.valueSwitchNetworkOffline = (this.switchNetworkOffline * 100) / this.switchNetworkTotal;
        this.switchNetworkTotal = 0;
      }
      else{
        this.valueSwitchNetworkOnline = (this.switchNetworkOnline * 100) / this.switchNetworkTotal;
        this.valueSwitchNetworkOffline = (this.switchNetworkOffline * 100) / this.switchNetworkTotal;
      }
    }
    console.log("this.valueSwitchNetworkTotal  = ",this.valueSwitchNetworkTotal );
    console.log("this.valueSwitchNetworkOnline  = ",this.valueSwitchNetworkOnline );
    console.log("this.valueSwitchNetworkOffline  = ",this.valueSwitchNetworkOffline );


    let cctv = this.service.responseTSKDevice.devices.find(x => x.DEVICE_TYPE == "Camera");
    this.cctvOnline = cctv?.online;
    this.cctvOffline = cctv?.offline;
    //this.cctvtampering = cctv?.tampering;
    this.cctvTotal = cctv?.total;
    if (this.cctvTotal == 0 && this.totalDevices == 0) {
      this.valueCctvTotal = 0;
      this.valueCctvOnline = 0;
      this.valueCctvOffline = 0;
    }
    else {
      this.valueCctvTotal = ((this.cctvTotal) / (this.totalDevices)) * 100;
      if ( this.valueCctvTotal == NaN){
        this.valueCctvTotal = 0;
      }
      if (this.cctvTotal == 0){
        this.cctvTotal = 1;
        this.valueCctvOnline = (this.cctvOnline * 100) / this.cctvTotal;
        this.valueCctvOffline = (this.cctvOffline * 100) / this.cctvTotal;
        this.cctvTotal = 0;
      }
      else{
        this.valueCctvOnline = (this.cctvOnline * 100) / this.cctvTotal;
        this.valueCctvOffline = (this.cctvOffline * 100) / this.cctvTotal;
      }
    }
    console.log("this.valueCctvTotal  = ",this.valueCctvTotal );
    console.log("this.valueCctvOnline  = ",this.valueCctvOnline );
    console.log("this.valueCctvOffline  = ",this.valueCctvOffline );
    //this.valueCctvTampering = (this.cctvtampering * 100) / this.cctvTotal;
    // console.log("TotalDevice = ", this.totalDevices);
    // console.log("ProblemDevice = ", this.problemDevices);
    if (this.totalDevices != 0 || this.problemDevices != 0) {
      var PieChart = new ApexCharts(
        document.querySelector("#PieChart"),
        this.optionsPie
      );

      PieChart.render();

      PieChart.updateOptions({
        series: [this.totalDevices, this.problemDevices],
        chart: {
          width: "70%",
          animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 1,
                animateGradually: {
                  enabled: true,
                  delay: 150
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              },
          type: "pie"
        },
        labels: ["Device", "Problem Device"],
        legend: {
          show: false,
          fontSize: '16px',
        },
        colors: ['#45AEEF', '#C15748'],
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'none',
            }
          },
        }

      });
    }
    else {
      var PieChart = new ApexCharts(
        document.querySelector("#PieChart"),
        this.optionsPie
      );

      PieChart.render();

      PieChart.updateOptions({
        series: [0, 0],
        chart: {
          width: "70%",
          animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 1,
                animateGradually: {
                  enabled: true,
                  delay: 150
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              },
          type: "pie"
        },
        labels: ["Device", "Problem Device"],
        legend: {
          show: false,
          fontSize: '16px',
        },
        colors: ['#45AEEF', '#C15748'],
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'none',
            }
          },
        }

      });
    }
    /*************************************************************Radial Charts***************************************************************/
    var RadialChart = new ApexCharts(
      document.querySelector("#RadialchartServer"),
      this.RadialchartOptions
    );

    RadialChart.render();

    RadialChart.updateOptions({
      series: [this.valueServerOnline,this.valueServerOffline],
      chart: {
        height: "250px",
        type: "radialBar"
      },
      colors: ['#03A696', '#9FD1CC'],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "40px",
          },
          track: {
            background: '#03A696',
            opacity: 0.2,
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
          }
        }
      },
      labels: ["Online", "Offline"],
    });

    var RadialChart = new ApexCharts(
      document.querySelector("#RadialchartNvr"),
      this.RadialchartOptions
    );

    RadialChart.render();

    RadialChart.updateOptions({
      series: [this.valueNvrOnline, this.valueNvrOffline],
      chart: {
        height: "250px",
        type: "radialBar"
      },
      colors: ['#9F56D5', '#CAB5D9'],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "40px",
          },
          track: {
            background: '#9F56D5',
            opacity: 0.2,
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
          }
        }
      },
      labels: ["Online", "Offline"]
    });

    var RadialChart = new ApexCharts(
      document.querySelector("#RadialchartSwitch"),
      this.RadialchartOptions
    );

    RadialChart.render();

    RadialChart.updateOptions({
      series: [this.valueSwitchNetworkOnline, this.valueSwitchNetworkOffline],
      chart: {
        height: "250px",
        type: "radialBar"
      },
      colors: ['#6081FF', '#B4C1F4'],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "40%",
          },
          track: {
            background: '#6081FF',
            opacity: 0.2,
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
          }
        }
      },
      labels: ["Online", "Offline"]
    });

    var RadialChart = new ApexCharts(
      document.querySelector("#RadialchartCamera"),
      this.RadialchartOptions
    );

    RadialChart.render();

    RadialChart.updateOptions({
      //series: [this.valueCctvOnline, this.valueCctvOffline,this.valueCctvTampering],
      series: [this.valueCctvOnline, this.valueCctvOffline],
      chart: {
        height: "250px",
        type: "radialBar"
      },
      //colors: ['#96710B', '#E3AC17','#E4D3A6'],
      colors: ['#96710B', '#E3AC17'],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "40%",
          },
          track: {
            background: '#96710B',
            opacity: 0.2,
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
          }
        }
      },
      labels: ["Online", "Offline", "Tampering"]
    });
    /*****Ending Fly Wing *****/
   }
}
