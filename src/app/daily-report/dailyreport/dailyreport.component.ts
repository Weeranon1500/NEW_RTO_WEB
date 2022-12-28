import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
import { DatePipe } from '@angular/common'
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { LoaderService } from 'src/app/service/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { UserProfile } from 'src/app/models/model';
import { element } from 'protractor';
import { slice } from 'lodash';
import { SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dailyreport',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css']
})
export class DailyreportComponent implements OnInit {

  ButtonDisable = true;
  SearchDisable = true;
  SearchWordDisable = true;
  SpinnerPlay = 0;
  Nodata = 0;
  options = ["Internet Explorer", "Edge", "Firefox", "Chrome", "Opera", "Safari"]
  listOfOptions = []


  displayedColumns = ['ID', 'STAMP_DATETIME', 'LOCATION_NAME', 'DEVICE_NAME', 'EVENT_NAME', 'DATE', 'TIME', 'SUMMARY_TYPE'];
  numbers: number[] = [];
  searchText: any;
  SearchWord: any;
  SearchWordModel: any;
  public selectedItem: any;
  public filter1: any;
  public FilterSUMMARY_TYPE: any[] = [];
  public limitDate = new Date();
  public DateTimeCalendar: any = "";
  public DateTimeCalendarFromTo: any;
  public DateTimeCalendarFrom!: Date;
  public DateTimeCalendarTo!: Date;
  public DateTimeCalendarRange: any = '';
  public DateTimeCalendarRangeTo: any = '';
  public DateTimeCalendarRangeFrom: any = '';
  public ChoosecurrentCalendar = new Date();
  public StartCalendar!: any;
  public StopCalendar!: any;
  public StartTime!: any;
  public StopTime!: any;
  StartcurrentCalendar: any;
  StopcurrentCalendar: any;
  currentCalendar: any;
  currentCalendarFromTo: any;
  currentCalendarFrom: any;
  Time1: any;
  Time2: any;
  public ALLSite_ID: any;
  public OriginalALLSite_ID: any;
  public ALLDevice_ID: any;
  public OriginalALLDevice_ID: any;
  CountSelectedLocation = '';
  SelectedLocationDisplay: any;

  CountSelectedDevice = '';
  SelectedDeviceDisplay: any;

  CountSelectedStatus = '';
  SelectedStatusDisplay: any;

  ClickLocationCount: any = 0;
  ClickLocationDisplay: any;

  ClickDeviceCount: any = 0;
  ClickDeviceDisplay: any = '';

  ClickStatusCount: any = 0;
  ClickStatusDisplay: any = '';

  PaginationDisplay = true;

  EventStatusCheck: any = '';
  EventStatusCheckExport: any = '';

  /*
  currentLocationSite: any = [] 
  currentLocationValue: any = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15] 
  selectedSiteLocationModel: any = 'ทั้งหมด'
  selectedSiteLocation: any[] = [
  {id: 1, name: "การ์เด้น โฮม วิลเลจ", group: "ทั้งหมด"},
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
  {id: 14, name: "อายิโนะโมะโต๊ะเซลส์ สาขา หาดใหญ่", group: "ทั้งหมด"}
  ]
*/
  currentLocationReport: any = []
  currentLocationReportValue: any = []
  ClonecurrentLocationReportValue: any = []
  currentLocationReportValueCompare1 = 0;
  currentLocationReportValueCompare2 = 0;
  CloneSelectLocation: any[] = [];
  CloneSelectLocationCopy: any[] = [];
  selectedSiteLocationReportModel: any = ''
  selectedSiteLocationReport: any[] = [
    /*
  {SITE_ID: 1, name: "การ์เด้น โฮม วิลเลจ", group: "ทั้งหมด"},
  {SITE_ID: 3, name: "บริษัท ไอเอฟเอส ฟาซิลิตี้ เซอร์วิสเซส จำกัด", group: "ทั้งหมด"},
  {SITE_ID: 4, name: "บริษัท สกาย ไอซีที จำกัด (มหาชน)", group: "ทั้งหมด"},
  {SITE_ID: 6, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ธนบุรี", group: "ทั้งหมด"},
  {SITE_ID: 8, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ฉะเชิงเทรา", group: "ทั้งหมด"},
  {SITE_ID: 9, name: "อายิโนะโมะโต๊ะเซลส์ สาขา รามอินทรา", group: "ทั้งหมด"},
  {SITE_ID: 10, name: "อาคารทดสอบตรวจจับใบหน้า", group: "ทั้งหมด"},
  {SITE_ID: 11, name: "อายิโนะโมะโต๊ะเซลส์ สาขา บางปู", group: "ทั้งหมด"},
  {SITE_ID: 12, name: "อายิโนะโมะโต๊ะเซลส์ สาขา นนทบุรี", group: "ทั้งหมด"},
  {SITE_ID: 13, name: "อายิโนะโมะโต๊ะเซลส์ สาขา พัฒนาการ", group: "ทั้งหมด"},
  {SITE_ID: 14, name: "อายิโนะโมะโต๊ะเซลส์ สาขา หาดใหญ่", group: "ทั้งหมด"},
  {SITE_ID: 15, name: "อายิโนะโมะโต๊ะเซลส์ สาขา ร้อยเอ็ด", group: "ทั้งหมด"}
  */
  ]

  selectedSiteLocationReportCopy: any[] = []

  selectedSiteLocationReportSort: any[] = []
  CloneselectedSiteLocationReportSort: any[] = []
  BackupselectedSiteLocationReportSort: any[] = []

  currentDeviceReport: any = []
  currentDeviceReportValue: any = []
  ClonecurrentDeviceReportValue: any = []
  currentDeviceReportValueCompare1 = 0;
  currentDeviceReportValueCompare2 = 0;
  selectedDeviceReportModel: any = ''
  selectedDeviceReport: any[] = []
  BackupselectedDeviceReport: any[] = [];
  BackupAllselectedDeviceReport: any[] = []
  CloneselectedDeviceReport: any[] = []
  listDeviceReport: any[] = [];

  currentStatusReport: any = []
  currentStatusReportValue: any = []
  ClonecurrentStatusReportValue: any = []
  currentStatusReportValueCompare1 = 0;
  currentStatusReportValueCompare2 = 0;
  selectedStatusReportModel: any = ''
  selectedStatusReport: any[] = [
    { EVENT_ID: 37, name: "Camera Connect", group: "ทั้งหมด" },
    { EVENT_ID: 38, name: "Camera Disconnect", group: "ทั้งหมด" },
    { EVENT_ID: 53, name: "Fire Alarm", group: "ทั้งหมด" },
    { EVENT_ID: 90, name: "Intrusion Alarm", group: "ทั้งหมด" },
    { EVENT_ID: 104, name: "Face Recognition Black list", group: "ทั้งหมด" },
    { EVENT_ID: 107, name: "Face Recognition Warning", group: "ทั้งหมด" },
    { EVENT_ID: 244, name: "Emergency Call", group: "ทั้งหมด" },
    { EVENT_ID: 253, name: "ABANDONED OBJECT", group: "ทั้งหมด" },
    { EVENT_ID: 254, name: "MISSING OBJECT", group: "ทั้งหมด" },
  ]

  CloneselectedStatusReport: any[] = [
    { EVENT_ID: 37, name: "Camera Connect", group: "ทั้งหมด" },
    { EVENT_ID: 38, name: "Camera Disconnect", group: "ทั้งหมด" },
    { EVENT_ID: 53, name: "Fire Alarm", group: "ทั้งหมด" },
    { EVENT_ID: 90, name: "Intrusion Alarm", group: "ทั้งหมด" },
    { EVENT_ID: 104, name: "Face Recognition Black list", group: "ทั้งหมด" },
    { EVENT_ID: 107, name: "Face Recognition Warning", group: "ทั้งหมด" },
    { EVENT_ID: 244, name: "Emergency Call", group: "ทั้งหมด" },
    { EVENT_ID: 253, name: "ABANDONED OBJECT", group: "ทั้งหมด" },
    { EVENT_ID: 254, name: "MISSING OBJECT", group: "ทั้งหมด" },
  ]

  BackupselectedStatusReport: any[] = [
    { EVENT_ID: 37, name: "Camera Connect", group: "ทั้งหมด" },
    { EVENT_ID: 38, name: "Camera Disconnect", group: "ทั้งหมด" },
    { EVENT_ID: 53, name: "Fire Alarm", group: "ทั้งหมด" },
    { EVENT_ID: 90, name: "Intrusion Alarm", group: "ทั้งหมด" },
    { EVENT_ID: 104, name: "Face Recognition Black list", group: "ทั้งหมด" },
    { EVENT_ID: 107, name: "Face Recognition Warning", group: "ทั้งหมด" },
    { EVENT_ID: 244, name: "Emergency Call", group: "ทั้งหมด" },
    { EVENT_ID: 253, name: "ABANDONED OBJECT", group: "ทั้งหมด" },
    { EVENT_ID: 254, name: "MISSING OBJECT", group: "ทั้งหมด" },
  ]

  selectedSiteLocationName: any[] = []

  ReportData: any[] = [];
  ExportReportData: any[] = [];

  isLoading: Subject<boolean> = this.loader.isLoading;

  DateWarningDisplay = true;
  TimeWarningHidden = true;
  TimeInvalidHidden = true;


  constructor(private excelService: ExcelService, public datepipe: DatePipe, private service: ServiceDevicesService, private loader: LoaderService
    , private spinner: NgxSpinnerService) {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
  }

  exportAsXLSX(): void {
    if (this.ReportData.length != 0) {
      this.excelService.exportAsExcelFile(this.ExportReportData, 'Event_Report');
    }
  }



  ngOnInit(): void {

    this.selectedStatusReport.sort((a, b) => a.name.localeCompare(b.name))
    this.CloneselectedStatusReport.sort((a, b) => a.name.localeCompare(b.name))
    this.BackupselectedStatusReport.sort((a, b) => a.name.localeCompare(b.name))

    this.showSpinner();

    this.Time1 = "00:00";
    this.Time2 = "23:59";
    this.StartTime = "00:00";
    this.StopTime = "23:59";

    this.StartCalendar = new Date().toLocaleDateString('en-US');
    this.StopCalendar = new Date().toLocaleDateString('en-US');
    //console.log("Original Start Date Time Calendar = ",this.StartCalendar);
    //console.log("Original Stop Date Time Calendar = ",this.StopCalendar);
    let DateConvert1 = this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
    let DateConvert2 = this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');
    this.StartcurrentCalendar = DateConvert1;
    this.StopcurrentCalendar = DateConvert2;
    //console.log("Start Date Time Calendar = ",this.StartcurrentCalendar);
    //console.log("Stop Date Time Calendar = ",this.StopcurrentCalendar);
    this.DateTimeCalendarRange = this.StartcurrentCalendar + ' - ' + this.StopcurrentCalendar;

    this.loginGSOC();
    this.getUserProfile();
    this.showSwitch();
    //this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar,this.StartTime,this.StopTime,this.currentLocationReportValue,this.currentDeviceReportValue,this.currentStatusReportValue);
  }

  changeTimeCalendar(valueCalendar: Date) {
    this.currentCalendar = valueCalendar;
    this.StartCalendar = this.currentCalendar[0];
    this.StopCalendar = this.currentCalendar[1];
    console.log("Original Start Date Time Calendar = ", this.StartCalendar);
    console.log("Original Stop Date Time Calendar = ", this.StopCalendar);
    let DateConvert1 = this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
    let DateConvert2 = this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');
    this.StartcurrentCalendar = DateConvert1;
    this.StopcurrentCalendar = DateConvert2;

    console.log("Start Date Time Calendar = ", this.StartcurrentCalendar);
    console.log("Stop Date Time Calendar = ", this.StopcurrentCalendar);
    this.DateTimeCalendarRange = this.StartcurrentCalendar + ' - ' + this.StopcurrentCalendar;
    if (this.DateTimeCalendarRange != "Start Time" + ' - ' + "Stop Time") {
      this.DateWarningDisplay = true;
    }
    if (this.StartcurrentCalendar != this.StopcurrentCalendar) {
      this.TimeInvalidHidden = true;
      if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
        this.SearchDisable = true;
        this.SearchWordDisable = true;
      }
      else {
        this.SearchDisable = false;
        this.SearchWordDisable = false;
      }
    }
    if (this.StartcurrentCalendar == this.StopcurrentCalendar) {
      if (this.StopTime < this.StartTime) {
        this.TimeInvalidHidden = false;
        this.SearchDisable = true;
        this.SearchWordDisable = true;
      }
      else {
        this.TimeInvalidHidden = true;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.SearchDisable = false;
          this.SearchWordDisable = false;
        }
      }
    }
    //this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar,this.StartTime,this.StopTime,this.currentLocationReportValue,this.currentDeviceReportValue,this.currentStatusReportValue);
    //this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

  }

  startTime(FirstTime: any) {
    if (this.StartcurrentCalendar == this.StopcurrentCalendar) {
      //console.log(FirstTime);
      console.log("Same Day");
      this.StartTime = FirstTime;
      if (this.StartTime == '' || this.StopTime == '') {
        this.TimeWarningHidden = false;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
      }
      else {
        this.TimeWarningHidden = true;
        if (this.StopTime < this.StartTime) {
          this.TimeInvalidHidden = false;
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.TimeInvalidHidden = true;
          if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
            this.SearchDisable = true;
            this.SearchWordDisable = true;
          }
          else {
            this.SearchDisable = false;
            this.SearchWordDisable = false;
          }
        }
      }
    }
    else {
      this.TimeInvalidHidden = true;
      //console.log(FirstTime);
      console.log("Not Same Day");
      this.StartTime = FirstTime;
      if (this.StartTime == '' || this.StopTime == '') {
        this.TimeWarningHidden = false;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
      }
      else {
        this.TimeWarningHidden = true;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.SearchDisable = false;
          this.SearchWordDisable = false;
        }
      }
    }
  }

  stopTime(lastTime: any) {
    if (this.StartcurrentCalendar == this.StopcurrentCalendar) {
      //console.log(lastTime);
      console.log("Same Day");
      this.StopTime = lastTime;
      if (this.StopTime == '' || this.StartTime == '') {
        this.TimeWarningHidden = false;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
      }
      else {
        this.TimeWarningHidden = true;
        if (this.StopTime < this.StartTime) {
          this.TimeInvalidHidden = false;
          this.SearchDisable = true;
          this.SearchWordDisable = true;
        }
        else {
          this.TimeInvalidHidden = true;
          if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
            this.SearchDisable = true;
            this.SearchWordDisable = true;
          }
          else {
            this.SearchDisable = false;
            this.SearchWordDisable = false;
          }
        }
      }
    }
    else {
      this.TimeInvalidHidden = true;
      //console.log(lastTime);
      console.log("Not Same Day");
      this.StopTime = lastTime;
      if (this.StopTime == '' || this.StartTime == '') {
        this.TimeWarningHidden = false;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
        }
        else {
          this.SearchDisable = true;
        }
      }
      else {
        this.TimeWarningHidden = true;
        if (this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
          this.SearchDisable = true;
        }
        else {
          this.SearchDisable = false;
        }
      }
    }
  }

  SearchTextReport(word: any) {
    this.SearchWordModel = word;
    this.SearchWordModel.toString();
    this.SearchWord = this.SearchWordModel;
  }

  EnterWord(word: any) {
    this.currentPageSelect = 1;
    this.PageCurrent = 1;
    this.SearchWord = word.target.value;
    this.SearchWord.toString();
    console.log(this.SearchWord);
    this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar, this.StartTime, this.StopTime, this.currentLocationReportValue, this.currentDeviceReportValue, this.currentStatusReportValue, this.currentPageSelect, this.SearchWord);
  }

  changeLocation(LocationSite: any[]) {
    this.currentLocationReportValue = LocationSite;
    if (this.TimeWarningHidden == false || this.TimeInvalidHidden == false || this.currentLocationReportValue.length == 0 || this.currentDeviceReportValue.length == 0 || this.currentStatusReportValue.length == 0) {
      this.SearchDisable = true;
      this.SearchWordDisable = true;
    }
    else {
      this.SearchDisable = false;
      this.SearchWordDisable = false;
    }
    if (this.currentLocationReportValue == "ทั้งหมด") {
      this.currentLocationReportValue = this.OriginalALLSite_ID;
      this.selectedSiteLocationReportModel = this.OriginalALLSite_ID;
      this.ALLSite_ID = this.OriginalALLSite_ID;
      this.CountSelectedLocation = this.currentLocationReportValue.length + ' ' + 'Location Selected';
    }
    else {
      this.ALLSite_ID = LocationSite;
      this.selectedSiteLocationReportModel = this.ALLSite_ID;
      this.CountSelectedLocation = LocationSite.length + ' ' + 'Location Selected';
    }

    this.currentLocationReportValue.sort(function (a: number, b: number) {
      return a - b;
    });

    this.selectedDeviceReport = [];
    this.selectedDeviceReport = this.listDeviceReport;
    //console.log("Transfer =",this.selectedDeviceReport);
    /* 
    if(LocationSite.length == 0){
      this.selectedDeviceReport = [];
      this.selectedDeviceReport = this.BackupAllselectedDeviceReport;
      console.log("Backup All =",this.BackupAllselectedDeviceReport)
    }
    */
    if (LocationSite.length != 0 && this.word.length == 0) {
      this.SelectedLocationDisplay = false;
    }
    else {
      this.SelectedLocationDisplay = true;
    }



    let FilterDevice: any;
    let FilterDeviceLength: any;
    let SelectLocationValue: any;
    let CloneselectedDeviceReport: any;
    FilterDevice = [];
    CloneselectedDeviceReport = this.CloneselectedDeviceReport;
    //console.log("Clone Device",this.CloneselectedDeviceReport);
    FilterDeviceLength = this.currentLocationReportValue.length;
    for (let i = 0; i <= FilterDeviceLength - 1; i++) {
      SelectLocationValue = CloneselectedDeviceReport.filter((x: { SITE_ID: any; }) => x.SITE_ID == this.currentLocationReportValue[i]);
      FilterDevice = FilterDevice.concat(SelectLocationValue);/***************เลือกอันใหม่ก็จะเติมเข้าไปเรื่อยๆ********************************/
    }
    FilterDevice.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name))
    for (let i = 0; i <= FilterDevice.length - 1; i++) {
      this.ALLDevice_ID = FilterDevice.map((x: { DEVICE_ID: any; }) => x.DEVICE_ID);
    }
    this.OriginalALLDevice_ID = this.ALLDevice_ID;
    //console.log('Original Select Device = ',this.OriginalALLDevice_ID);
    this.AutoSelectDevice();
    this.AutoSelectStatus()
    console.log("Location ID = ", this.currentLocationReportValue);
    this.selectedDeviceReport = [];
    this.selectedDeviceReport = FilterDevice;
    if (this.selectedDeviceReport.length == 0) {
      this.SelectedDeviceDisplay = true;
      this.SelectedStatusDisplay = true;
      this.ALLDevice_ID = [];
    }
    else {
      this.SelectedDeviceDisplay = false;
      this.SelectedStatusDisplay = false;
      this.CountSelectedDevice = this.selectedDeviceReport.length + ' ' + 'Device Selected';
    }
    this.selectedDeviceReport.sort((a, b) => a.name.localeCompare(b.name))/***************************เรียงชื่ออุปกรณ์********************************* */
    this.BackupselectedDeviceReport = this.selectedDeviceReport;
    //console.log("Filter Device =", FilterDevice);
    //console.log("ALL Device ID =", this.ALLDevice_ID);
    this.currentDeviceReportValue = this.ALLDevice_ID.toString();

    if (this.TimeWarningHidden == false || this.TimeInvalidHidden == false || this.currentStatusReportValue.length == 0 || this.currentLocationReportValue == 0 || this.currentDeviceReportValue == 0) {
      this.SearchDisable = true;
      this.SearchWordDisable = true;
    }
    else {
      this.SearchDisable = false;
      this.SearchWordDisable = false;
    }

    this.currentLocationReportValueCompare1 = this.currentLocationReportValue.length;
    this.ClonecurrentLocationReportValue = this.currentLocationReportValue;/***********************Dynamic Selected Dropdown*********************************/
    this.currentLocationReportValue = this.currentLocationReportValue.toString();
    //console.log("Location ID To String = ",this.currentLocationReportValue);
    //this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar,this.StartTime,this.StopTime,this.currentLocationReportValue,this.currentDeviceReportValue,this.currentStatusReportValue);


  }

  changeDevice(Device: any[]) {
    this.currentDeviceReportValue = Device;
    if (this.TimeWarningHidden == false || this.TimeInvalidHidden == false || this.currentStatusReportValue.length == 0 || this.currentLocationReportValue == 0 || this.currentDeviceReportValue == 0) {
      this.SearchDisable = true;
      this.SearchWordDisable = true;
    }
    else {
      this.SearchDisable = false;
      this.SearchWordDisable = false;
    }

    console.log("Select Device ID =", this.currentDeviceReportValue);
    if (this.currentDeviceReportValue == "ทั้งหมด") {
      console.log("เลือก Device ทั้งหมด");
      this.currentDeviceReportValue = this.OriginalALLDevice_ID;
      this.selectedDeviceReportModel = this.OriginalALLDevice_ID;
      console.log('Original Select Device = ', this.OriginalALLDevice_ID);
      this.CountSelectedDevice = this.currentDeviceReportValue.length + ' ' + 'Device Selected';
    }
    else {
      this.CountSelectedDevice = this.currentDeviceReportValue.length + ' ' + 'Device Selected';
    }
    this.currentDeviceReportValue.sort(function (a: number, b: number) {
      return a - b;
    });
    this.currentDeviceReportValueCompare1 = this.currentDeviceReportValue.length;
    this.ClonecurrentDeviceReportValue = this.currentDeviceReportValue;
    this.currentDeviceReportValue = this.currentDeviceReportValue.toString();
    console.log("Select Device Value =", this.currentDeviceReportValue);

    if (Device.length != 0 && this.word2.length == 0) {
      this.SelectedDeviceDisplay = false;
    }
    else {
      this.SelectedDeviceDisplay = true;
    }
    //this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar,this.StartTime,this.StopTime,this.currentLocationReportValue,this.currentDeviceReportValue,this.currentStatusReportValue);


  }

  changeEvent(Event: any[]) {
    this.currentStatusReportValue = Event;
    if (this.TimeWarningHidden == false || this.TimeInvalidHidden == false || this.currentStatusReportValue.length == 0 || this.currentLocationReportValue == 0 || this.currentDeviceReportValue == 0) {
      this.SearchDisable = true;
      this.SearchWordDisable = true;
    }
    else {
      this.SearchDisable = false;
      this.SearchWordDisable = false;
    }
    if (this.currentStatusReportValue == "ทั้งหมด") {
      this.currentStatusReportValue = [37, 38, 53, 90, 104, 107, 244, 253, 254];
      this.selectedStatusReportModel = [37, 38, 53, 90, 104, 107, 244, 253, 254];
      this.CountSelectedStatus = this.currentStatusReportValue.length + ' ' + 'Event Selected';
    }
    else {
      this.selectedStatusReportModel = Event;
      this.CountSelectedStatus = this.currentStatusReportValue.length + ' ' + 'Event Selected';
    }
    this.currentStatusReportValue.sort(function (a: number, b: number) {
      return a - b;
    });
    this.ClonecurrentStatusReportValue = this.currentStatusReportValue;
    this.currentStatusReportValueCompare1 = this.currentStatusReportValue.length;
    this.currentStatusReportValue = this.currentStatusReportValue.toString();
    if (Event.length != 0 && this.word3.length == 0) {/************ถ้าเลือกอยู่แล้วไม่ได้พิมพ์****************** */
      this.SelectedStatusDisplay = false;
    }
    else {
      this.SelectedStatusDisplay = true;
    }
    //this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar,this.StartTime,this.StopTime,this.currentLocationReportValue,this.currentDeviceReportValue,this.currentStatusReportValue);


  }

  async loginGSOC() {
    let res: any = await this.service.loginGSOC();
    if (res.status == 200) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshtoken', res.data.refreshtoken);
    }
  }

  async getDailyReport(START_DATE: any, STOP_DATE: any, START_TIME: any, STOP_TIME: any, LocationSite: any[], Device: any[], Event: any[], Page: any, Word: any) {
    this.Nodata = 0;
    let res: any;
    let resAllPageReport: any;
    res = await this.service.getReport(START_DATE, STOP_DATE, START_TIME, STOP_TIME, LocationSite, Device, Event, Page, Word);
    //console.log("res Daily Report = ",res);
    this.ReportData = [];
    this.ReportData = res.data;
    resAllPageReport = res.pagination.allPage;
    this.PageMaxSize = resAllPageReport * this.PageSize;
    let ChangeColumn: any[] = [];
    let EventStatus: any;
    EventStatus = this.ReportData.map(x => x.SUMMARY_TYPE);
    //this.EventStatusCheck = EventStatus;
    this.EventStatusCheck = EventStatus.find((x: undefined) => x == 'faultalarm');
    console.log("Event Status =", this.EventStatusCheck);
    //console.log("Daily Report = ",this.ReportData);
    //console.log("Check =",this.ReportData.length)
    for (const item of this.ReportData) {
      ChangeColumn.push({ ID: item.ID, DATE: item.DATE, TIME: item.TIME, LOCATION: item.LOCATION_NAME, DEVICE: item.DEVICE_NAME, EVENT: item.EVENT_NAME, EVENT_STATUS: item.SUMMARY_TYPE })
    }
    this.ReportData = ChangeColumn;
    //console.log("Daily Report Change Column = ", this.ReportData);
    if (this.ReportData.length == 0) {
      this.PaginationDisplay = true;
    }
    else {
      this.PaginationDisplay = false;
    }
  }

  async getDailyReportExport(START_DATE: any, STOP_DATE: any, START_TIME: any, STOP_TIME: any, LocationSite: any[], Device: any[], Event: any[]) {
    this.Nodata = 0;
    let res: any;
    res = await this.service.getReportExport(START_DATE, STOP_DATE, START_TIME, STOP_TIME, LocationSite, Device, Event);
    //console.log("res Daily Report = ",res);
    this.ExportReportData = [];
    this.ExportReportData = res.data;
    let ChangeColumn: any[] = [];
    let EventStatus2: any;
    EventStatus2 = this.ExportReportData.map(x => x.SUMMARY_TYPE);
    //this.EventStatusCheck = EventStatus;
    this.EventStatusCheckExport = EventStatus2.find((x: undefined) => x == 'faultalarm');
    console.log("Event Status =", this.EventStatusCheckExport);
    //console.log("Daily Report = ",this.ReportData);
    //console.log("Check =",this.ReportData.length)
    if (this.EventStatusCheckExport == undefined) {
      for (const item of this.ExportReportData) {
        ChangeColumn.push({ ID: item.ID, DATE: item.DATE, TIME: item.TIME, LOCATION: item.LOCATION_NAME, DEVICE: item.DEVICE_NAME, EVENT: item.EVENT_NAME, })
      }
    }
    else {
      for (const item of this.ExportReportData) {
        ChangeColumn.push({ ID: item.ID, DATE: item.DATE, TIME: item.TIME, LOCATION: item.LOCATION_NAME, DEVICE: item.DEVICE_NAME, EVENT: item.EVENT_NAME, EVENT_STATUS: item.SUMMARY_TYPE })
      }
    }
    this.ExportReportData = ChangeColumn;
    //console.log("Daily Report Change Column = ", this.ExportReportData);
    if (this.ExportReportData.length == 0) {
      this.ButtonDisable = true;
      console.log("Nodata")
    }
    else {
      this.ButtonDisable = false;
    }
  }
  ClearDevice = 0;
  ClearFilter() {
    this.SearchWord = '';
    this.SearchWordModel = '';
    this.ReportData = [];
    this.ExportReportData = [];
    this.selectedDeviceReport = [];
    this.selectedSiteLocationReportModel = [];
    this.selectedDeviceReportModel = [];
    this.selectedStatusReportModel = [];
    this.selectedSiteLocationReport = [];
    this.currentLocationReportValue = '';
    this.currentDeviceReportValue = '';
    this.currentStatusReportValue = '';
    this.ClearDevice = 1;
    this.ButtonDisable = true;
    this.SearchWordDisable = true;
    this.SelectedLocationDisplay = true;
    this.SelectedDeviceDisplay = true;
    this.SelectedStatusDisplay = true;
    this.PaginationDisplay = true;
    this.DateTimeCalendar = '';
    this.DateTimeCalendarRange = '';

    this.Time1 = "00:00";
    this.Time2 = "23:59";
    this.StartTime = "00:00";
    this.StopTime = "23:59";

    this.StartCalendar = new Date().toLocaleDateString('en-US');
    this.StopCalendar = new Date().toLocaleDateString('en-US');
    //console.log("Original Start Date Time Calendar = ",this.StartCalendar);
    //console.log("Original Stop Date Time Calendar = ",this.StopCalendar);
    let DateConvert1 = this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
    let DateConvert2 = this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');
    this.StartcurrentCalendar = DateConvert1;
    this.StopcurrentCalendar = DateConvert2;
    //console.log("Start Date Time Calendar = ",this.StartcurrentCalendar);
    //console.log("Stop Date Time Calendar = ",this.StopcurrentCalendar);
    this.DateTimeCalendarRange = this.StartcurrentCalendar + ' - ' + this.StopcurrentCalendar;
    this.TimeWarningHidden = true;
    this.TimeInvalidHidden = true;
    //this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar,this.StartTime,this.StopTime,this.currentLocationReportValue,this.currentDeviceReportValue,this.currentStatusReportValue);
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 100000);
  }
  SearchReport() {
    this.currentPageSelect = 1;
    this.PageCurrent = 1;
    this.SpinnerPlay = 1;
    this.ClickLocationCount = 0;
    this.ClickDeviceCount = 0;
    this.ClickStatusCount = 0;
    console.log("///////////////////////////////////////////////");


    //console.log("ALLSite",this.ALLSite_ID);
    //if (this.currentLocationReportValue.length == 0) {
    //Do Nothing
    //}
    //else {
    //  this.selectedSiteLocationReportModel = this.ALLSite_ID;
    //}
    this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar, this.StartTime, this.StopTime, this.currentLocationReportValue, this.currentDeviceReportValue, this.currentStatusReportValue, this.currentPageSelect, this.SearchWord);
    this.getDailyReportExport(this.StartcurrentCalendar, this.StopcurrentCalendar, this.StartTime, this.StopTime, this.currentLocationReportValue, this.currentDeviceReportValue, this.currentStatusReportValue);
  }

  async getUserProfile() {
    let res: any;
    let UserData: any;
    let SiteID: any;
    let DeviceID: any[];
    let LocationID: any[];
    res = await this.service.getUserProfile();
    UserData = res.data;
    SiteID = UserData.map((element: { SITE: any; }) => element.SITE);
    SiteID = SiteID[0].toString();
    DeviceID = UserData.map((element: { DEVICE: any; }) => element.DEVICE);
    DeviceID = DeviceID[0].toString();
    //console.log("SiteID =",SiteID);
    //console.log("DeviceID =",DeviceID);
    this.getSiteReport(SiteID);
    this.getDeviceReport(DeviceID);
  }

  async getSiteReport(SITE_ID: any) {
    let res: any;
    res = await this.service.getSiteReport(SITE_ID);
    this.selectedSiteLocationReport = [];
    for (const item of res) {
      this.selectedSiteLocationReport.push({ SITE_ID: item.logs_SITE_ID, name: item.logs_SITE_NAME, group: 'ทั้งหมด' })
      this.selectedSiteLocationReportCopy.push({ SITE_ID: item.logs_SITE_ID, name: item.logs_SITE_NAME, group: 'ทั้งหมด' })
    }
    this.ALLSite_ID = this.selectedSiteLocationReport.map((element: { SITE_ID: any; }) => element.SITE_ID);
    this.OriginalALLSite_ID = this.ALLSite_ID;
    this.SortAZ();

    //console.log("selectedSiteReport = ",this.ALLSite_ID)
  }

  async getDeviceReport(DEVICE_ID: any) {
    let res: any;
    res = await this.service.getDeviceReport(DEVICE_ID);
    this.listDeviceReport = [];
    for (const item of res) {
      this.listDeviceReport.push({ DEVICE_ID: item.logs_DEVICE_ID, name: item.logs_DEVICE_NAME, SITE_ID: item.logs_SITE_ID, group: 'ทั้งหมด' })
      this.CloneselectedDeviceReport.push({ DEVICE_ID: item.logs_DEVICE_ID, name: item.logs_DEVICE_NAME, SITE_ID: item.logs_SITE_ID, group: 'ทั้งหมด' })
    }
    this.ALLDevice_ID = this.listDeviceReport.map((element: { DEVICE_ID: any; }) => element.DEVICE_ID);
    this.listDeviceReport.sort((a, b) => a.name.localeCompare(b.name))
    //console.log("selectedDeviceReport = ",this.ALLDevice_ID)
    this.BackupAllselectedDeviceReport = this.CloneselectedDeviceReport;
    //this.AutoSelectStatus();
    //this.AutoLocationSelectDropdown();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /*
  AutoLocationSelectDropdown() {
    this.selectedSiteLocationReportModel = this.OriginalALLSite_ID;
    this.currentLocationReportValue = this.OriginalALLSite_ID.toString();
    this.SelectedLocation = this.OriginalALLSite_ID.length + ' ' + 'Location Selected';
    console.log("First Load Location", this.currentLocationReportValue);
  }*/

  AutoSelectStatus() {
    this.selectedStatusReportModel = [254, 253, 244, 107, 104, 90, 53, 38, 37];
    //console.log("Auto Select Status =", this.selectedStatusReportModel);
    this.currentStatusReportValue = this.selectedStatusReportModel.toString();
    if (this.currentStatusReportValue.length == 0 || this.currentLocationReportValue == 0 || this.currentDeviceReportValue == 0) {
      this.SearchDisable = true;
      this.SearchWordDisable = true;
    }
    else {
      this.SearchDisable = false;
      this.SearchWordDisable = false;
    }
    this.CountSelectedStatus = this.selectedStatusReportModel.length + ' ' + 'Event Selected';
  }

  AutoSelectDevice() {
    this.selectedDeviceReportModel = this.ALLDevice_ID.reverse();
    //console.log("Auto Select Device =", this.selectedDeviceReportModel);
  }
  word: string = '';
  CheckType(input: any) {
    ;
    console.log("Check Type ID", this.currentLocationReportValue);
    let key;
    key = input.target.value;
    if (key == 'on') {

    }
    else {
      this.word = key;
      console.log("word = ", this.word)
    }
    if (this.currentLocationReportValue == '' && this.word.length == 0) {
      this.currentStatusReportValue = '';
      this.selectedStatusReportModel = [];
      this.SelectedLocationDisplay = true;
    }
    else {
      if (this.word.length == 0) {/***************ถ้าไม่ได้พิมพ์อยู่ โชว์************************ */
        this.SelectedLocationDisplay = false;
        this.ClickLocationDisplay = true;
      }
      else {/***********ถ้าพิมพ์อยู่ ซ่อน***************** */
        this.SelectedLocationDisplay = true;
        this.ClickLocationDisplay = true;
      }
    }
  }

  word2: string = '';
  CheckType2(input: any) {
    let key;
    key = input.target.value;
    this.word2 = key;
    console.log("word2 = ", this.word2)
    if (this.currentDeviceReportValue == '' && this.word2.length == 0) {
      this.SelectedDeviceDisplay = true;
    }
    else {
      if (this.word2.length == 0) {/***************ถ้าไม่ได้พิมพ์อยู่************************ */
        this.SelectedDeviceDisplay = false;
        this.ClickDeviceDisplay = true;
      }
      else {/***********ถ้าพิมพ์อยู่***************** */
        this.SelectedDeviceDisplay = true;
        this.ClickDeviceDisplay = true;
      }
    }
    //console.log(this.InputType);
  }
  word3: string = ''
  CheckType3(input: any) {
    let key;
    key = input.target.value;
    this.word3 = key;
    console.log("word3 = ", this.word3)
    if (this.currentStatusReportValue == '' && this.word3.length == 0) {
      this.SelectedStatusDisplay = true;
    }
    else {
      if (this.word3.length == 0) {/***************ถ้าไม่ได้พิมพ์อยู่************************ */
        this.SelectedStatusDisplay = false;
        this.ClickStatusDisplay = true;
      }
      else {/***********ถ้าพิมพ์อยู่***************** */
        this.SelectedStatusDisplay = true;
        this.ClickStatusDisplay = true;
      }
    }
    //console.log(this.InputType);
  }

  SortAZ() {

    let SortDataReport;
    let BackupSortDataReport;
    SortDataReport = this.selectedSiteLocationReport.sort();
    SortDataReport.sort((a, b) => a.name.localeCompare(b.name))
    BackupSortDataReport = this.selectedSiteLocationReportCopy.sort();
    BackupSortDataReport.sort((a, b) => a.name.localeCompare(b.name))
    console.log("Site Ready = ", SortDataReport);
    this.selectedSiteLocationReportSort = SortDataReport;
    this.CloneselectedSiteLocationReportSort = BackupSortDataReport;
    this.BackupselectedSiteLocationReportSort = BackupSortDataReport;
  }


  clicklocation() {
    this.CloneSelectLocation = this.ClonecurrentLocationReportValue;
    if (this.CloneSelectLocation.length == 0) {
      this.selectedSiteLocationReportSort = this.BackupselectedSiteLocationReportSort;
      this.selectedDeviceReport = [];
      this.selectedDeviceReportModel = [];
      this.selectedStatusReport = [];
      this.selectedStatusReportModel = [];
    }
    if (this.CloneSelectLocation.length != 0) {
      console.log("Select Value = ", this.CloneSelectLocation);
      //console.log("Check Backup =",this.BackupselectedSiteLocationReportSort);
      let SelectedLocationID: any[] = [];
      let SelectedLocationID_FindID: any;
      let SelectedLocationID_Length;
      let UnSelectedLocationID: any[] = [];
      let UnSelect: any;
      SelectedLocationID_Length = this.CloneSelectLocation.length;
      for (let i = 0; i <= SelectedLocationID_Length - 1; i++) {
        SelectedLocationID.push(this.selectedSiteLocationReportSort.find(x => x.SITE_ID == this.CloneSelectLocation[i]));


      }
      SelectedLocationID_FindID = SelectedLocationID.map(x => x.SITE_ID);
      SelectedLocationID.sort((a, b) => a.name.localeCompare(b.name));
      UnSelectedLocationID = this.selectedSiteLocationReportSort;
      /***************************************Unselect Logic************************************************* */
      for (let i = 0; i <= SelectedLocationID_FindID.length - 1; i++) {

        UnSelect = UnSelectedLocationID.filter(x => x.SITE_ID != SelectedLocationID_FindID[i]);
        UnSelectedLocationID = UnSelect;
        //console.log("Remove Time " +[i]+ "=",UnSelect);
      }
      UnSelectedLocationID = UnSelect;
      UnSelectedLocationID.sort((a, b) => a.name.localeCompare(b.name));


      //UnSelectedLocationID = this.CloneselectedSiteLocationReportSort;
      this.selectedSiteLocationReportSort = [];
      this.selectedSiteLocationReportSort = SelectedLocationID.concat(UnSelectedLocationID);

      //console.log("Selected ID =", SelectedLocationID);
      //console.log("Selected ID FindID =", SelectedLocationID_FindID);
      //console.log("Unselected ID =", UnSelectedLocationID);
      console.log("New Selected ID =", this.selectedSiteLocationReportSort);
    }
    //console.log("Compare1 Final",this.currentLocationReportValueCompare1);
    //console.log("Compare2 Final",this.currentLocationReportValueCompare2);

  }

  clickdevice() {
    if (this.CloneSelectLocation.length != 0) {
      if (this.ClonecurrentDeviceReportValue.length == 0) {
        if (this.ClearDevice == 0) {
          this.selectedDeviceReport = this.BackupselectedDeviceReport;
        }
        else {
          this.ClearDevice = 0;
        }
      }
      //this.CloneselectedDeviceReport = this.selectedDeviceReport;
      if (this.ClonecurrentDeviceReportValue.length != 0) {
        console.log("Select Device Value = ", this.ClonecurrentDeviceReportValue);
        console.log("Check Backup =", this.BackupselectedDeviceReport);
        let SelectedDeviceID: any[] = [];
        let SelectedDeviceID_FindID: any;
        let SelectedDeviceID_Length;
        let UnSelectedDeviceID: any[] = [];
        let UnSelect: any;
        SelectedDeviceID_Length = this.ClonecurrentDeviceReportValue.length;
        for (let i = 0; i <= SelectedDeviceID_Length - 1; i++) {
          SelectedDeviceID.push(this.selectedDeviceReport.find(x => x.DEVICE_ID == this.ClonecurrentDeviceReportValue[i]));
        }

        SelectedDeviceID_FindID = SelectedDeviceID.map(x => x.DEVICE_ID);
        SelectedDeviceID.sort((a, b) => a.name.localeCompare(b.name));
        UnSelectedDeviceID = this.selectedDeviceReport;
        /***************************************Unselect Logic************************************************* */
        for (let i = 0; i <= SelectedDeviceID_FindID.length - 1; i++) {

          UnSelect = UnSelectedDeviceID.filter(x => x.DEVICE_ID != SelectedDeviceID_FindID[i]);
          UnSelectedDeviceID = UnSelect;
          //console.log("Remove Time " +[i]+ "=",UnSelect);
        }
        UnSelectedDeviceID = UnSelect;
        UnSelectedDeviceID.sort((a, b) => a.name.localeCompare(b.name));


        //UnSelectedLocationID = this.CloneselectedSiteLocationReportSort;
        this.selectedDeviceReport = [];
        this.selectedDeviceReport = SelectedDeviceID.concat(UnSelectedDeviceID);

        console.log("Selected Device ID =", SelectedDeviceID);
        console.log("Selected Device ID FindID =", SelectedDeviceID_FindID);
        console.log("Unselected Device ID =", UnSelectedDeviceID);
        console.log("New Selected Device ID =", this.selectedDeviceReport);
      }
      //console.log("Compare1 Final",this.currentLocationReportValueCompare1);
      //console.log("Compare2 Final",this.currentLocationReportValueCompare2);
      //console.log("Click Count",this.ClickLocationCount)
    }
  }

  clickstatus() {
    if (this.ClonecurrentStatusReportValue.length == 0) {
      this.selectedStatusReport = this.BackupselectedStatusReport;
    }
    if (this.ClonecurrentStatusReportValue.length != 0) {
      console.log("Select Status Value = ", this.ClonecurrentStatusReportValue);
      console.log("Check Backup =", this.BackupselectedStatusReport);
      let SelectedStatusID: any[] = [];
      let SelectedStatusID_FindID: any;
      let SelectedStatusID_Length;
      let UnSelectedStatusID: any[] = [];
      let UnSelect: any;
      SelectedStatusID_Length = this.ClonecurrentStatusReportValue.length;
      for (let i = 0; i <= SelectedStatusID_Length - 1; i++) {
        SelectedStatusID.push(this.CloneselectedStatusReport.find(x => x.EVENT_ID == this.ClonecurrentStatusReportValue[i]));
      }

      SelectedStatusID_FindID = SelectedStatusID.map(x => x.EVENT_ID);
      SelectedStatusID.sort((a, b) => a.name.localeCompare(b.name));
      UnSelectedStatusID = this.CloneselectedStatusReport;

      /***************************************Unselect Logic************************************************* */

      for (let i = 0; i <= SelectedStatusID_FindID.length - 1; i++) {

        UnSelect = UnSelectedStatusID.filter(x => x.EVENT_ID != SelectedStatusID_FindID[i]);
        UnSelectedStatusID = UnSelect;
        //console.log("Remove Time " +[i]+ "=",UnSelect);
      }
      UnSelectedStatusID = UnSelect;
      //UnSelectedStatusID.sort((a, b) => a.name.localeCompare(b.name));


      //UnSelectedLocationID = this.CloneselectedSiteLocationReportSort;
      this.selectedStatusReport = [];
      this.selectedStatusReport = SelectedStatusID.concat(UnSelectedStatusID);

      console.log("Selected Status ID =", SelectedStatusID);
      console.log("Selected Status ID FindID =", SelectedStatusID_FindID);
      console.log("Unselected Status ID =", UnSelectedStatusID);
      console.log("New Selected Status ID =", this.selectedStatusReport);
    }

    //console.log("Compare1 Final",this.currentLocationReportValueCompare1);
    //console.log("Compare2 Final",this.currentLocationReportValueCompare2);
    //console.log("Click Count",this.ClickLocationCount)
  }

  PageSize = 25;
  PageMaxSize!: number;
  PageCurrent: number = 1;
  currentPageSelect!: number;

  PageSelect(ValuePageSelect: number) {
    this.SpinnerPlay = 1;
    console.log("Value Page Select = ", ValuePageSelect);
    this.currentPageSelect = ValuePageSelect;
    console.log("Page Select = ", this.currentPageSelect);
    this.getDailyReport(this.StartcurrentCalendar, this.StopcurrentCalendar, this.StartTime, this.StopTime, this.currentLocationReportValue, this.currentDeviceReportValue, this.currentStatusReportValue, this.currentPageSelect, this.SearchWord);
    this.PageCurrent = this.currentPageSelect;

  }
  NormalClickCount = 0;
  NormalClick() {
    this.NormalClickCount = this.NormalClickCount + 1;
    if (this.NormalClickCount > 1) {
      this.ClickLocationDisplay = false;
      this.ClickDeviceDisplay = false;
      this.ClickStatusDisplay = false;
    }
    else {

    }

    //console.log("Normal Click =",this.NormalClickCount);
  }

  Switchload = false
  showSwitch() {
    this.Switchload = true;
    setTimeout(() => {
      this.Switchload = false;
    }, 4000);
  }

  reload() {
    this.SpinnerPlay = 0;
    this.SearchWord = '';
    this.SearchWordModel = '';
    this.ReportData = [];
    this.ExportReportData = [];
    this.selectedDeviceReport = [];
    this.CloneselectedDeviceReport = [];
    this.selectedSiteLocationReportModel = [];
    this.selectedDeviceReportModel = [];
    this.selectedStatusReportModel = [];
    this.selectedSiteLocationReport = [];
    this.currentLocationReportValue = '';
    this.currentDeviceReportValue = '';
    this.currentStatusReportValue = '';
    this.TimeWarningHidden = true;
    this.TimeInvalidHidden = true;
    this.ButtonDisable = true;
    this.SearchWordDisable = true;
    this.SelectedLocationDisplay = true;
    this.SelectedDeviceDisplay = true;
    this.SelectedStatusDisplay = true;
    this.PaginationDisplay = true;
    // any other execution
    this.ngOnInit()
  }



}
