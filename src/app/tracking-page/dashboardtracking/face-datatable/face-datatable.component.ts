import { Component, Input, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { ServiceDevicesService } from 'src/app/service/service-devices.service';
import { Chart, Device, } from 'src/app/models/model'
import { interval } from 'rxjs';
import * as ApexCharts from 'apexcharts';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-face-datatable',
  templateUrl: './face-datatable.component.html',
  styleUrls: ['./face-datatable.component.css']
})
export class FaceDatatableComponent implements OnInit {

  jsonURL = 'assets/config.json';
  @Input() DataFRTransfer : any;
  @Output() clickDataFR = new EventEmitter<any>();

  constructor(private service: ServiceDevicesService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Data FR Transfer =",this.DataFRTransfer) 
  }

  onClickDataFR(param:any){
    this.clickDataFR.emit(param);
  }
}
