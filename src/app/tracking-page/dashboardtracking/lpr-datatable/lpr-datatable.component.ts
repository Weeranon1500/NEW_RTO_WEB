import { Component, Input, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { Chart, Device, } from 'src/app/models/model'
import { interval } from 'rxjs';
import * as ApexCharts from 'apexcharts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-lpr-datatable',
  templateUrl: './lpr-datatable.component.html',
  styleUrls: ['./lpr-datatable.component.css']
})
export class LprDatatableComponent implements OnInit {

  jsonURL = 'assets/config.json';
  @Input() DataLPRTransfer : any;
  @Output() clickDataLPR = new EventEmitter<any>();

  constructor(private service: ServiceDevicesService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Data LPR Transfer =",this.DataLPRTransfer) 
  }

  onClickDataLPR(param:any){
    this.clickDataLPR.emit(param);
  }
}

