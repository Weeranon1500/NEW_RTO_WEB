import { Component, Input, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { Chart, Device, } from '../models/model'
import { interval } from 'rxjs';
import * as ApexCharts from 'apexcharts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  //@Input() TransferValue:any =[];
  @Input() DataHistoryTransfer:any;
  @Output() clickEventHistory = new EventEmitter<any>();

  
  jsonURL = 'assets/config.json';

  
  constructor(private service: ServiceDevicesService,private route: ActivatedRoute) {
    
  }


  ngOnInit(): void {
   // console.log("History Data Transfer =",this.TransferValue); 
   console.log("Data History Transfer =",this.DataHistoryTransfer)   
  }

  onClickEventHistory(param:any){
    this.clickEventHistory.emit(param);
  }



/*****Ending Code Fly Wing *****/   
}



