import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { latLng, Icon, icon, Marker } from "leaflet";
import { DatePipe } from '@angular/common'
import "leaflet";
import "leaflet-routing-machine";
import { interval, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
declare let L: any;
import { animate, style, transition, trigger, state } from "@angular/animations";
import { LoaderService } from 'src/app/service/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
	selector: 'app-dashboardtracking',
	templateUrl: './dashboardtracking.component.html',
	styleUrls: ['./dashboardtracking.component.css'],
	animations: [
		trigger('slideInOut', [
			state('in', style({
				overflow: 'hidden',
				height: '390px',
				width: '320px',
			})),
			state('out', style({
				opacity: '0',
				overflow: 'hidden',
				height: '0px',
				width: '0px'
			})),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		]),
		trigger('rotatedState', [
			state('default', style({ transform: 'rotate(0)' })),
			state('rotated', style({ transform: 'rotate(-180deg)' })),
			transition('rotated => default', animate('400ms ease-out')),
			transition('default => rotated', animate('400ms ease-in'))
		]),
		trigger('resizeState', [
			state('default', style({ height: '820px' })),
			state('resize', style({ height: '435px' })),
			transition('resize => default', animate('100ms ease-out')),
			transition('default => resize', animate('100ms ease-in'))
		]),
		trigger('resizePosition', [
			state('default', style({ top: '510px' })),
			state('resize', style({ top: '710px' })),
			transition('resize => default', animate('100ms ease-out')),
			transition('default => resize', animate('100ms ease-in'))
		]),

	]
})
export class DashboardtrackingComponent implements OnInit {

	SpinnerPlay = 1;

	PageSize = 12;
	PageSize2 = 12;
	PageMaxSize!: number;
	PageMaxSize2!: number;
	PageCurrent: number = 1;
	PageCurrent2: number = 1;

	latti: number = 13.762104;
	longi: number = 100.566525;


	state: string = 'default';
	state2: string = 'default';
	state3: string = 'default';



	jsonURL = 'assets/config.json';

	options = {
		/*original map
		layers: [
				tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					attribution: "© OpenStreetMap contributors"
				})
			],*/
		layers: [
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			})
		],

		zoom: 16,

		center: latLng(this.latti, this.longi)
	};

	// Override default Icons
	private defaultIcon: Icon = icon({
		iconUrl: "assets/images/marker-icon.png",
		shadowUrl: "assets/images/marker-shadow.png"
	});

	public DateTimeCalendar!: Date;
	public DateTimeCalendarFromTo: any;
	public DateTimeCalendarFrom!: Date;
	public DateTimeCalendarTo!: Date;
	public DateTimeCalendarRange: any = '';
	public DateTimeCalendarRangeTo: any = '';
	public DateTimeCalendarRangeToCopy: any = '';
	public DateTimeCalendarRangeFrom: any = '';
	public limitDate = new Date();
	public ChoosecurrentCalendar = new Date();
	public StartCalendar!: any;
	public StopCalendar!: any;
	public limit7Days!: Date;
	public limitDayBefore!: Date;
	StartcurrentCalendar: any;
	StopcurrentCalendar: any;
	DayRange: any;
	currentCalendar: any;
	currentCalendarFromTo: any;
	currentCalendarFrom: any;
	currentCalendarTo: any;
	currentEmployeeName: any = '';
	currentFirstName: any = '';
	currentLastName: any = '';
	currentCarPlate: any = '';
	currentCarProvince: any = '';
	currentCarType: any = '';
	currentCarBrand: any = '';
	currentCarModel: any = '';
	currentCarColor: any = '';
	currentCarLocation: any = '';
	currentPageSelect!: number;
	currentPageSelect2!: number;
	currentPlate: any = '';
	currentLastID: any;
	currentLastID2: any;




	PersonClickCount: any = 1;
	CarClickCount: any = 0;
	public DataFREvent: any = [];
	public DataFRRoute: any = [];
	DataFRRouteAllPage: any;
	public DataLPREvent: any = [];
	public DataLPRRoute: any = [];
	DataLPRRouteAllPage: any;
	DataFREventLength: any = 0;
	DataLPREventLength: any = 0;
	FRshow = 0;
	LPRshow = 0;
	LPRRender: any = 0;
	PagingCount: Number = 0;
	PagingCount2: Number = 0;
	FRClickCount = 0;
	FRClickEventCount = 0;
	LPRClickCount = 0;
	LPRClickEventCount = 0;
	MapShow: any = 0;
	MapWayPoint: any = [];
	MapWayPointContent: any = [];
	MapWayPointCopy: any = [];
	MapWayPointSplit: any = [];
	MapWayPoint2: any = [];
	MapWayPointContent2: any = [];
	MapWayPointCopy2: any = [];
	MapWayPointSplit2: any = [];
	MapRefreshCount: any = 0;
	MapRefreshCount2: any = 0;
	NoDataRender:any = 0;

	helpMenuOpen!: string;

	EmployeeName: string = "";
	CarPlate: string = "";
	CarProvince: string = "";
	CarType: string = "";
	CarBrand: string = "";
	CarModel: string = "";
	CarColor: string = "";
	CarLocation: string = "";

	MarkerList: any[] = [];
	MarkerList2: any[] = [];
	MarkerAlone: any[] = [];

	FRImgSnapshot!: any;
	FRImgBase!: any;
	FRName!: any;
	FRLastName!: any;
	FRRoute!: any;
	FRDateTime!: any;
	FRDateTimeRange!: any;
	FRDate!: any;
	FRShowRouteData: any = [];
	FRRouteLocation: any = [];
	FRRouteDevice: any = [];
	FRRouteDate: any = [];
	FRRouteTime: any = [];
	FRTime!: any;
	FRTimeData: any = [];

	LPRShowRouteData: any = [];
	LPRRouteLocation: any = [];
	LPRRouteDevice: any = [];
	LPRRouteDate: any = [];
	LPRRouteTime: any = [];
	TotalRouteFR!: any;
	TotalRouteLPR!: any;
	createmap!: any;
	MapRangeArray!: any;
	MapRangeArray2!: any;
	MarkerLat: any = [];
	MarkerLng: any = [];
	DefaultLat: any
	DefaultLng: any

	timeInterval: any
	///got the token from url ///
	Token!: string;
	RefreshToken!: string;

	NoDataActive: any = 0;
	NoDataActive2: any = 0;
	StateCount = 0;
	StateValue = 0;


	isLoading: Subject<boolean> = this.loader.isLoading;

	constructor(private service: ServiceDevicesService, public datepipe: DatePipe, private route: ActivatedRoute, private loader: LoaderService
		, private spinner: NgxSpinnerService) { }


	ngOnInit(): void {

		Marker.prototype.options.icon = this.defaultIcon;

		this.route.queryParams.subscribe(
			params => {
				this.Token = params['Token'];
				this.RefreshToken = params['RefreshToken'];
				console.log('Got the Token: ', params['Token']);
				console.log('Got the Refresh: ', params['RefreshToken']);
			}
		)

		setInterval(() => { this.timeInterval = this.showTime() }, 60000);

		this.login();
		this.showSwtich();
		this.helpMenuOpen = 'out';

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
		this.DateTimeCalendarRangeFrom = this.StartcurrentCalendar;
		this.DateTimeCalendarRangeTo = this.StopcurrentCalendar;
		this.getFRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentEmployeeName, this.currentPageSelect);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);
		//this.getFRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentFirstName, this.currentLastName, this.currentPageSelect, this.currentLastID);
		//this.getLPRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentPlate, this.currentPageSelect, this.currentLastID2);


		//console.log("Limite Date = ",this.limitDate);
		console.log("Limite 7 Days = ", this.limit7Days);


	}

	mockPoint = [
		{ "title": 'Chennai', "lat": '13.668618', "lng": '100.449243' },
		{ "title": 'Chennai', "lat": '13.681927', "lng": '100.476868' },
		{ "title": 'Chennai', "lat": '13.673058', "lng": '100.506632' },
		{ "title": 'Chennai', "lat": '13.685858', "lng": '100.547533' },
		{ "title": 'Chennai', "lat": '13.720141', "lng": '100.558920' },
		{ "title": 'Chennai', "lat": '13.748854', "lng": '100.563319' },
		{ "title": 'Chennai', "lat": '13.762104', "lng": '100.566525' }
	];

	mockPopup = ["number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "number10"];

	toggleHelpMenu(): void {
		this.StateCount = this.StateCount + 1;
		this.StateValue = this.StateCount % 2;
		this.helpMenuOpen = this.helpMenuOpen === 'out' ? 'in' : 'out';
		this.state = (this.state === 'default' ? 'rotated' : 'default');
		this.state2 = (this.state2 === 'default' ? 'resize' : 'default');
		this.state3 = (this.state3 === 'default' ? 'resize' : 'default');
	}

	async login() {
		let res: any = await this.service.login();
		if (res.status == 200) {
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('refreshtoken', res.data.refreshtoken);
		}
	}

	async updateDataByTimeInterval() {
		const setInterval = interval(await this.service.getTimeInterval());
		setInterval.subscribe(x => {
			this.getFRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentEmployeeName, this.currentPageSelect);
			this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);
			this.getFRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentFirstName, this.currentLastName, this.currentPageSelect, this.currentLastID);
			this.getLPRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentPlate, this.currentPageSelect, this.currentLastID2);
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

	EmployeeNameData(ValueEmployeeName: any) {
		this.currentEmployeeName = ValueEmployeeName;
		console.log("Employee Name = ", this.currentEmployeeName);
		this.getFRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentEmployeeName, this.currentPageSelect);
	}

	CarPlateData(ValueCarplate: any) {
		this.currentCarPlate = ValueCarplate;
		console.log("Car Plate = ", this.currentCarPlate);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	CarProvinceData(ValueCarProvince: any) {
		this.currentCarProvince = ValueCarProvince;
		console.log("Car Province = ", this.currentCarProvince);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	CarTypeData(ValueCarType: any) {
		this.currentCarType = ValueCarType;
		console.log("Car Type = ", this.currentCarType);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	CarBrandData(ValueCarBrand: any) {
		this.currentCarBrand = ValueCarBrand;
		console.log("Car Brand = ", this.currentCarBrand);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	CarModelData(ValueCarModel: any) {
		this.currentCarModel = ValueCarModel;
		console.log("Car Model = ", this.currentCarModel);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	CarColorData(ValueCarColor: any) {
		this.currentCarColor = ValueCarColor;
		console.log("Car Color = ", this.currentCarColor);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	CarLocationData(ValueCarLocation: any) {
		this.currentCarLocation = ValueCarLocation;
		console.log("Car Location = ", this.currentCarLocation);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);
	}

	PageSelect(ValuePageSelect: number) {
		this.SpinnerPlay = 1;
		console.log("Value Page Select = ", ValuePageSelect);
		this.currentPageSelect = ValuePageSelect;
		console.log("Page Select = ", this.currentPageSelect);
		this.getFRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentEmployeeName, this.currentPageSelect);
		this.PageCurrent = this.currentPageSelect;
	}

	PageSelect2(ValuePageSelect2: number) {
		this.SpinnerPlay = 1;
		console.log("Value Page Select2 = ", ValuePageSelect2);
		this.currentPageSelect2 = ValuePageSelect2;
		console.log("Page Select2 = ", this.currentPageSelect2);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect2);
		this.PageCurrent2 = this.currentPageSelect2;
	}
	/*
	changeTimeCalendarTracking(valueCalendar: Date) {
		this.currentCalendar = valueCalendar;
		this.StartCalendar = this.currentCalendar[0];
		this.StopCalendar = this.currentCalendar[1];
		console.log("Original Start Date Time Calendar = ",this.StartCalendar);
		console.log("Original Stop Date Time Calendar = ",this.StopCalendar);
		let DateConvert1 =this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
		let DateConvert2 =this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');
		this.StartcurrentCalendar = DateConvert1;
		this.StopcurrentCalendar = DateConvert2;
		//this.getHeatmap(this.currentLocationID, valueDate);
		//this.getLineChart(this.currentLocationID, valueDate, this.currentDeviceValue);
	
		//this.getEventHours(this.currentLocationValue,this.currentDateTime)
		//this.getEventMonthly(this.currentLocationValue,this.currentDateTime)
		//this.getEventHistory(this.currentEventValue,this.currentCalendar)
		console.log("Start Date Time Calendar = ",this.StartcurrentCalendar);
		console.log("Stop Date Time Calendar = ",this.StopcurrentCalendar);
		this.DateTimeCalendarRange = this.StartcurrentCalendar + ' - ' + this.StopcurrentCalendar;
		this.getFRLabel(this.StartcurrentCalendar,this.StopcurrentCalendar,this.currentEmployeeName,this.currentPageSelect);
		this.getLPRLabel(this.StartcurrentCalendar,this.StopcurrentCalendar,this.currentCarPlate,this.currentCarProvince,this.currentCarType,this.currentCarBrand,this.currentCarModel,this.currentCarColor,this.currentCarLocation,this.currentPageSelect);
	
	}
	*/
	DateTimeLimit(limit: any) {
		this.DateTimeCalendarRangeTo = '';
		this.ChoosecurrentCalendar = limit[0];
		var FutureDays;
		FutureDays = new Date(this.ChoosecurrentCalendar.getFullYear(), this.ChoosecurrentCalendar.getMonth(), this.ChoosecurrentCalendar.getDate() + 7);
		this.limit7Days = FutureDays;
		//this.limit7Days = this.ChoosecurrentCalendar;
		console.log("7 Days Limited = ", this.limit7Days);
		console.log("FutureDays = ", FutureDays);
		console.log("Limit Set");
	}

	changeTimeCalendarTrackingFromTo(valueCalendar: Date) {
		this.DataFRRoute = [];
		this.DataLPRRoute = [];
		this.currentCalendarFromTo = valueCalendar;
		this.StartCalendar = this.currentCalendarFromTo[0];
		this.StopCalendar = this.currentCalendarFromTo[1];
		this.limitDayBefore = this.StartCalendar;
		console.log("Original Start Date Time Calendar = ", this.StartCalendar);
		console.log("Original Stop Date Time Calendar = ", this.StopCalendar);
		let DateConvert1 = this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
		let DateConvert2 = this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');

		this.StartcurrentCalendar = DateConvert1;
		this.StopcurrentCalendar = DateConvert2;

		this.DateTimeCalendarRangeFrom = this.StartcurrentCalendar;
		this.DateTimeCalendarRangeTo = this.StopcurrentCalendar;
		this.DateTimeCalendarRange = this.DateTimeCalendarRangeFrom + ' - ' + this.DateTimeCalendarRangeTo;
		this.getFRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentEmployeeName, this.currentPageSelect);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);
		this.showSpinner();

	}

	changeTimeCalendarTrackingFrom(valueCalendar: Date) {
		this.showSpinner();
		this.DataFRRoute = [];
		this.DataLPRRoute = [];
		this.currentCalendarFromTo = valueCalendar;
		this.StartCalendar = this.currentCalendarFromTo[0];
		this.StopCalendar = this.currentCalendarFromTo[1];
		this.limitDayBefore = this.StartCalendar;
		console.log("Original Start Date Time Calendar = ", this.StartCalendar);
		//console.log("Original Stop Date Time Calendar = ", this.StopCalendar);
		let DateConvert1 = this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
		let DateConvert2 = this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');

		this.StartcurrentCalendar = DateConvert1;
		this.StopcurrentCalendar = DateConvert2;

		this.DateTimeCalendarRangeFrom = this.StartcurrentCalendar;
		this.DateTimeCalendarRangeTo = this.StopcurrentCalendar;
		this.DateTimeCalendarRange = this.DateTimeCalendarRangeFrom + ' - ' + this.DateTimeCalendarRangeTo;

	}

	changeTimeCalendarTrackingTo(valueCalendar: Date) {
		this.SpinnerPlay = 1;
		this.DataFRRoute = [];
		this.DataLPRRoute = [];
		this.currentCalendarFromTo = valueCalendar;
		this.StartCalendar = this.currentCalendarFromTo[0];
		this.StopCalendar = this.currentCalendarFromTo[1];
		this.limitDayBefore = this.StartCalendar;
		//console.log("Original Start Date Time Calendar = ", this.StartCalendar);
		console.log("Original Stop Date Time Calendar = ", this.StopCalendar);
		let DateConvert1 = this.datepipe.transform(this.StartCalendar, 'yyyy-MM-dd');
		let DateConvert2 = this.datepipe.transform(this.StopCalendar, 'yyyy-MM-dd');

		this.StartcurrentCalendar = DateConvert1;
		this.StopcurrentCalendar = DateConvert2;

		this.DateTimeCalendarRangeFrom = this.StartcurrentCalendar;
		this.DateTimeCalendarRangeTo = this.StopcurrentCalendar;
		this.DateTimeCalendarRange = this.DateTimeCalendarRangeFrom + ' - ' + this.DateTimeCalendarRangeTo;
		this.showSpinner();
		this.getFRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentEmployeeName, this.currentPageSelect);
		this.getLPRLabel(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentCarPlate, this.currentCarProvince, this.currentCarType, this.currentCarBrand, this.currentCarModel, this.currentCarColor, this.currentCarLocation, this.currentPageSelect);

	}

	async getFRLabel(startRange: any, stopRange: any, EmployeeName: any, PageSelect: any) {
		if (EmployeeName == '') {
			EmployeeName == '';
			//console.log("No Name")
		}
		if (PageSelect == undefined) {
			PageSelect = 1;
		}
		this.MapShow = 0;
		let res: any;
		res = await this.service.getDataFR(startRange, stopRange, EmployeeName, PageSelect);
		//console.log("res EventHistory = ",res);
		this.service.responseTSKDataFR = res;
		let resEventFR = this.service.responseTSKDataFR.data;
		let resAllPageFR = this.service.responseTSKDataFR.pagination.allPage;
		this.DataFREvent = resEventFR;
		this.PageMaxSize = resAllPageFR * this.PageSize;
		this.FRshow = this.DataFREvent.length;
		this.PagingCount = this.DataFREvent.length;
		if (this.DataFREvent == '') {
			this.NoDataActive = 1;
		}
		else {
			this.NoDataActive = 0;
		}

		if (this.FRshow != undefined) {
			this.FRshow == 1;
		}
		console.log("Data FR = ", this.DataFREvent)
	}

	async getFRRoute(startRange: any, stopRange: any, firstname: any, lastname: any, PageSelect: any, LastID: any) {
		if (PageSelect == undefined) {
			PageSelect = 1;
		}
		let res: any;
		res = await this.service.getDataFRRoute(startRange, stopRange, firstname, lastname, PageSelect, LastID)
		this.service.responseTSKDataFRRoute = res;
		let resEvent = this.service.responseTSKDataFRRoute.data;
		let resFirstID = this.service.responseTSKDataFRRoute.pagination.lastID;
		let resAmount = this.service.responseTSKDataFRRoute.pagination.amount;
		this.currentLastID = resFirstID; /***************************ส่ง LAST ID ******************************/
		console.log("Last ID = ", this.currentLastID);
		let resEventLength = resEvent.length;
		let resAllPage = this.service.responseTSKDataFRRoute.pagination.allPage;
		if (this.PageCall > 1) {
			for (let i = 0; i <= resEventLength - 1; i++) {
				let FRRoutePush: any;
				FRRoutePush = resEvent[i];
				this.DataFRRoute.push(FRRoutePush);
			}
		}
		else {
			this.DataFRRoute = resEvent;
		}
		if (this.DataFRRoute == ''){
			this.NoDataRender = 1;
			console.log("NoDataRender =",this.NoDataRender);
		}
		else{
			this.NoDataRender = 0;
		}
		this.DataFRRouteAllPage = resAllPage;
		//console.log("DataFRRouteAllPage = ",this.DataFRRouteAllPage)
		this.TotalRouteFR = resAmount;
		this.MapWayPoint = [];
		this.MapWayPointContent = [];
		for (const [index, item] of this.DataFRRoute.entries()) {
			let DataFRRouteRange = this.TotalRouteFR;
			this.MapWayPoint.push({ "lat": item.LATITUDE, "lng": item.LONGITUDE })
			let indexStart = DataFRRouteRange - index;
			this.MapWayPointContent.push("<div class = PopupNumberBorder><span class = PopupNumber>" + indexStart + "</span></div>" + "<a class = PopupLocation>" + item.DEVICE_NAME + "</a>" + "<br>"
				+ "<a Class = PopupDevice >" + item.LOCATION_NAME + "</a>" + "<br>" + "<a class = PopupDatetime >" + item.STAMP_DATETIME + "</a>"
				+ "<div class = PopupImageBlock><img class= PopupImage src =" + item.FR_PATH_IMAGE_SNAPSHOT + "></div>")

			//this.MapWayPointContent.push("<div class = PopupNumberBorder><span class = PopupNumber>11</span></div>"+"<br>"+"<a class = PopupLocation>Location_Name</a>" + "<br>" 
			//+ "<a Class = PopupDevice >Device_Name</a>" + "<br>" + "<a class = PopupDatetime >11/01/2021 11.12</a>")
		}
		console.log("res DataFRRoute = ", this.DataFRRoute);
		this.MapWayPointContent = this.MapWayPointContent;
		console.log("Tooltip content FR= ", this.MapWayPointContent);
		this.MapRangeArray = this.MapWayPoint.length;
		//console.log("res Event Route = ",resEvent);
		this.FRRouteLocation = [];
		this.FRRouteDevice = [];
		this.FRRouteDate = [];
		this.FRRouteTime = [];
		for (const [index, item] of this.DataFRRoute.entries()) {
			this.FRRouteLocation.push({ "ID": this.TotalRouteFR - index, "Location": (item.LOCATION_NAME) });
			this.FRRouteDevice.push({ "ID": this.TotalRouteFR - index, "Device": (item.DEVICE_NAME) });
			this.FRRouteDate.push({ "ID": this.TotalRouteFR - index, "Date": (item.STAMP_DATETIME.slice(0, 10)) });
			this.FRRouteTime.push({ "ID": this.TotalRouteFR - index, "Time": (item.STAMP_DATETIME.slice(13, 22)) });
		}
		let ArrayLocation = this.FRRouteLocation;
		let ArrayDevice = this.FRRouteDevice;
		let ArrayDate = this.FRRouteDate;
		let ArrayTime = this.FRRouteTime;
		const mergeById = (ArrayDate: any[], ArrayTime: any[]) =>
			ArrayDate.map(object => ({
				...ArrayTime.find((item) => (item.ID === object.ID) && item), ...object
			}));
		const mergeById2 = (ArrayLocation: any[], ArrayDevice: any[]) =>
			ArrayLocation.map(object => ({
				...ArrayDevice.find((item) => (item.ID === object.ID) && item), ...object
			}));

		let Combine = mergeById(ArrayDate, ArrayTime);
		let Combine2 = mergeById2(ArrayLocation, ArrayDevice);

		const mergeByIdFinal = (Combine: any[], Combine2: any[]) =>
			Combine.map(object => ({
				...Combine2.find((item) => (item.ID === object.ID) && item), ...object
			}));

		let CombineFinal = mergeByIdFinal(Combine, Combine2);

		this.FRShowRouteData = CombineFinal;
		console.log("this.FRShowRouteData = ", this.FRShowRouteData);
		//console.log("FRRouteDate =",this.FRRouteDate);
		//console.log("FRRouteTime =",this.FRRouteTime);
		//console.log("Map Way Point = ", this.MapWayPoint)
		if (this.MapRangeArray == 1) {
			this.MapWayPointSplit = this.MapWayPoint[0];
			//console.log("After Map Waypoint Split1  =",this.MapWayPointSplit);
			this.latti = this.MapWayPointSplit[Object.keys(this.MapWayPointSplit)[0]];
			this.longi = this.MapWayPointSplit[Object.keys(this.MapWayPointSplit)[1]];
			console.log("Latti = ", this.latti)
			console.log("Longi = ", this.longi)
		}
		else {
			this.MapWayPointSplit = this.MapWayPoint[0];
			//console.log("After Map Waypoint Split2  =",this.MapWayPointSplit);
			this.latti = this.MapWayPointSplit[Object.keys(this.MapWayPointSplit)[0]];
			this.longi = this.MapWayPointSplit[Object.keys(this.MapWayPointSplit)[1]];
			console.log("Latti = ", this.latti)
			console.log("Longi = ", this.longi)

		}
		if (this.MapWayPointCopy.length == this.MapWayPoint.length) {
			this.MapRefreshCount = this.MapRefreshCount + 1;
			if (this.MapRefreshCount % 2 == 0) {
				this.MapRefreshCount2 = 0;
			}
			else {
				this.MapRefreshCount2 = 1;
			}
			this.FRClickCount = 0;
		}
		else {
			this.MapRefreshCount = 0;
			this.FRClickCount = this.FRClickCount + 1;
		}
		if (this.FRClickCount % 2 == 0) {
			this.FRClickEventCount = 0;
		}
		else {
			this.FRClickEventCount = 1;
		}
		this.MapShow = 1;
		this.MapWayPointCopy = this.MapWayPoint;
		this.MapRangeArray = this.MapWayPoint.length;

	}

	async getLPRLabel(startRange: any, stopRange: any, CarPlate: any, CarProvince: any, CarType: any, CarBrand: any, CarModel: any, CarColor: any, CarLocation: any, PageSelect: any) {
		if (PageSelect == undefined) {
			PageSelect = 1;
		}
		this.MapShow = 0;
		let res: any;
		res = await this.service.getDataLPR(startRange, stopRange, CarPlate, CarProvince, CarType, CarBrand, CarModel, CarColor, CarLocation, PageSelect);
		//console.log("res EventHistory = ",res);
		this.service.responseTSKDataLPR = res;
		let resEventLPR = this.service.responseTSKDataLPR.data;
		let resAllPageLPR = this.service.responseTSKDataLPR.pagination.allPage;
		this.DataLPREvent = resEventLPR;
		this.PageMaxSize2 = resAllPageLPR * this.PageSize;
		this.LPRshow = this.DataLPREvent.length;
		this.PagingCount2 = this.DataLPREvent.length;
		if (this.DataLPREvent == '') {
			this.NoDataActive2 = 1;
		}
		else {
			this.NoDataActive2 = 0;
		}
		if (this.LPRshow != undefined) {
			this.LPRshow == 1;
		}
		console.log("Data LPR = ", this.DataLPREvent)

	}

	async getLPRRoute(startRange: any, stopRange: any, plate: any, PageSelect: any, LastID: any) {
		if (PageSelect == undefined) {
			PageSelect = 1;
		}
		let res: any;
		res = await this.service.getDataLPRRoute(startRange, stopRange, plate, PageSelect, LastID)
		this.service.responseTSKDataLPRRoute = res;
		let resEvent2 = this.service.responseTSKDataLPRRoute.data;
		let resFirstID2 = this.service.responseTSKDataLPRRoute.pagination.lastID;
		this.currentLastID2 = resFirstID2; /***************************ส่ง LAST ID ******************************/
		let resAmount2 = this.service.responseTSKDataLPRRoute.pagination.amount;
		let resEventLength = resEvent2.length;
		let resAllPage = this.service.responseTSKDataLPRRoute.pagination.allPage;
		if (this.PageCall > 1) {
			for (let i = 0; i <= resEventLength - 1; i++) {
				let LPRRoutePush: any;
				LPRRoutePush = resEvent2[i];
				this.DataLPRRoute.push(LPRRoutePush);
			}
		}
		else {
			this.DataLPRRoute = resEvent2;
		}
		if (this.DataLPRRoute == ''){
			this.NoDataRender = 1;
			console.log("NoDataRender =",this.NoDataRender);
		}
		else{
			this.NoDataRender = 0;
		}
		this.DataLPRRouteAllPage = resAllPage;
		console.log("DataLPRRouteAllPage = ", this.DataLPRRouteAllPage)
		console.log("DataLPRRoute = ", this.DataLPRRoute)
		this.TotalRouteLPR = resAmount2;
		this.MapWayPoint2 = [];
		this.MapWayPointContent2 = [];
		for (const [index, item] of this.DataLPRRoute.entries()) {
			let DataLPRRouteRange = this.DataLPRRoute.length;
			this.MapWayPoint2.push({ "lat": item.LATITUDE, "lng": item.LONGITUDE })
			let indexStart = DataLPRRouteRange - index;
			this.MapWayPointContent2.push("<div class = PopupNumberBorder><span class = PopupNumber>" + indexStart + "</span></div>" + "<a class = PopupLocation>" + item.DEVICE_NAME + "</a>" + "<br>"
				+ "<a Class = PopupDevice >" + item.LOCATION_NAME + "</a>" + "<br>" + "<a class = PopupDatetime >" + item.CREATE_AT + "</a>"
				+ "<div class = PopupImageBlock><img class= PopupImage src =" + item.LPR_PATH_IMAGE_CAR + "></div>")

			//this.MapWayPointContent.push("<div class = PopupNumberBorder><span class = PopupNumber>11</span></div>"+"<br>"+"<a class = PopupLocation>Location_Name</a>" + "<br>" 
			//+ "<a Class = PopupDevice >Device_Name</a>" + "<br>" + "<a class = PopupDatetime >11/01/2021 11.12</a>")
		}
		this.MapWayPointContent2 = this.MapWayPointContent2.reverse();
		this.MapRangeArray2 = this.MapWayPoint2.length;
		console.log("res LRPRoute = ", resEvent2);
		console.log("Map Way Point 2 = ", this.MapWayPoint2)

		this.LPRRouteLocation = [];
		this.LPRRouteDevice = [];
		this.LPRRouteDate = [];
		this.LPRRouteTime = [];
		for (const [index, item] of this.DataLPRRoute.entries()) {
			this.LPRRouteLocation.push({ "ID": index, "Location": (item.LOCATION_NAME) });
			this.LPRRouteDevice.push({ "ID": index, "Device": (item.DEVICE_NAME) });
			this.LPRRouteDate.push({ "ID": index, "Date": (item.CREATE_AT.slice(0, 10)) });
			this.LPRRouteTime.push({ "ID": index, "Time": (item.CREATE_AT.slice(13, 22)) });
		}
		let ArrayLocation = this.LPRRouteLocation;
		let ArrayDevice = this.LPRRouteDevice;
		let ArrayDate = this.LPRRouteDate;
		let ArrayTime = this.LPRRouteTime;
		const mergeById = (ArrayDate: any[], ArrayTime: any[]) =>
			ArrayDate.map(object => ({
				...ArrayTime.find((item) => (item.ID === object.ID) && item), ...object
			}));
		const mergeById2 = (ArrayLocation: any[], ArrayDevice: any[]) =>
			ArrayLocation.map(object => ({
				...ArrayDevice.find((item) => (item.ID === object.ID) && item), ...object
			}));

		let Combine = mergeById(ArrayDate, ArrayTime);
		let Combine2 = mergeById2(ArrayLocation, ArrayDevice);

		const mergeByIdFinal = (Combine: any[], Combine2: any[]) =>
			Combine.map(object => ({
				...Combine2.find((item) => (item.ID === object.ID) && item), ...object
			}));

		let CombineFinal = mergeByIdFinal(Combine, Combine2);

		this.LPRShowRouteData = CombineFinal;
		console.log("this.LPRShowRouteData = ", this.LPRShowRouteData);

		if (this.MapRangeArray2 == 1) {
			this.MapWayPointSplit2 = this.MapWayPoint2[0];
			//console.log("After Map Waypoint Split1  =",this.MapWayPointSplit);
			this.latti = this.MapWayPointSplit2[Object.keys(this.MapWayPointSplit2)[0]];
			this.longi = this.MapWayPointSplit2[Object.keys(this.MapWayPointSplit2)[1]];
			console.log("Latti = ", this.latti)
			console.log("Longi = ", this.longi)
		}
		else {
			this.MapWayPointSplit2 = this.MapWayPoint2[0];
			//console.log("After Map Waypoint Split2  =",this.MapWayPointSplit);
			this.latti = this.MapWayPointSplit2[Object.keys(this.MapWayPointSplit2)[0]];
			this.longi = this.MapWayPointSplit2[Object.keys(this.MapWayPointSplit2)[1]];
			console.log("Latti = ", this.latti)
			console.log("Longi = ", this.longi)

		}

		if (this.MapWayPointCopy2.length == this.MapWayPoint2.length) {
			this.MapRefreshCount = this.MapRefreshCount + 1;
			if (this.MapRefreshCount % 2 == 0) {
				this.MapRefreshCount2 = 0;
			}
			else {
				this.MapRefreshCount2 = 1;
			}
			this.FRClickCount = 0;
		}
		else {
			this.MapRefreshCount = 0;
			this.FRClickCount = this.FRClickCount + 1;
		}
		if (this.FRClickCount % 2 == 0) {
			this.FRClickEventCount = 0;
		}
		else {
			this.FRClickEventCount = 1;
		}
		this.MapShow = 1;
		this.MapWayPointCopy = this.MapWayPoint;
		this.MapRangeArray = this.MapWayPoint.length;

	}


	PersonClick() {
		this.MapShow = 0;
		this.MapWayPoint = [];
		this.PersonClickCount = 1;
		this.CarClickCount = 0;
		this.ShowRoutePopupBlock = 0;
		this.ShowFacePopupBlock = 0;
	}

	CarClick() {
		this.MapShow = 0;
		this.MapWayPoint = [];
		this.CarClickCount = 1;
		this.PersonClickCount = 0;
		this.ShowRoutePopupBlock = 0;
		this.ShowFacePopupBlock = 0;
	}


	onMapReady(map: L.Map) {
		var RouteIcon = new L.Icon({
			iconUrl: "assets/images/Tracking/whitedot.png",
			shadowUrl: "",
			iconSize: [15, 15],
			iconAnchor: [10, 10],
			popupAnchor: [1, -175],
			shadowSize: [41, 41]
		});
		var StartIcon = new L.Icon({
			iconUrl: "assets/images/Tracking/StartMarker.png",
			shadowUrl: '',
			iconSize: [60, 60],
			iconAnchor: [30, 30],
			popupAnchor: [1, -175],
			shadowSize: [41, 41]
		});
		var HumanIcon = new L.Icon({
			iconUrl: "assets/images/Tracking/PersonMarker.png",
			shadowUrl: '',
			iconSize: [65, 80],
			iconAnchor: [32.5, 40],
			popupAnchor: [1, -175],
			shadowSize: [41, 41]
		});
		var CarIcon = new L.Icon({
			iconUrl: "assets/images/Tracking/CarMarker.png",
			shadowUrl: '',
			iconSize: [65, 80],
			iconAnchor: [32.5, 40],
			popupAnchor: [1, -175],
			shadowSize: [41, 41]
		});
		if (this.LPRRender == 1) {
			let tooltipLPR = this.MapWayPointContent2;
			let MarkerPoint2: any = [];
			let ListMarker2: any[] = [];
			var routeControl = L.Routing.control({
				createMarker: function (i: number, wp: { latLng: any; }, nWps: number) {
					if (i === 0) { //i === 0 คือจุดเริ่มต้น
						MarkerPoint2 = L.marker(wp.latLng, {
							icon: StartIcon
						}).bindPopup(tooltipLPR[i]);
						let Detail = {
							id: i + 1,
							marker: MarkerPoint2
						};
						//console.log("Detail First = ", Detail)
						ListMarker2.push(Detail);
						return MarkerPoint2;
					}
					if (i === nWps - 1) { //i === nWps - 1 (คือจุดทั้งหมด -1 = จุดสุดท้าย)
						MarkerPoint2 = L.marker(wp.latLng, {
							icon: CarIcon
						}).bindPopup(tooltipLPR[i]);
						let Detail = {
							id: i + 1,
							marker: MarkerPoint2
						};
						//console.log("Detail Last = ", Detail)
						ListMarker2.push(Detail);
						return MarkerPoint2;

					}
					else { //จุดระหว่างจุดเริ่มต้นและจุดสุดท้าย
						MarkerPoint2 = L.marker(wp.latLng, {
							icon: RouteIcon
						}).bindPopup(tooltipLPR[i]);
						let Detail = {
							id: i + 1,
							marker: MarkerPoint2
						};
						//console.log("Detail Between = ", Detail)
						ListMarker2.push(Detail);
						return MarkerPoint2;
					}
				},
				routeWhileDragging: false,
				fitSelectedRoutes: true,
				addWaypoints: false,

				lineOptions: {
					styles: [{ color: '#0093FF', opacity: 1, weight: 5 }],

				},

			})
				.addTo(map.panTo(new L.LatLng(this.latti, this.longi)));
			routeControl.setWaypoints(this.MapWayPoint2);
			//routeControl.setWaypoints(this.mockPoint);
			if (this.MapWayPoint2.length == 1) {
				this.MarkerList2 = ListMarker2.slice(0, 1);
				console.log("MarkerList2 Length =", this.MarkerList2.length)
			}
			else {
				this.MarkerList2 = ListMarker2;
			}
			console.log("Marker List LPR=", this.MarkerList2);
		}
		else {
			let indexFR = this.TotalRouteFR;
			let tooltipFR = this.MapWayPointContent;
			let MarkerPoint: any;
			let ListMarker: any[] = [];
			var routeControl = L.Routing.control({
				createMarker: function (i: number, wp: { latLng: any; }, nWps: number) {
					if (i === 0) { //i === 0 คือจุดเริ่มต้น
						MarkerPoint = L.marker(wp.latLng, {
							icon: StartIcon
						}).bindPopup(tooltipFR[i]);
						let Detail = {
							id: indexFR - i,
							marker: MarkerPoint
						};
						//console.log("Detail = ", Detail)
						ListMarker.push(Detail);
						return MarkerPoint;
					}
					if (i === nWps - 1) { //i === nWps - 1 (คือจุดทั้งหมด -1 = จุดสุดท้าย)
						MarkerPoint = L.marker(wp.latLng, {
							icon: HumanIcon
						}).bindPopup(tooltipFR[i]);
						let Detail = {
							id: indexFR - i,
							marker: MarkerPoint
						};
						//console.log("Detail = ", Detail)
						ListMarker.push(Detail);
						return MarkerPoint;

					}
					else { //จุดระหว่างจุดเริ่มต้นและจุดสุดท้าย
						MarkerPoint = L.marker(wp.latLng, {
							icon: RouteIcon
						}).bindPopup(tooltipFR[i]);
						let Detail = {
							id: indexFR - i,
							marker: MarkerPoint
						};
						//console.log("Detail = ", Detail)
						ListMarker.push(Detail);
						return MarkerPoint;
					}
				},
				routeWhileDragging: false,
				fitSelectedRoutes: true,
				addWaypoints: false,

				lineOptions: {
					styles: [{ color: '#0093FF', opacity: 1, weight: 5 }],

				},

			})
				.addTo(map.panTo(new L.LatLng(this.latti, this.longi)));
			routeControl.setWaypoints(this.MapWayPoint);
			//routeControl.setWaypoints(this.mockPoint);
			this.MarkerList = ListMarker;
			console.log("Marker List FR=", this.MarkerList);
		}
	}


	onClickDataFR(FR: any) {
		this.SpinnerPlay = 0;
		console.log("Spinner Play =",this.SpinnerPlay);
		this.currentLastID = undefined;
		this.LPRRender = 0;
		this.MarkerLat = [];
		this.MarkerLng = [];
		this.createmap = FR;
		this.FRImgBase = FR.FR_PATH_IMAGE_BASE;
		this.FRImgSnapshot = FR.FR_PATH_IMAGE_OVERVIEW;
		this.FRName = FR.FIRST_NAME;
		this.FRLastName = FR.LAST_NAME;
		this.FRDate = FR.STAMP_DATETIME;



		console.log("Create Map Data =", this.createmap);
		//console.log("FR Route Data =",this.FRRoute);
		//console.log("FR Date Time =",this.FRDateTime);
		//console.log("FR Date = ",this.FRDate);
		//console.log("FR Time = ",this.FRTime);
		//console.log("FR Date Data = ",this.FRDateData);
		//console.log("FR Time Data = ",this.FRTimeData);
		//console.log("MapShow =",this.MapShow);
		//console.log("After Map Waypoint  =",this.MapWayPoint);
		//console.log("After Map Waypoint Copy =",this.MapWayPointCopy);
		console.log("Map Refresh Count =",this.MapRefreshCount)
		console.log("Map Refresh Count2 =",this.MapRefreshCount2)
		console.log("FR Click Count =",this.FRClickCount)
		console.log("FR Click Event Count =",this.FRClickEventCount)
	}

	GetRouteFR(createmap: any) {
		this.DataFRRoute = [];
		this.currentPageSelect = 1;
		this.PageCall = 1;
		this.LPRRender = 0;
		//console.log("Paramer = ",createmap)
		this.currentFirstName = createmap.FIRST_NAME;
		this.currentLastName = createmap.LAST_NAME;
		this.getFRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentFirstName, this.currentLastName, this.currentPageSelect, this.currentLastID);
	}

	LPRImgSnapshot!: any;
	LPRImgBase!: any;
	LPRRoute!: any;
	LPRPlate!: any;
	LPRProvince!: any;
	createmap2!: any;

	onClickDataLPR(LPR: any) {
		this.SpinnerPlay = 0;
		this.LPRRender = 1;
		this.MarkerLat = [];
		this.MarkerLng = [];
		this.createmap2 = LPR;
		this.LPRImgBase = LPR.LPR_PATH_IMAGE_CAR;
		this.LPRImgSnapshot = LPR.LPR_PATH_IMAGE_PLATE;
		this.LPRPlate = LPR.LPR_LICENSE;
		this.LPRProvince = LPR.LPR_PROVINCE;


		console.log("Create Map LPR Data =", this.createmap2);
		//console.log("FR Route Data Test =",this.FRDateTime);
		//console.log("FR Route Data Test2 =",this.FRRoute3);
		//console.log("MapShow =",this.MapShow);
		//console.log("After Map Waypoint  =",this.MapWayPoint);
		//console.log("After Map Waypoint Copy =",this.MapWayPointCopy);
		//console.log("Map Refresh Count =",this.MapRefreshCount)
		//console.log("FR Click Count =",this.FRClickCount)
		//console.log("FR Click Event Count =",this.FRClickEventCount)
		//console.log("Map Array Range = ",this.MapRangeArray)


	}

	GetRouteLPR(createmap2: any) {
		this.DataLPRRoute = [];
		this.LPRRender = 1;
		//console.log("Paramer2 = ",createmap2)
		this.currentPlate = createmap2.LPR_LICENSE;
		this.getLPRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentPlate, this.currentPageSelect, this.currentLastID2);
	}

	ShowFacePopupBlock: any = 0;
	ShowFacePopup() {
		this.ShowFacePopupBlock = 1;
	}
	CloseFacePopup() {
		this.ShowFacePopupBlock = 0;
	}

	ShowRoutePopupBlock: any = 0;
	ShowRoutePopup() {
		this.ShowRoutePopupBlock = 1;
	}
	CloseRoutePopup() {
		this.ShowRoutePopupBlock = 0;
	}

	@HostListener("window:scroll", ["$event"])

	PageCall: any = 1;
	onScroll(event: any) {
		this.SpinnerPlay = 2;
		if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
			if (this.PageCall <= this.DataFRRouteAllPage) {
				this.currentPageSelect = this.PageCall + 1;
				console.log("Before Page call = ", this.PageCall)
				//this.showSpinnerRoute();
				this.getFRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentFirstName, this.currentLastName, this.currentPageSelect, this.currentLastID);
				this.PageCall = this.PageCall + 1;
				console.log("After Page call = ", this.PageCall)
			}
		}
	}

	onScroll2(event: any) {
		this.SpinnerPlay = 2;
		if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
			if (this.PageCall <= this.DataLPRRouteAllPage) {
				this.currentPageSelect = this.PageCall + 1;
				console.log("Before Page call = ", this.PageCall)
				//this.showSpinnerRoute();
				this.getLPRRoute(this.StartcurrentCalendar, this.StopcurrentCalendar, this.currentPlate, this.currentPageSelect, this.currentLastID);
				this.PageCall = this.PageCall + 1;
				console.log("After Page call = ", this.PageCall)
			}
		}
	}

	ClickPoint(point: any) {
		this.MarkerAlone = [];
		console.log("Number = ", point);
		let model = this.MarkerList.find(e => e.id == point);
		console.log("Model Click Point =",model);
		if (model) {
			model.marker.fire('click')
		}
		if (this.MarkerList2.length == 1) {
			console.log("Alone Marker Condition")
			let model2 = this.MarkerList2.find(e => e.id == point);
			console.log("Model Click Point =",model);
			if (model2) {
				model2.marker.fire('click')
			}
		}
		else {
			let model2 = this.MarkerList2.find(e => e.id == point);
			console.log("Model Click Point =",model);
			if (model2) {
				model2.marker.fire('click')
			}
		}
	}

	public isVisible: boolean = false;
	ShowAlert(): void {
		this.isVisible = true;
		setTimeout(() => this.isVisible = false, 3000)
	}

	loading = false;
	showSpinnerNgxLoading() {
		this.loading = true;
		//setTimeout(() => { this.loading = false; }, 5000);
	}

	Switchload = false
	showSwtich(){
		this.Switchload = true;
		setTimeout(() => {
			this.Switchload = false;
		},2000 );
	}
	

	showSpinner() {
		this.spinner.show();
		setTimeout(() => {
			this.spinner.hide();
		}, 100000);
	}
	showSpinnerRoute() {
		this.spinner.show();
		setTimeout(() => {
			this.spinner.hide();
		}, 100000);
	}


	TestClick() {
		console.log("TestClicked");
	}

}

